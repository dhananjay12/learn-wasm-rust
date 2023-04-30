async function init() {

    const jsMemory = new WebAssembly.Memory({initial: 1});

    const importObject = {
        foo: {
            bar: () => {
                console.log("Foo is called");
            }, 
            baz: () => {
                console.log("Baz is called");
            }
        },
        js: {
            jsMem: jsMemory
        }
    }

    const response = await fetch("sum.wasm");
    const buffer = await response.arrayBuffer();
    const wasm = await WebAssembly.instantiate(buffer, importObject);

    const sumFunction = wasm.instance.exports.sum;
    const result = sumFunction(100, 300);
    console.log(result);

    //WASM memory to JS
    // const wasmMemory = wasm.instance.exports.mem;
    // const wasmMemoryBuffer = new Uint8Array(wasmMemory.buffer,0,2);
    // const hiText = new TextDecoder("utf-8").decode(wasmMemoryBuffer);
    // console.log(hiText);

    //JS memory to WASM
    const uint8Array = new Uint8Array(jsMemory.buffer, 0, 2);
    const hiText = new TextDecoder("utf-8").decode(uint8Array);
    console.log(hiText);
}

init();