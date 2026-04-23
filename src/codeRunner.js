// Python runner via Pyodide (in-browser WASM)
let pyodideInstance = null;
let pyodideLoading = false;
let pyodideCallbacks = [];

export async function getPyodide() {
  if (pyodideInstance) return pyodideInstance;
  if (pyodideLoading) {
    return new Promise((res) => pyodideCallbacks.push(res));
  }
  pyodideLoading = true;
  const { loadPyodide } = await import('https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.mjs');
  pyodideInstance = await loadPyodide();
  pyodideCallbacks.forEach(cb => cb(pyodideInstance));
  pyodideCallbacks = [];
  return pyodideInstance;
}

export async function runPython(code, stdinLines) {
  const pyodide = await getPyodide();
  const inputs = stdinLines.split('\n');
  pyodide.globals.set('_mock_inputs', pyodide.toPy(inputs));
  const wrapped = `
import sys, io
_mock_inputs = _mock_inputs
_input_idx = 0
def input(prompt=''):
    global _input_idx
    if _input_idx < len(_mock_inputs):
        val = _mock_inputs[_input_idx]
        _input_idx += 1
        return val
    return ''
_out = io.StringIO()
sys.stdout = _out
${code}
sys.stdout = sys.__stdout__
_result = _out.getvalue()
`;
  await pyodide.runPythonAsync(wrapped);
  return pyodide.globals.get('_result') || '(no output)';
}

// C runner via Wandbox API (Free, no auth required)
const WANDBOX_URL = 'https://wandbox.org/api/compile.json';

export async function runC(code, stdinText) {
  const response = await fetch(WANDBOX_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      compiler: 'gcc-head-c',
      code: code,
      stdin: stdinText || ''
    }),
  });
  
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data = await response.json();
  
  if (data.compiler_error) throw new Error(data.compiler_error);
  if (data.program_error) return data.program_output + '\\nError: ' + data.program_error;
  
  return data.program_output || '(no output)';
}
