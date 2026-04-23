import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Edit3, Terminal, BookOpen, Play, Copy, Check } from 'lucide-react';
import { allQuestions } from './questionsData2.js';
import { getPyodide, runPython, runC } from './codeRunner.js';

const CAT_COLORS = {
  "Arrays":              { bg: "rgba(99,102,241,0.15)", text: "#818cf8", border: "rgba(99,102,241,0.3)" },
  "Strings":             { bg: "rgba(236,72,153,0.15)", text: "#f472b6", border: "rgba(236,72,153,0.3)" },
  "Math":                { bg: "rgba(245,158,11,0.15)", text: "#fbbf24", border: "rgba(245,158,11,0.3)" },
  "Searching & Sorting": { bg: "rgba(6,182,212,0.15)",  text: "#22d3ee", border: "rgba(6,182,212,0.3)" },
  "Advanced":            { bg: "rgba(16,185,129,0.15)", text: "#34d399", border: "rgba(16,185,129,0.3)" },
  "Patterns":            { bg: "rgba(249,115,22,0.15)", text: "#fb923c", border: "rgba(249,115,22,0.3)" },
  "Linked List":         { bg: "rgba(168,85,247,0.15)", text: "#c084fc", border: "rgba(168,85,247,0.3)" },
  "Stack & Queue":       { bg: "rgba(244,63,94,0.15)",  text: "#fb7185", border: "rgba(244,63,94,0.3)" },
  "Trees":               { bg: "rgba(34,197,94,0.15)",  text: "#4ade80", border: "rgba(34,197,94,0.3)" },
  "Graphs":              { bg: "rgba(56,189,248,0.15)", text: "#38bdf8", border: "rgba(56,189,248,0.3)" },
};

// Add line numbers to code
function CodeWithLines({ code, language }) {
  const lines = code.split('\n');
  return (
    <div style={{ display: 'flex', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, lineHeight: 1.75 }}>
      <div style={{ textAlign: 'right', padding: '16px 0 16px 16px', color: '#374151', userSelect: 'none', minWidth: 36, flexShrink: 0 }}>
        {lines.map((_, i) => <div key={i}>{i + 1}</div>)}
      </div>
      <pre style={{ margin: 0, padding: 16, overflow: 'auto', flex: 1, color: '#e2e8f0', whiteSpace: 'pre' }}>
        {lines.map((line, i) => (
          <div key={i}>{highlightLine(line, language)}</div>
        ))}
      </pre>
    </div>
  );
}

// Simple syntax highlighting
function highlightLine(line, lang) {
  if (lang === 'py') {
    // Keywords
    const pyKw = /\b(def|return|for|while|if|elif|else|import|from|in|not|and|or|is|None|True|False|break|continue|class|try|except|finally|with|as|yield|lambda|pass|raise|global|print|input|range|len|int|float|str|list|set|dict|map|sum|max|min|sorted|enumerate|zip)\b/g;
    const parts = [];
    let last = 0;
    const strRegex = /(["'])(?:(?=(\\?))\2.)*?\1|#.*/g;
    let m;
    const strs = [];
    while ((m = strRegex.exec(line)) !== null) {
      strs.push({ start: m.index, end: m.index + m[0].length, text: m[0], isComment: m[0].startsWith('#') });
    }
    // Simple approach: return colored spans
    let result = line;
    // We'll just return the line as-is for performance since full highlighting is complex
    return <span>{line}</span>;
  }
  return <span>{line}</span>;
}

export default function App() {
  const [completed, setCompleted] = useState({});
  const [customCodes, setCustomCodes] = useState({});
  const [globalLang, setGlobalLang] = useState('py');
  const [expandedId, setExpandedId] = useState(null);
  const [filterCat, setFilterCat] = useState('All');
  const [pyodideReady, setPyodideReady] = useState(false);
  const [pyodideStatus, setPyodideStatus] = useState('idle');

  useEffect(() => {
    const c = localStorage.getItem('dsa_completed');
    const cc = localStorage.getItem('dsa_custom');
    if (c) setCompleted(JSON.parse(c));
    if (cc) setCustomCodes(JSON.parse(cc));
  }, []);

  useEffect(() => {
    setPyodideStatus('loading');
    getPyodide()
      .then(() => { setPyodideReady(true); setPyodideStatus('ready'); })
      .catch(() => setPyodideStatus('error'));
  }, []);

  const toggleCompleted = (id) => {
    const next = { ...completed, [id]: !completed[id] };
    setCompleted(next);
    localStorage.setItem('dsa_completed', JSON.stringify(next));
  };

  const handleCustomCode = (id, val) => {
    const next = { ...customCodes, [id]: val };
    setCustomCodes(next);
    localStorage.setItem('dsa_custom', JSON.stringify(next));
  };

  const doneCount = Object.values(completed).filter(Boolean).length;
  const progress = Math.round((doneCount / allQuestions.length) * 100);
  const cats = ['All', ...Object.keys(CAT_COLORS)];
  const visible = filterCat === 'All' ? allQuestions : allQuestions.filter(q => q.cat === filterCat);

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <header className="header-glass" style={{ position: 'sticky', top: 0, zIndex: 50, padding: '14px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ background: 'rgba(139,92,246,0.2)', padding: 8, borderRadius: 10, border: '1px solid rgba(139,92,246,0.3)' }}>
                <Terminal size={20} color="#a78bfa" />
              </div>
              <div>
                <h1 style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }} className="gradient-text">DSA 80+ Challenge</h1>
                <p style={{ fontSize: 11, color: '#64748b', marginTop: 1 }}>Infosys & Interview Prep</p>
              </div>
            </div>

            <div style={{ flex: 1, maxWidth: 320, minWidth: 180 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5, color: '#94a3b8' }}>
                <span>{doneCount}/{allQuestions.length} solved</span>
                <span style={{ color: '#a78bfa', fontWeight: 600 }}>{progress}%</span>
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.07)', borderRadius: 99, overflow: 'hidden' }}>
                <div className="progress-bar" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: 'rgba(255,255,255,0.04)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', fontSize: 13 }}>
                <span style={{ color: '#64748b' }}>Lang:</span>
                <select className="lang-select" value={globalLang} onChange={e => setGlobalLang(e.target.value)} style={{ background: 'transparent', border: 'none', fontSize: 13, fontWeight: 600 }}>
                  <option value="py">Python</option>
                  <option value="c">C / C++</option>
                </select>
              </div>
              <div style={{
                fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 6,
                background: pyodideStatus === 'ready' ? 'rgba(16,185,129,0.15)' : pyodideStatus === 'loading' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                color: pyodideStatus === 'ready' ? '#34d399' : pyodideStatus === 'loading' ? '#fbbf24' : '#f87171',
                border: `1px solid ${pyodideStatus === 'ready' ? 'rgba(16,185,129,0.3)' : pyodideStatus === 'loading' ? 'rgba(245,158,11,0.3)' : 'rgba(239,68,68,0.3)'}`,
                display: 'flex', alignItems: 'center', gap: 5
              }}>
                {pyodideStatus === 'loading' && <span className="spinner" />}
                {pyodideStatus === 'ready' ? '🐍 Ready' : pyodideStatus === 'loading' ? 'Loading...' : '⚠ Failed'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
            {cats.map(cat => (
              <button key={cat} onClick={() => setFilterCat(cat)} style={{
                padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 500, cursor: 'pointer',
                transition: 'all 0.2s', border: '1px solid',
                background: filterCat === cat ? 'rgba(139,92,246,0.25)' : 'rgba(255,255,255,0.04)',
                color: filterCat === cat ? '#c4b5fd' : '#64748b',
                borderColor: filterCat === cat ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.07)',
              }}>
                {cat} {cat !== 'All' && `(${allQuestions.filter(q => q.cat === cat).length})`}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '20px 16px 80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {visible.map(q => (
            <QuestionItem
              key={q.id} q={q}
              isDone={!!completed[q.id]}
              isExpanded={expandedId === q.id}
              globalLang={globalLang}
              customCode={customCodes[q.id]}
              pyodideReady={pyodideReady}
              onToggleDone={() => toggleCompleted(q.id)}
              onToggleExpand={() => setExpandedId(expandedId === q.id ? null : q.id)}
              onCodeChange={val => handleCustomCode(q.id, val)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

function QuestionItem({ q, isDone, isExpanded, globalLang, customCode, pyodideReady, onToggleDone, onToggleExpand, onCodeChange }) {
  const [tab, setTab] = useState('ref');
  const [localLang, setLocalLang] = useState(globalLang);
  const [runLang, setRunLang] = useState('py'); // language for the Run tab
  const [userInput, setUserInput] = useState('');
  const [output, setOutput] = useState(null);
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const cat = CAT_COLORS[q.cat] || CAT_COLORS["Arrays"];

  useEffect(() => { setLocalLang(globalLang); }, [globalLang]);

  const currentCode = localLang === 'py' ? q.py : q.c;
  const runCode = runLang === 'py' ? q.py : q.c;

  const copyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleRun = useCallback(async () => {
    setRunning(true);
    setOutput(null);
    try {
      let result;
      if (runLang === 'py') {
        result = await runPython(q.py, userInput);
      } else {
        result = await runC(q.c, userInput);
      }
      setOutput({ text: result, isError: false });
    } catch (err) {
      setOutput({ text: String(err), isError: true });
    } finally {
      setRunning(false);
    }
  }, [q.py, q.c, runLang, userInput]);

  const canRun = runLang === 'py' ? pyodideReady : true;

  return (
    <div className={`glass-card ${isExpanded ? 'expanded' : ''}`} style={{ overflow: 'hidden' }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', cursor: 'pointer', userSelect: 'none' }} onClick={onToggleExpand}>
        <button onClick={e => { e.stopPropagation(); onToggleDone(); }} className={isDone ? 'badge-done' : 'badge-pending'} style={{ background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, transition: 'all 0.2s' }}>
          {isDone ? <CheckCircle2 size={22} /> : <Circle size={22} />}
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: isDone ? '#475569' : '#e2e8f0', textDecoration: isDone ? 'line-through' : 'none', transition: 'all 0.2s' }}>{q.title}</h3>
            <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 999, background: cat.bg, color: cat.text, border: `1px solid ${cat.border}`, letterSpacing: '0.05em', textTransform: 'uppercase', flexShrink: 0 }}>{q.cat}</span>
          </div>
        </div>
        {isExpanded ? <ChevronUp size={16} color="#64748b" /> : <ChevronDown size={16} color="#64748b" />}
      </div>

      {/* Expanded body */}
      {isExpanded && (
        <div className="accordion-body" style={{ borderTop: '1px solid rgba(139,92,246,0.15)' }}>
          <div style={{ padding: '12px 16px', background: 'rgba(0,0,0,0.25)', borderBottom: '1px solid rgba(139,92,246,0.1)' }}>
            <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>{q.desc}</p>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(139,92,246,0.12)', flexWrap: 'wrap', gap: 6 }}>
            <div style={{ display: 'flex', gap: 4 }}>
              <button className={`tab-btn ${tab === 'ref' ? 'active-ref' : 'inactive'}`} onClick={() => setTab('ref')}>
                <BookOpen size={13} /> Ref Solution
              </button>
              <button className={`tab-btn ${tab === 'custom' ? 'active-custom' : 'inactive'}`} onClick={() => setTab('custom')}>
                <Edit3 size={13} /> My Code
              </button>
              <button className={`tab-btn ${tab === 'run' ? 'active-run' : 'inactive'}`} onClick={() => setTab('run')}>
                <Play size={13} /> ▶ Run Code
              </button>
            </div>

            {tab === 'ref' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <select className="lang-select" value={localLang} onChange={e => setLocalLang(e.target.value)}>
                  <option value="py">Python</option>
                  <option value="c">C</option>
                </select>
                <button onClick={copyCode} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)', background: copied ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.05)', color: copied ? '#34d399' : '#64748b', fontSize: 12, cursor: 'pointer', transition: 'all 0.2s' }}>
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            )}

            {tab === 'run' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 11, color: '#64748b' }}>Run as:</span>
                <select className="lang-select" value={runLang} onChange={e => setRunLang(e.target.value)}>
                  <option value="py">🐍 Python</option>
                  <option value="c">⚙️ C</option>
                </select>
              </div>
            )}
          </div>

          {/* Content */}
          <div style={{ background: '#080d1a' }}>
            {tab === 'ref' && (
              <CodeWithLines code={currentCode} language={localLang} />
            )}

            {tab === 'custom' && (
              <textarea
                style={{ width: '100%', minHeight: 180, background: 'transparent', color: '#e2e8f0', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, border: 'none', outline: 'none', padding: '16px', resize: 'vertical', lineHeight: 1.7, caretColor: '#a78bfa' }}
                placeholder="✏️  Write your own solution here... auto-saves to browser!"
                value={customCode || ''} onChange={e => onCodeChange(e.target.value)} spellCheck={false}
                onKeyDown={(e) => {
                  if (e.key === 'Tab') {
                    e.preventDefault();
                    const start = e.target.selectionStart;
                    const end = e.target.selectionEnd;
                    onCodeChange(customCode.substring(0, start) + "    " + customCode.substring(end));
                    setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = start + 4; }, 0);
                  }
                }}
              />
            )}

            {tab === 'run' && (
              <div>
                {/* Code Editor */}
                <div style={{ borderBottom: '1px solid rgba(139,92,246,0.1)' }}>
                  <textarea
                    value={customCode !== undefined ? customCode : runCode}
                    onChange={e => onCodeChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Tab') {
                        e.preventDefault();
                        const start = e.target.selectionStart;
                        const end = e.target.selectionEnd;
                        const currentVal = customCode !== undefined ? customCode : runCode;
                        onCodeChange(currentVal.substring(0, start) + "    " + currentVal.substring(end));
                        setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = start + 4; }, 0);
                      }
                    }}
                    spellCheck={false}
                    style={{ width: '100%', minHeight: 220, background: '#0a1020', color: '#e2e8f0', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, border: 'none', outline: 'none', padding: '16px', resize: 'vertical', lineHeight: 1.7, caretColor: '#a78bfa' }}
                  />
                </div>

                {/* Input */}
                <div style={{ padding: '10px 16px 0', background: '#0a1020' }}>
                  <label style={{ fontSize: 11, color: '#64748b', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                    📥 stdin (one value per line)
                  </label>
                  <textarea
                    placeholder={"Enter input values...\ne.g.:\n5\n1 5 3 9 2"}
                    value={userInput} onChange={e => setUserInput(e.target.value)}
                    style={{ borderRadius: 8, resize: 'vertical', minHeight: 80, width: '100%', background: '#060912', border: '1px solid rgba(139,92,246,0.2)', outline: 'none', color: '#e2e8f0', fontFamily: "'JetBrains Mono',monospace", fontSize: 13, padding: '10px 12px', lineHeight: 1.6 }}
                  />
                </div>

                {/* Run + Output */}
                <div style={{ padding: '10px 16px 16px', background: '#0a1020' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <button className="run-btn" disabled={running || !canRun} onClick={() => {
                      setRunning(true);
                      setOutput(null);
                      const codeToRun = customCode || runCode;
                      if (runLang === 'py') {
                        runPython(codeToRun, userInput).then(res => {
                          setOutput({ text: res, isError: false });
                        }).catch(err => {
                          setOutput({ text: String(err), isError: true });
                        }).finally(() => setRunning(false));
                      } else {
                        runC(codeToRun, userInput).then(res => {
                          setOutput({ text: res, isError: false });
                        }).catch(err => {
                          setOutput({ text: String(err), isError: true });
                        }).finally(() => setRunning(false));
                      }
                    }}>
                      {running ? <><span className="spinner" /> Running...</> : <><Play size={13} /> {runLang === 'py' ? 'Run Python' : 'Compile & Run C'}</>}
                    </button>
                    {runLang === 'py' && !pyodideReady && (
                      <span style={{ fontSize: 11, color: '#fbbf24' }}>⏳ Python engine loading...</span>
                    )}
                    {runLang === 'c' && (
                      <span style={{ fontSize: 11, color: '#22d3ee' }}>⚙️ Compiled via Piston API</span>
                    )}
                  </div>

                  <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(139,92,246,0.15)' }}>
                    <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '6px 12px', background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(139,92,246,0.1)' }}>
                      📤 Output
                    </div>
                    <div className={`output-block ${output ? (output.isError ? 'output-error' : 'output-success') : 'output-idle'}`}>
                      {output ? output.text : 'Click "Run" to see output...'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
