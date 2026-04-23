async function test() {
  try {
    const res = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'c',
        version: '10.2.0',
        files: [{ name: 'main.c', content: '#include <stdio.h>\nint main(){printf("hello");return 0;}' }]
      })
    });
    console.log(res.status, await res.text());
  } catch (e) {
    console.error(e);
  }
}
test();
