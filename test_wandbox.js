async function test() {
  try {
    const res = await fetch('https://wandbox.org/api/compile.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        compiler: 'gcc-head-c',
        code: '#include <stdio.h>\nint main(){printf("hello\\n");return 0;}',
        stdin: ''
      })
    });
    console.log(res.status, await res.text());
  } catch (e) {
    console.error(e);
  }
}
test();
