
const ZXing = (() => {
var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src: undefined;

return (function(moduleArg = {}) {
    var Module = moduleArg;
    var readyPromiseResolve: (arg0: {}) => void, readyPromiseReject: ((arg0: unknown) => void) | null | undefined;
    Module["ready"] = new Promise((resolve, reject) => {
    readyPromiseResolve = resolve;
    readyPromiseReject = reject
    });
    var moduleOverrides = Object.assign({},
    Module);
    var arguments_ = [];
    var thisProgram = "./this.program";
    var quit_ = (status: any, toThrow: any) => {
    throw toThrow
    };
    var ENVIRONMENT_IS_WEB = true;
    var ENVIRONMENT_IS_WORKER = false;
    var scriptDirectory = "";
    function locateFile(path: string) {
    if (Module["locateFile"]) {
        return Module["locateFile"](path, scriptDirectory)
    }
    return scriptDirectory + path
    }
    var read_, readAsync, readBinary: (arg0: any) => any, setWindowTitle;
    if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
    if (ENVIRONMENT_IS_WORKER) {
        scriptDirectory = self.location.href
    } else if (typeof document != "undefined" && document.currentScript) {
        scriptDirectory = document.currentScript.src
    }
    if (_scriptDir) {
        scriptDirectory = _scriptDir
    }
    if (scriptDirectory.indexOf("blob:") !== 0) {
        scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1)
    } else {
        scriptDirectory = ""
    } {
        read_ = (url: string | URL) => {
        var xhr = new XMLHttpRequest;
        xhr.open("GET", url, false);
        xhr.send(null);
        return xhr.responseText
        };
        if (ENVIRONMENT_IS_WORKER) {
        readBinary = (url: string | URL) => {
            var xhr = new XMLHttpRequest;
            xhr.open("GET", url, false);
            xhr.responseType = "arraybuffer";
            xhr.send(null);
            return new Uint8Array(xhr.response)
        }
        }
        readAsync = (url: string | URL, onload: (arg0: any) => void, onerror: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) | null) => {
        var xhr = new XMLHttpRequest;
        xhr.open("GET", url, true);
        xhr.responseType = "arraybuffer";
        xhr.onload = () => {
            if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
            onload(xhr.response);
            return
            }
            onerror()
        };
        xhr.onerror = onerror;
        xhr.send(null)
        }
    }
    setWindowTitle = (title: string) => document.title = title
    } else {}
    var out = Module["print"] || console.log.bind(console);
    var err = Module["printErr"] || console.error.bind(console);
    Object.assign(Module, moduleOverrides);
    moduleOverrides = null;
    if (Module["arguments"]) arguments_ = Module["arguments"];
    if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
    if (Module["quit"]) quit_ = Module["quit"];
    var wasmBinary: Iterable<number>;
    if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
    var noExitRuntime = Module["noExitRuntime"] || true;
    if (typeof WebAssembly != "object") {
    abort("no native wasm support detected")
    }
    var wasmMemory: { buffer: any; grow: (arg0: number) => void; };
    var ABORT = false;
    var EXITSTATUS;
    function assert(condition: boolean, text: undefined) {
    if (!condition) {
        abort(text)
    }
    }
    var HEAP8: Int8Array | number[], HEAPU8: Uint8Array | (string | number)[], HEAP16: Int16Array | number[], HEAPU16: number | any[] | Uint16Array, HEAP32: any[] | Int32Array, HEAPU32: number | Uint32Array | number[], HEAPF32: any[] | Float32Array, HEAPF64: any[] | Float64Array;
    function updateMemoryViews() {
    var b = wasmMemory.buffer;
    Module["HEAP8"] = HEAP8 = new Int8Array(b);
    Module["HEAP16"] = HEAP16 = new Int16Array(b);
    Module["HEAP32"] = HEAP32 = new Int32Array(b);
    Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
    Module["HEAPU16"] = HEAPU16 = new Uint16Array(b);
    Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
    Module["HEAPF32"] = HEAPF32 = new Float32Array(b);
    Module["HEAPF64"] = HEAPF64 = new Float64Array(b)
    }
    var wasmTable: { get: (arg0: any) => any; };
    var __ATPRERUN__: any[] = [];
    var __ATINIT__: any[] = [];
    var __ATPOSTRUN__: any[] = [];
    var runtimeInitialized = false;
    function preRun() {
    if (Module["preRun"]) {
        if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];
        while (Module["preRun"].length) {
        addOnPreRun(Module["preRun"].shift())
        }
    }
    callRuntimeCallbacks(__ATPRERUN__)
    }
    function initRuntime() {
    runtimeInitialized = true;
    callRuntimeCallbacks(__ATINIT__)
    }
    function postRun() {
    if (Module["postRun"]) {
        if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];
        while (Module["postRun"].length) {
        addOnPostRun(Module["postRun"].shift())
        }
    }
    callRuntimeCallbacks(__ATPOSTRUN__)
    }
    function addOnPreRun(cb: any) {
    __ATPRERUN__.unshift(cb)
    }
    function addOnInit(cb: any) {
    __ATINIT__.unshift(cb)
    }
    function addOnPostRun(cb: any) {
    __ATPOSTRUN__.unshift(cb)
    }
    var runDependencies = 0;
    var runDependencyWatcher: string | number | NodeJS.Timeout | null | undefined = null;
    var dependenciesFulfilled: { (): void; (): void; } | null = null;
    function addRunDependency(id: string) {
    runDependencies++;
    if (Module["monitorRunDependencies"]) {
        Module["monitorRunDependencies"](runDependencies)
    }
    }
    function removeRunDependency(id: string) {
    runDependencies--;
    if (Module["monitorRunDependencies"]) {
        Module["monitorRunDependencies"](runDependencies)
    }
    if (runDependencies == 0) {
        if (runDependencyWatcher !== null) {
        clearInterval(runDependencyWatcher);
        runDependencyWatcher = null
        }
        if (dependenciesFulfilled) {
        var callback = dependenciesFulfilled;
        dependenciesFulfilled = null;
        callback()
        }
    }
    }
    function abort(what: unknown) {
    if (Module["onAbort"]) {
        Module["onAbort"](what)
    }
    what = "Aborted(" + what + ")";
    err(what);
    ABORT = true;
    EXITSTATUS = 1;
    what += ". Build with -sASSERTIONS for more info.";
    var e = new WebAssembly.RuntimeError(what);
    readyPromiseReject(e);
    throw e
    }
    var dataURIPrefix = "data:application/octet-stream;base64,";
    function isDataURI(filename: string) {
    return filename.startsWith(dataURIPrefix)
    }
    var wasmBinaryFile: string;
    wasmBinaryFile = "zxing_reader.wasm";
    if (!isDataURI(wasmBinaryFile)) {
    wasmBinaryFile = locateFile(wasmBinaryFile)
    }
    function getBinary(file: any) {
    try {
        if (file == wasmBinaryFile && wasmBinary) {
        return new Uint8Array(wasmBinary)
        }
        if (readBinary) {
        return readBinary(file)
        }
        throw "both async and sync fetching of the wasm failed"
    } catch(err) {
        abort(err)
    }
    }
    function getBinaryPromise(binaryFile: RequestInfo | URL) {
    if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
        if (typeof fetch == "function") {
        return fetch(binaryFile, {
            credentials: "same-origin"
        }).then(response => {
            if (!response["ok"]) {
            throw "failed to load wasm binary file at '" + binaryFile + "'"
            }
            return response["arrayBuffer"]()
        }).
        catch(() => getBinary(binaryFile))
        }
    }
    return Promise.resolve().then(() => getBinary(binaryFile))
    }
    function instantiateArrayBuffer(binaryFile: any, imports: WebAssembly.Imports | undefined, receiver: ((value: WebAssembly.Instance) => WebAssembly.Instance | PromiseLike<WebAssembly.Instance>) | null | undefined) {
    return getBinaryPromise(binaryFile).then(binary => {
        return WebAssembly.instantiate(binary, imports)
    }).then(instance => {
        return instance
    }).then(receiver, reason => {
        err("failed to asynchronously prepare wasm: " + reason);
        abort(reason)
    })
    }
    function instantiateAsync(binary: any, binaryFile: RequestInfo | URL, imports: WebAssembly.Imports | undefined, callback: ((value: WebAssembly.WebAssemblyInstantiatedSource) => WebAssembly.WebAssemblyInstantiatedSource | PromiseLike<WebAssembly.WebAssemblyInstantiatedSource>) | null | undefined) {
    if (!binary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(binaryFile) && typeof fetch == "function") {
        return fetch(binaryFile, {
        credentials: "same-origin"
        }).then(response => {
        var result = WebAssembly.instantiateStreaming(response, imports);
        return result.then(callback,
        function(reason) {
            err("wasm streaming compile failed: " + reason);
            err("falling back to ArrayBuffer instantiation");
            return instantiateArrayBuffer(binaryFile, imports, callback)
        })
        })
    } else {
        return instantiateArrayBuffer(binaryFile, imports, callback)
    }
    }
    function createWasm() {
    var info = {
        "a": wasmImports
    };
    function receiveInstance(instance: { exports: any; }, module: undefined) {
        var exports = instance.exports;
        Module["asm"] = exports;
        wasmMemory = Module["asm"]["oa"];
        updateMemoryViews();
        wasmTable = Module["asm"]["sa"];
        addOnInit(Module["asm"]["pa"]);
        removeRunDependency("wasm-instantiate");
        return exports
    }
    addRunDependency("wasm-instantiate");
    function receiveInstantiationResult(result: { [x: string]: any; }) {
        receiveInstance(result["instance"])
    }
    if (Module["instantiateWasm"]) {
        try {
        return Module["instantiateWasm"](info, receiveInstance)
        } catch(e) {
        err("Module.instantiateWasm callback failed with error: " + e);
        readyPromiseReject(e)
        }
    }
    instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult).
    catch(readyPromiseReject);
    return {}
    }
    var callRuntimeCallbacks = (callbacks: any[]) => {
    while (callbacks.length > 0) {
        callbacks.shift()(Module)
    }
    };
    var exceptionCaught: any[] = [];
    var uncaughtExceptionCount = 0;
    function ___cxa_begin_catch(ptr: any) {
    var info = new ExceptionInfo(ptr);
    if (!info.get_caught()) {
        info.set_caught(true);
        uncaughtExceptionCount--
    }
    info.set_rethrown(false);
    exceptionCaught.push(info);
    ___cxa_increment_exception_refcount(info.excPtr);
    return info.get_exception_ptr()
    }
    var exceptionLast = 0;
    function ___cxa_end_catch() {
    _setThrew(0);
    var info = exceptionCaught.pop();
    ___cxa_decrement_exception_refcount(info.excPtr);
    exceptionLast = 0
    }
    function ExceptionInfo(this: any, excPtr: number) {
    this.excPtr = excPtr;
    this.ptr = excPtr - 24;
    this.set_type = function(type: any) {
        HEAPU32[this.ptr + 4 >> 2] = type
    };
    this.get_type = function() {
        return HEAPU32[this.ptr + 4 >> 2]
    };
    this.set_destructor = function(destructor: any) {
        HEAPU32[this.ptr + 8 >> 2] = destructor
    };
    this.get_destructor = function() {
        return HEAPU32[this.ptr + 8 >> 2]
    };
    this.set_caught = function(caught: number) {
        caught = caught ? 1 : 0;
        HEAP8[this.ptr + 12 >> 0] = caught
    };
    this.get_caught = function() {
        return HEAP8[this.ptr + 12 >> 0] != 0
    };
    this.set_rethrown = function(rethrown: number) {
        rethrown = rethrown ? 1 : 0;
        HEAP8[this.ptr + 13 >> 0] = rethrown
    };
    this.get_rethrown = function() {
        return HEAP8[this.ptr + 13 >> 0] != 0
    };
    this.init = function(type: any, destructor: any) {
        this.set_adjusted_ptr(0);
        this.set_type(type);
        this.set_destructor(destructor)
    };
    this.set_adjusted_ptr = function(adjustedPtr: any) {
        HEAPU32[this.ptr + 16 >> 2] = adjustedPtr
    };
    this.get_adjusted_ptr = function() {
        return HEAPU32[this.ptr + 16 >> 2]
    };
    this.get_exception_ptr = function() {
        var isPointer = ___cxa_is_pointer_type(this.get_type());
        if (isPointer) {
        return HEAPU32[this.excPtr >> 2]
        }
        var adjusted = this.get_adjusted_ptr();
        if (adjusted !== 0) return adjusted;
        return this.excPtr
    }
    }
    function ___resumeException(ptr: number) {
    if (!exceptionLast) {
        exceptionLast = ptr
    }
    throw exceptionLast
    }
    function ___cxa_find_matching_catch() {
    var thrown = exceptionLast;
    if (!thrown) {
        setTempRet0(0);
        return 0
    }
    var info = new ExceptionInfo(thrown);
    info.set_adjusted_ptr(thrown);
    var thrownType = info.get_type();
    if (!thrownType) {
        setTempRet0(0);
        return thrown
    }
    for (var i = 0; i < arguments.length; i++) {
        var caughtType = arguments[i];
        if (caughtType === 0 || caughtType === thrownType) {
        break
        }
        var adjusted_ptr_addr = info.ptr + 16;
        if (___cxa_can_catch(caughtType, thrownType, adjusted_ptr_addr)) {
        setTempRet0(caughtType);
        return thrown
        }
    }
    setTempRet0(thrownType);
    return thrown
    }
    var ___cxa_find_matching_catch_2 = ___cxa_find_matching_catch;
    var ___cxa_find_matching_catch_3 = ___cxa_find_matching_catch;
    var ___cxa_find_matching_catch_4 = ___cxa_find_matching_catch;
    function ___cxa_get_exception_ptr(ptr: any) {
    var rtn = new ExceptionInfo(ptr).get_exception_ptr();
    return rtn
    }
    function ___cxa_rethrow() {
    var info = exceptionCaught.pop();
    if (!info) {
        abort("no exception to throw")
    }
    var ptr = info.excPtr;
    if (!info.get_rethrown()) {
        exceptionCaught.push(info);
        info.set_rethrown(true);
        info.set_caught(false);
        uncaughtExceptionCount++
    }
    exceptionLast = ptr;
    throw exceptionLast
    }
    function ___cxa_throw(ptr: number, type: any, destructor: any) {
    var info = new ExceptionInfo(ptr);
    info.init(type, destructor);
    exceptionLast = ptr;
    uncaughtExceptionCount++;
    throw exceptionLast
    }
    function ___cxa_uncaught_exceptions() {
    return uncaughtExceptionCount
    }
    var structRegistrations = {};
    function runDestructors(destructors: any[]) {
    while (destructors.length) {
        var ptr = destructors.pop();
        var del = destructors.pop();
        del(ptr)
    }
    }
    function simpleReadValueFromPointer(this: { name: any; fromWireType: ((handle: any) => any) | ((value: number) => string | undefined) | ((ptr: any) => {}) | ((value: number) => any); toWireType: ((destructors: any, value: any) => any) | ((destructors: (() => any)[] | null, value: string | any[] | ArrayLike<number> | ArrayBuffer) => any) | ((destructors: any[] | null, o: { [x: string]: any; }) => any) | ((destructors: (() => any)[] | null, value: any) => any); argPackAdvance: number; readValueFromPointer: (pointer: number) => any; destructorFunction: any; }, pointer: number) {
    return this["fromWireType"](HEAP32[pointer >> 2])
    }
    var awaitingDependencies = {};
    var registeredTypes = {};
    var typeDependencies = {};
    var char_0 = 48;
    var char_9 = 57;
    function makeLegalFunctionName(name: string | undefined) {
    if (undefined === name) {
        return "_unknown"
    }
    name = name.replace(/[^a-zA-Z0-9_]/g, "$");
    var f = name.charCodeAt(0);
    if (f >= char_0 && f <= char_9) {
        return`_$ {
        name
        }`
    }
    return name
    }
    function createNamedFunction(name: string | number, body: { (message: any): void; (): any; (): void; apply?: any; }) {
    name = makeLegalFunctionName(name);
    return { [name] : function() {
        return body.apply(this, arguments)
        }
    } [name]
    }
    function extendError(baseErrorType: ErrorConstructor, errorName: string) {
    var errorClass = createNamedFunction(errorName,
    function(message: string | undefined) {
        this.name = errorName;
        this.message = message;
        var stack = new Error(message).stack;
        if (stack !== undefined) {
        this.stack = this.toString() + "\n" + stack.replace(/^Error(:[^\n]*)?\n/, "")
        }
    });
    errorClass.prototype = Object.create(baseErrorType.prototype);
    errorClass.prototype.constructor = errorClass;
    errorClass.prototype.toString = function() {
        if (this.message === undefined) {
        return this.name
        } else {
        return`$ {
            this.name
        }: $ {
            this.message
        }`
        }
    };
    return errorClass
    }
    var InternalError: { (): any; new(arg0: any): any; } | undefined = undefined;
    function throwInternalError(message: string) {
    throw new InternalError(message)
    }
    function whenDependentTypesAreResolved(myTypes: any[], dependentTypes: any[], getTypeConverters: { (fieldTypes: any): { name: any; fromWireType: (ptr: any) => {}; toWireType: (destructors: any, o: any) => any; argPackAdvance: number; readValueFromPointer: (pointer: any) => any; destructorFunction: any; }[]; (base: any): any[]; (classType: any): never[]; (argTypes: any): never[]; (classType: any): never[]; (argTypes: any): never[]; (argTypes: any): never[]; (arg0: any): any; }) {
    myTypes.forEach(function(type: string | number) {
        typeDependencies[type] = dependentTypes
    });
    function onComplete(typeConverters: any[]) {
        var myTypeConverters = getTypeConverters(typeConverters);
        if (myTypeConverters.length !== myTypes.length) {
        throwInternalError("Mismatched type converter count")
        }
        for (var i = 0; i < myTypes.length; ++i) {
        registerType(myTypes[i], myTypeConverters[i])
        }
    }
    var typeConverters = new Array(dependentTypes.length);
    var unregisteredTypes = [];
    var registered = 0;
    dependentTypes.forEach((dt: PropertyKey, i: string | number) => {
        if (registeredTypes.hasOwnProperty(dt)) {
        typeConverters[i] = registeredTypes[dt]
        } else {
        unregisteredTypes.push(dt);
        if (!awaitingDependencies.hasOwnProperty(dt)) {
            awaitingDependencies[dt] = []
        }
        awaitingDependencies[dt].push(() => {
            typeConverters[i] = registeredTypes[dt]; ++registered;
            if (registered === unregisteredTypes.length) {
            onComplete(typeConverters)
            }
        })
        }
    });
    if (0 === unregisteredTypes.length) {
        onComplete(typeConverters)
    }
    }
    var __embind_finalize_value_object = function(structType: string | number) {
    var reg = structRegistrations[structType];
    delete structRegistrations[structType];
    var rawConstructor = reg.rawConstructor;
    var rawDestructor = reg.rawDestructor;
    var fieldRecords = reg.fields;
    var fieldTypes = fieldRecords.map((field: { getterReturnType: any; }) => field.getterReturnType).concat(fieldRecords.map((field: { setterArgumentType: any; }) => field.setterArgumentType));
    whenDependentTypesAreResolved([structType], fieldTypes, (fieldTypes: { [x: string]: any; }) => {
        var fields = {};
        fieldRecords.forEach((field: { fieldName: any; getter: any; getterContext: any; setter: any; setterContext: any; }, i: string | number) => {
        var fieldName = field.fieldName;
        var getterReturnType = fieldTypes[i];
        var getter = field.getter;
        var getterContext = field.getterContext;
        var setterArgumentType = fieldTypes[i + fieldRecords.length];
        var setter = field.setter;
        var setterContext = field.setterContext;
        fields[fieldName] = {
            read: (ptr: any) => {
            return getterReturnType["fromWireType"](getter(getterContext, ptr))
            },
            write: (ptr: any, o: any) => {
            var destructors: never[] = [];
            setter(setterContext, ptr, setterArgumentType["toWireType"](destructors, o));
            runDestructors(destructors)
            }
        }
        });
        return [{
        name: reg.name,
        "fromWireType": function(ptr: any) {
            var rv = {};
            for (var i in fields) {
            rv[i] = fields[i].read(ptr)
            }
            rawDestructor(ptr);
            return rv
        },
        "toWireType": function(destructors: any[] | null, o: { [x: string]: any; }) {
            for (var fieldName in fields) {
            if (! (fieldName in o)) {
                throw new TypeError(`Missing field: "${fieldName}"`)
            }
            }
            var ptr = rawConstructor();
            for (fieldName in fields) {
            fields[fieldName].write(ptr, o[fieldName])
            }
            if (destructors !== null) {
            destructors.push(rawDestructor, ptr)
            }
            return ptr
        },
        "argPackAdvance": 8,
        "readValueFromPointer": simpleReadValueFromPointer,
        destructorFunction: rawDestructor
        }]
    })
    };
    function __embind_register_bigint(primitiveType: any, name: any, size: any, minRange: any, maxRange: any) {}
    function getShiftFromSize(size: any) {
    switch (size) {
    case 1:
        return 0;
    case 2:
        return 1;
    case 4:
        return 2;
    case 8:
        return 3;
    default:
        throw new TypeError(`Unknown type size:
        $ {
        size
        }`)
    }
    }
    function embind_init_charCodes() {
    var codes = new Array(256);
    for (var i = 0; i < 256; ++i) {
        codes[i] = String.fromCharCode(i)
    }
    embind_charCodes = codes
    }
    var embind_charCodes: any[] | undefined = undefined;
    function readLatin1String(ptr: any) {
    var ret = "";
    var c = ptr;
    while (HEAPU8[c]) {
        ret += embind_charCodes[HEAPU8[c++]]
    }
    return ret
    }
    var BindingError: { (): any; new(arg0: string): any; } | undefined = undefined;
    function throwBindingError(message: string) {
    throw new BindingError(message)
    }
    function registerType(rawType: PropertyKey, registeredInstance: { name: any; fromWireType?: boolean | ((wt: any) => boolean) | ((handle: any) => any) | ((value: any) => any) | ((handle: any) => Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Float32Array | Float64Array) | ((value: any) => string | undefined) | (() => undefined) | ((value: any) => any); toWireType?: ((destructors: any, o: any) => any) | ((destructors: any, value: any) => any) | ((destructors: any, value: any) => any) | ((destructors: any, value: any) => any) | ((destructors: any, value: any) => any) | ((destructors: any, o: any) => undefined) | ((destructors: any, value: any) => any); argPackAdvance?: number; readValueFromPointer?: ((pointer: any) => any) | ((pointer: any) => any) | ((pointer: any) => any) | ((pointer: any) => any) | ((handle: any) => Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Float32Array | Float64Array); destructorFunction?: ((ptr: any) => void) | ((ptr: any) => void) | null; isVoid?: boolean; }, options = {}) {
    if (! ("argPackAdvance" in registeredInstance)) {
        throw new TypeError("registerType registeredInstance requires argPackAdvance")
    }
    var name = registeredInstance.name;
    if (!rawType) {
        throwBindingError(`type "${name}"must have a positive integer typeid pointer`)
    }
    if (registeredTypes.hasOwnProperty(rawType)) {
        if (options.ignoreDuplicateRegistrations) {
        return
        } else {
        throwBindingError(`Cannot register type '${name}'twice`)
        }
    }
    registeredTypes[rawType] = registeredInstance;
    delete typeDependencies[rawType];
    if (awaitingDependencies.hasOwnProperty(rawType)) {
        var callbacks = awaitingDependencies[rawType];
        delete awaitingDependencies[rawType];
        callbacks.forEach((cb: () => any) => cb())
    }
    }
    function __embind_register_bool(rawType: any, name: string, size: number, trueValue: any, falseValue: any) {
    var shift = getShiftFromSize(size);
    name = readLatin1String(name);
    registerType(rawType, {
        name: name,
        "fromWireType": function(wt: any) {
        return !! wt
        },
        "toWireType": function(destructors: any, o: any) {
        return o ? trueValue: falseValue
        },
        "argPackAdvance": 8,
        "readValueFromPointer": function(pointer: number) {
        var heap;
        if (size === 1) {
            heap = HEAP8
        } else if (size === 2) {
            heap = HEAP16
        } else if (size === 4) {
            heap = HEAP32
        } else {
            throw new TypeError("Unknown boolean type size: " + name)
        }
        return this["fromWireType"](heap[pointer >> shift])
        },
        destructorFunction: null
    })
    }
    function ClassHandle_isAliasOf(this: any, other: { $$: { ptrType: { registeredClass: any; }; ptr: any; }; }) {
    if (! (this instanceof ClassHandle)) {
        return false
    }
    if (! (other instanceof ClassHandle)) {
        return false
    }
    var leftClass = this.$$.ptrType.registeredClass;
    var left = this.$$.ptr;
    var rightClass = other.$$.ptrType.registeredClass;
    var right = other.$$.ptr;
    while (leftClass.baseClass) {
        left = leftClass.upcast(left);
        leftClass = leftClass.baseClass
    }
    while (rightClass.baseClass) {
        right = rightClass.upcast(right);
        rightClass = rightClass.baseClass
    }
    return leftClass === rightClass && left === right
    }
    function shallowCopyInternalPointer(o: { count: any; deleteScheduled: any; preservePointerOnDelete: any; ptr: any; ptrType: any; smartPtr: any; smartPtrType: any; }) {
    return {
        count: o.count,
        deleteScheduled: o.deleteScheduled,
        preservePointerOnDelete: o.preservePointerOnDelete,
        ptr: o.ptr,
        ptrType: o.ptrType,
        smartPtr: o.smartPtr,
        smartPtrType: o.smartPtrType
    }
    }
    function throwInstanceAlreadyDeleted(obj: any) {
    function getInstanceTypeName(handle: { $$: { ptrType: { registeredClass: { name: any; }; }; }; }) {
        return handle.$$.ptrType.registeredClass.name
    }
    throwBindingError(getInstanceTypeName(obj) + " instance already deleted")
    }
    var finalizationRegistry = false;
    function detachFinalizer(handle: any) {}
    function runDestructor($$: { smartPtr: any; smartPtrType: { rawDestructor: (arg0: any) => void; }; ptrType: { registeredClass: { rawDestructor: (arg0: any) => void; }; }; ptr: any; }) {
    if ($$.smartPtr) {
        $$.smartPtrType.rawDestructor($$.smartPtr)
    } else {
        $$.ptrType.registeredClass.rawDestructor($$.ptr)
    }
    }
    function releaseClassHandle($$: { count: { value: number; }; }) {
    $$.count.value -= 1;
    var toDelete = 0 === $$.count.value;
    if (toDelete) {
        runDestructor($$)
    }
    }
    function downcastPointer(ptr: any, ptrClass: any, desiredClass: { baseClass: undefined; downcast: (arg0: any) => any; }) {
    if (ptrClass === desiredClass) {
        return ptr
    }
    if (undefined === desiredClass.baseClass) {
        return null
    }
    var rv = downcastPointer(ptr, ptrClass, desiredClass.baseClass);
    if (rv === null) {
        return null
    }
    return desiredClass.downcast(rv)
    }
    var registeredPointers = {};
    function getInheritedInstanceCount() {
    return Object.keys(registeredInstances).length
    }
    function getLiveInheritedInstances() {
    var rv = [];
    for (var k in registeredInstances) {
        if (registeredInstances.hasOwnProperty(k)) {
        rv.push(registeredInstances[k])
        }
    }
    return rv
    }
    var deletionQueue: any[] = [];
    function flushPendingDeletes() {
    while (deletionQueue.length) {
        var obj = deletionQueue.pop();
        obj.$$.deleteScheduled = false;
        obj["delete"]()
    }
    }
    var delayFunction: ((arg0: { (): void; (): void; }) => void) | undefined = undefined;
    function setDelayFunction(fn: any) {
    delayFunction = fn;
    if (deletionQueue.length && delayFunction) {
        delayFunction(flushPendingDeletes)
    }
    }
    function init_embind() {
    Module["getInheritedInstanceCount"] = getInheritedInstanceCount;
    Module["getLiveInheritedInstances"] = getLiveInheritedInstances;
    Module["flushPendingDeletes"] = flushPendingDeletes;
    Module["setDelayFunction"] = setDelayFunction
    }
    var registeredInstances = {};
    function getBasestPointer(class_: { baseClass: any; upcast: (arg0: any) => any; }, ptr: undefined) {
    if (ptr === undefined) {
        throwBindingError("ptr should not be undefined")
    }
    while (class_.baseClass) {
        ptr = class_.upcast(ptr);
        class_ = class_.baseClass
    }
    return ptr
    }
    function getInheritedInstance(class_: any, ptr: string | number) {
    ptr = getBasestPointer(class_, ptr);
    return registeredInstances[ptr]
    }
    function makeClassHandle(prototype: object | null, record: { ptrType: any; ptr: any; smartPtrType?: any; smartPtr?: any; count?: any; }) {
    if (!record.ptrType || !record.ptr) {
        throwInternalError("makeClassHandle requires ptr and ptrType")
    }
    var hasSmartPtrType = !!record.smartPtrType;
    var hasSmartPtr = !!record.smartPtr;
    if (hasSmartPtrType !== hasSmartPtr) {
        throwInternalError("Both smartPtrType and smartPtr must be specified")
    }
    record.count = {
        value: 1
    };
    return attachFinalizer(Object.create(prototype, {
        $$: {
        value: record
        }
    }))
    }
    function RegisteredPointer_fromWireType(this: any, ptr: any) {
    var rawPointer = this.getPointee(ptr);
    if (!rawPointer) {
        this.destructor(ptr);
        return null
    }
    var registeredInstance = getInheritedInstance(this.registeredClass, rawPointer);
    if (undefined !== registeredInstance) {
        if (0 === registeredInstance.$$.count.value) {
        registeredInstance.$$.ptr = rawPointer;
        registeredInstance.$$.smartPtr = ptr;
        return registeredInstance["clone"]()
        } else {
        var rv = registeredInstance["clone"]();
        this.destructor(ptr);
        return rv
        }
    }
    function makeDefaultHandle(this: any) {
        if (this.isSmartPointer) {
        return makeClassHandle(this.registeredClass.instancePrototype, {
            ptrType: this.pointeeType,
            ptr: rawPointer,
            smartPtrType: this,
            smartPtr: ptr
        })
        } else {
        return makeClassHandle(this.registeredClass.instancePrototype, {
            ptrType: this,
            ptr: ptr
        })
        }
    }
    var actualType = this.registeredClass.getActualType(rawPointer);
    var registeredPointerRecord = registeredPointers[actualType];
    if (!registeredPointerRecord) {
        return makeDefaultHandle.call(this)
    }
    var toType;
    if (this.isConst) {
        toType = registeredPointerRecord.constPointerType
    } else {
        toType = registeredPointerRecord.pointerType
    }
    var dp = downcastPointer(rawPointer, this.registeredClass, toType.registeredClass);
    if (dp === null) {
        return makeDefaultHandle.call(this)
    }
    if (this.isSmartPointer) {
        return makeClassHandle(toType.registeredClass.instancePrototype, {
        ptrType: toType,
        ptr: dp,
        smartPtrType: this,
        smartPtr: ptr
        })
    } else {
        return makeClassHandle(toType.registeredClass.instancePrototype, {
        ptrType: toType,
        ptr: dp
        })
    }
    }
    var attachFinalizer = function(handle: number | boolean) {
    if ("undefined" === typeof FinalizationRegistry) {
        attachFinalizer = handle => handle;
        return handle
    }
    finalizationRegistry = new FinalizationRegistry(info => {
        releaseClassHandle(info.$$)
    });
    attachFinalizer = handle => {
        var $$ = handle.$$;
        var hasSmartPtr = !!$$.smartPtr;
        if (hasSmartPtr) {
        var info = {
            $$: $$
        };
        finalizationRegistry.register(handle, info, handle)
        }
        return handle
    };
    detachFinalizer = (handle: any) => finalizationRegistry.unregister(handle);
    return attachFinalizer(handle)
    };
    function ClassHandle_clone(this: any) {
    if (!this.$$.ptr) {
        throwInstanceAlreadyDeleted(this)
    }
    if (this.$$.preservePointerOnDelete) {
        this.$$.count.value += 1;
        return this
    } else {
        var clone = attachFinalizer(Object.create(Object.getPrototypeOf(this), {
        $$: {
            value: shallowCopyInternalPointer(this.$$)
        }
        }));
        clone.$$.count.value += 1;
        clone.$$.deleteScheduled = false;
        return clone
    }
    }
    function ClassHandle_delete(this: any) {
    if (!this.$$.ptr) {
        throwInstanceAlreadyDeleted(this)
    }
    if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
        throwBindingError("Object already scheduled for deletion")
    }
    detachFinalizer(this);
    releaseClassHandle(this.$$);
    if (!this.$$.preservePointerOnDelete) {
        this.$$.smartPtr = undefined;
        this.$$.ptr = undefined
    }
    }
    function ClassHandle_isDeleted(this: any) {
    return ! this.$$.ptr
    }
    function ClassHandle_deleteLater(this: any) {
    if (!this.$$.ptr) {
        throwInstanceAlreadyDeleted(this)
    }
    if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
        throwBindingError("Object already scheduled for deletion")
    }
    deletionQueue.push(this);
    if (deletionQueue.length === 1 && delayFunction) {
        delayFunction(flushPendingDeletes)
    }
    this.$$.deleteScheduled = true;
    return this
    }
    function init_ClassHandle() {
    ClassHandle.prototype["isAliasOf"] = ClassHandle_isAliasOf;
    ClassHandle.prototype["clone"] = ClassHandle_clone;
    ClassHandle.prototype["delete"] = ClassHandle_delete;
    ClassHandle.prototype["isDeleted"] = ClassHandle_isDeleted;
    ClassHandle.prototype["deleteLater"] = ClassHandle_deleteLater
    }
    function ClassHandle() {}
    function ensureOverloadTable(proto: { [x: string]: { overloadTable: { [x: string]: any; }; }; }, methodName: string | number, humanName: string) {
    if (undefined === proto[methodName].overloadTable) {
        var prevFunc = proto[methodName];
        proto[methodName] = function() {
        if (!proto[methodName].overloadTable.hasOwnProperty(arguments.length)) {
            throwBindingError(`Function '${humanName}'called with an invalid number of arguments($ {
            arguments.length
            }) - expects one of($ {
            proto[methodName].overloadTable
            }) ! `)
        }
        return proto[methodName].overloadTable[arguments.length].apply(this, arguments)
        };
        proto[methodName].overloadTable = [];
        proto[methodName].overloadTable[prevFunc.argCount] = prevFunc
    }
    }
    function exposePublicSymbol(name: PropertyKey, value: { (): void; (): void; }, numArguments: PropertyKey | undefined) {
    if (Module.hasOwnProperty(name)) {
        if (undefined === numArguments || undefined !== Module[name].overloadTable && undefined !== Module[name].overloadTable[numArguments]) {
        throwBindingError(`Cannot register public name '${name}'twice`)
        }
        ensureOverloadTable(Module, name, name);
        if (Module.hasOwnProperty(numArguments)) {
        throwBindingError(`Cannot register multiple overloads of a
        function with the same number of arguments($ {
            numArguments
        }) ! `)
        }
        Module[name].overloadTable[numArguments] = value
    } else {
        Module[name] = value;
        if (undefined !== numArguments) {
        Module[name].numArguments = numArguments
        }
    }
    }
    function RegisteredClass(this: any, name: any, constructor: () => any, instancePrototype: any, rawDestructor: any, baseClass: any, getActualType: any, upcast: any, downcast: any) {
    this.name = name;
    this.constructor = constructor;
    this.instancePrototype = instancePrototype;
    this.rawDestructor = rawDestructor;
    this.baseClass = baseClass;
    this.getActualType = getActualType;
    this.upcast = upcast;
    this.downcast = downcast;
    this.pureVirtualFunctions = []
    }
    function upcastPointer(ptr: any, ptrClass: { upcast: (arg0: any) => any; baseClass: any; }, desiredClass: any) {
    while (ptrClass !== desiredClass) {
        if (!ptrClass.upcast) {
        throwBindingError(`Expected null or instance of $ {
            desiredClass.name
        },
        got an instance of $ {
            ptrClass.name
        }`)
        }
        ptr = ptrClass.upcast(ptr);
        ptrClass = ptrClass.baseClass
    }
    return ptr
    }
    function constNoSmartPtrRawPointerToWireType(this: any, destructors: any, handle: { $$: { ptr: any; ptrType: { registeredClass: any; }; }; } | null) {
    if (handle === null) {
        if (this.isReference) {
        throwBindingError(`null is not a valid $ {
            this.name
        }`)
        }
        return 0
    }
    if (!handle.$$) {
        throwBindingError(`Cannot pass "${embindRepr(handle)}"as a $ {
        this.name
        }`)
    }
    if (!handle.$$.ptr) {
        throwBindingError(`Cannot pass deleted object as a pointer of type $ {
        this.name
        }`)
    }
    var handleClass = handle.$$.ptrType.registeredClass;
    var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
    return ptr
    }
    function genericPointerToWireType(this: any, destructors: any[] | null, handle: { [x: string]: () => any; $$: { ptr: any; ptrType: { isConst: any; registeredClass: any; }; smartPtr: undefined; smartPtrType: any; }; } | null) {
    var ptr;
    if (handle === null) {
        if (this.isReference) {
        throwBindingError(`null is not a valid $ {
            this.name
        }`)
        }
        if (this.isSmartPointer) {
        ptr = this.rawConstructor();
        if (destructors !== null) {
            destructors.push(this.rawDestructor, ptr)
        }
        return ptr
        } else {
        return 0
        }
    }
    if (!handle.$$) {
        throwBindingError(`Cannot pass "${embindRepr(handle)}"as a $ {
        this.name
        }`)
    }
    if (!handle.$$.ptr) {
        throwBindingError(`Cannot pass deleted object as a pointer of type $ {
        this.name
        }`)
    }
    if (!this.isConst && handle.$$.ptrType.isConst) {
        throwBindingError(`Cannot convert argument of type $ {
        handle.$$.smartPtrType ? handle.$$.smartPtrType.name: handle.$$.ptrType.name
        }
        to parameter type $ {
        this.name
        }`)
    }
    var handleClass = handle.$$.ptrType.registeredClass;
    ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
    if (this.isSmartPointer) {
        if (undefined === handle.$$.smartPtr) {
        throwBindingError("Passing raw pointer to smart pointer is illegal")
        }
        switch (this.sharingPolicy) {
        case 0:
        if (handle.$$.smartPtrType === this) {
            ptr = handle.$$.smartPtr
        } else {
            throwBindingError(`Cannot convert argument of type $ {
            handle.$$.smartPtrType ? handle.$$.smartPtrType.name: handle.$$.ptrType.name
            }
            to parameter type $ {
            this.name
            }`)
        }
        break;
        case 1:
        ptr = handle.$$.smartPtr;
        break;
        case 2:
        if (handle.$$.smartPtrType === this) {
            ptr = handle.$$.smartPtr
        } else {
            var clonedHandle = handle["clone"]();
            ptr = this.rawShare(ptr, Emval.toHandle(function() {
            clonedHandle["delete"]()
            }));
            if (destructors !== null) {
            destructors.push(this.rawDestructor, ptr)
            }
        }
        break;
        default:
        throwBindingError("Unsupporting sharing policy")
        }
    }
    return ptr
    }
    function nonConstNoSmartPtrRawPointerToWireType(this: any, destructors: any, handle: { $$: { ptr: any; ptrType: { isConst: any; registeredClass: any; }; }; } | null) {
    if (handle === null) {
        if (this.isReference) {
        throwBindingError(`null is not a valid $ {
            this.name
        }`)
        }
        return 0
    }
    if (!handle.$$) {
        throwBindingError(`Cannot pass "${embindRepr(handle)}"as a $ {
        this.name
        }`)
    }
    if (!handle.$$.ptr) {
        throwBindingError(`Cannot pass deleted object as a pointer of type $ {
        this.name
        }`)
    }
    if (handle.$$.ptrType.isConst) {
        throwBindingError(`Cannot convert argument of type $ {
        handle.$$.ptrType.name
        }
        to parameter type $ {
        this.name
        }`)
    }
    var handleClass = handle.$$.ptrType.registeredClass;
    var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
    return ptr
    }
    function RegisteredPointer_getPointee(this: any, ptr: any) {
    if (this.rawGetPointee) {
        ptr = this.rawGetPointee(ptr)
    }
    return ptr
    }
    function RegisteredPointer_destructor(this: any, ptr: any) {
    if (this.rawDestructor) {
        this.rawDestructor(ptr)
    }
    }
    function RegisteredPointer_deleteObject(handle: { [x: string]: () => void; } | null) {
    if (handle !== null) {
        handle["delete"]()
    }
    }
    function init_RegisteredPointer() {
    RegisteredPointer.prototype.getPointee = RegisteredPointer_getPointee;
    RegisteredPointer.prototype.destructor = RegisteredPointer_destructor;
    RegisteredPointer.prototype["argPackAdvance"] = 8;
    RegisteredPointer.prototype["readValueFromPointer"] = simpleReadValueFromPointer;
    RegisteredPointer.prototype["deleteObject"] = RegisteredPointer_deleteObject;
    RegisteredPointer.prototype["fromWireType"] = RegisteredPointer_fromWireType
    }
    function RegisteredPointer(this: any, name: string, registeredClass: { baseClass: undefined; }, isReference: boolean, isConst: boolean, isSmartPointer: boolean, pointeeType: undefined, sharingPolicy: undefined, rawGetPointee: undefined, rawConstructor: undefined, rawShare: undefined, rawDestructor: undefined) {
    this.name = name;
    this.registeredClass = registeredClass;
    this.isReference = isReference;
    this.isConst = isConst;
    this.isSmartPointer = isSmartPointer;
    this.pointeeType = pointeeType;
    this.sharingPolicy = sharingPolicy;
    this.rawGetPointee = rawGetPointee;
    this.rawConstructor = rawConstructor;
    this.rawShare = rawShare;
    this.rawDestructor = rawDestructor;
    if (!isSmartPointer && registeredClass.baseClass === undefined) {
        if (isConst) {
        this["toWireType"] = constNoSmartPtrRawPointerToWireType;
        this.destructorFunction = null
        } else {
        this["toWireType"] = nonConstNoSmartPtrRawPointerToWireType;
        this.destructorFunction = null
        }
    } else {
        this["toWireType"] = genericPointerToWireType
    }
    }
    function replacePublicSymbol(name: PropertyKey, value: () => any, numArguments: number | undefined) {
    if (!Module.hasOwnProperty(name)) {
        throwInternalError("Replacing nonexistant public symbol")
    }
    if (undefined !== Module[name].overloadTable && undefined !== numArguments) {
        Module[name].overloadTable[numArguments] = value
    } else {
        Module[name] = value;
        Module[name].argCount = numArguments
    }
    }
    var dynCallLegacy = (sig: string, ptr: any, args: string | any[]) => {
    var f = Module["dynCall_" + sig];
    return args && args.length ? f.apply(null, [ptr].concat(args)) : f.call(null, ptr)
    };
    var wasmTableMirror: string | any[] = [];
    var getWasmTableEntry = (funcPtr: number) => {
    var func = wasmTableMirror[funcPtr];
    if (!func) {
        if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
        wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr)
    }
    return func
    };
    var dynCall = (sig: string | string[], ptr: any, args: any[]) => {
    if (sig.includes("j")) {
        return dynCallLegacy(sig, ptr, args)
    }
    var rtn = getWasmTableEntry(ptr).apply(null, args);
    return rtn
    };
    var getDynCaller = (sig: any, ptr: any) => {
    var argCache: string | any[] = [];
    return function() {
        argCache.length = 0;
        Object.assign(argCache, arguments);
        return dynCall(sig, ptr, argCache)
    }
    };
    function embind__requireFunction(signature: string | string[], rawFunction: any) {
    signature = readLatin1String(signature);
    function makeDynCaller() {
        if (signature.includes("j")) {
        return getDynCaller(signature, rawFunction)
        }
        return getWasmTableEntry(rawFunction)
    }
    var fp = makeDynCaller();
    if (typeof fp != "function") {
        throwBindingError(`unknown
        function pointer with signature $ {
        signature
        }: $ {
        rawFunction
        }`)
    }
    return fp
    }
    var UnboundTypeError: { (): any; new(arg0: string): any; } | undefined = undefined;
    function getTypeName(type: any) {
    var ptr = ___getTypeName(type);
    var rv = readLatin1String(ptr);
    _free(ptr);
    return rv
    }
    function throwUnboundTypeError(message: string, types: any[]) {
    var unboundTypes: never[] = [];
    var seen = {};
    function visit(type: string | number) {
        if (seen[type]) {
        return
        }
        if (registeredTypes[type]) {
        return
        }
        if (typeDependencies[type]) {
        typeDependencies[type].forEach(visit);
        return
        }
        unboundTypes.push(type);
        seen[type] = true
    }
    types.forEach(visit);
    throw new UnboundTypeError(`$ {
        message
    }: ` + unboundTypes.map(getTypeName).join([", "]))
    }
    function __embind_register_class(rawType: string | number, rawPointerType: any, rawConstPointerType: any, baseClassRawType: any, getActualTypeSignature: any, getActualType: any, upcastSignature: any, upcast: any, downcastSignature: any, downcast: any, name: string, destructorSignature: any, rawDestructor: any) {
    name = readLatin1String(name);
    getActualType = embind__requireFunction(getActualTypeSignature, getActualType);
    if (upcast) {
        upcast = embind__requireFunction(upcastSignature, upcast)
    }
    if (downcast) {
        downcast = embind__requireFunction(downcastSignature, downcast)
    }
    rawDestructor = embind__requireFunction(destructorSignature, rawDestructor);
    var legalFunctionName = makeLegalFunctionName(name);
    exposePublicSymbol(legalFunctionName,
    function() {
        throwUnboundTypeError(`Cannot construct $ {
        name
        }
        due to unbound types`, [baseClassRawType])
    });
    whenDependentTypesAreResolved([rawType, rawPointerType, rawConstPointerType], baseClassRawType ? [baseClassRawType] : [],
    function(base: any[]) {
        base = base[0];
        var baseClass;
        var basePrototype;
        if (baseClassRawType) {
        baseClass = base.registeredClass;
        basePrototype = baseClass.instancePrototype
        } else {
        basePrototype = ClassHandle.prototype
        }
        var constructor = createNamedFunction(legalFunctionName,
        function() {
        if (Object.getPrototypeOf(this) !== instancePrototype) {
            throw new BindingError("Use 'new' to construct " + name)
        }
        if (undefined === registeredClass.constructor_body) {
            throw new BindingError(name + " has no accessible constructor")
        }
        var body = registeredClass.constructor_body[arguments.length];
        if (undefined === body) {
            throw new BindingError(`Tried to invoke ctor of $ {
            name
            }
            with invalid number of parameters($ {
            arguments.length
            }) - expected($ {
            Object.keys(registeredClass.constructor_body).toString()
            }) parameters instead ! `)
        }
        return body.apply(this, arguments)
        });
        var instancePrototype = Object.create(basePrototype, {
        constructor: {
            value: constructor
        }
        });
        constructor.prototype = instancePrototype;
        var registeredClass = new RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast);
        if (registeredClass.baseClass) {
        if (registeredClass.baseClass.__derivedClasses === undefined) {
            registeredClass.baseClass.__derivedClasses = []
        }
        registeredClass.baseClass.__derivedClasses.push(registeredClass)
        }
        var referenceConverter = new RegisteredPointer(name, registeredClass, true, false, false);
        var pointerConverter = new RegisteredPointer(name + "*", registeredClass, false, false, false);
        var constPointerConverter = new RegisteredPointer(name + " const*", registeredClass, false, true, false);
        registeredPointers[rawType] = {
        pointerType: pointerConverter,
        constPointerType: constPointerConverter
        };
        replacePublicSymbol(legalFunctionName, constructor);
        return [referenceConverter, pointerConverter, constPointerConverter]
    })
    }
    function heap32VectorToArray(count: number, firstElement: number) {
    var array = [];
    for (var i = 0; i < count; i++) {
        array.push(HEAPU32[firstElement + i * 4 >> 2])
    }
    return array
    }
    function newFunc(constructor: FunctionConstructor, argumentList: string[]) {
    if (! (constructor instanceof Function)) {
        throw new TypeError(`new_ called with constructor type $ {
        typeof constructor
        }
        which is not a
        function`)
    }
    var dummy = createNamedFunction(constructor.name || "unknownFunctionName",
    function() {});
    dummy.prototype = constructor.prototype;
    var obj = new dummy;
    var r = constructor.apply(obj, argumentList);
    return r instanceof Object ? r: obj
    }
    function craftInvokerFunction(humanName: string, argTypes: string | any[], classType: null, cppInvokerFunc: any, cppTargetFunc: any, isAsync: undefined) {
    var argCount = argTypes.length;
    if (argCount < 2) {
        throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!")
    }
    var isClassMethodFunc = argTypes[1] !== null && classType !== null;
    var needsDestructorStack = false;
    for (var i = 1; i < argTypes.length; ++i) {
        if (argTypes[i] !== null && argTypes[i].destructorFunction === undefined) {
        needsDestructorStack = true;
        break
        }
    }
    var returns = argTypes[0].name !== "void";
    var argsList = "";
    var argsListWired = "";
    for (var i = 0; i < argCount - 2; ++i) {
        argsList += (i !== 0 ? ", ": "") + "arg" + i;
        argsListWired += (i !== 0 ? ", ": "") + "arg" + i + "Wired"
    }
    var invokerFnBody = `\n
    return function $ {
        makeLegalFunctionName(humanName)
    } ($ {
        argsList
    }) {\n
        if (arguments.length !== $ {
        argCount - 2
        }) {\n throwBindingError('function ${humanName} called with ${arguments.length} arguments, expected ${argCount - 2} args!');\n
        }`;
        if (needsDestructorStack) {
        invokerFnBody += "var destructors = [];\n"
        }
        var dtorStack = needsDestructorStack ? "destructors": "null";
        var args1 = ["throwBindingError", "invoker", "fn", "runDestructors", "retType", "classParam"];
        var args2 = [throwBindingError, cppInvokerFunc, cppTargetFunc, runDestructors, argTypes[0], argTypes[1]];
        if (isClassMethodFunc) {
        invokerFnBody += "var thisWired = classParam.toWireType(" + dtorStack + ", this);\n"
        }
        for (var i = 0; i < argCount - 2; ++i) {
        invokerFnBody += "var arg" + i + "Wired = argType" + i + ".toWireType(" + dtorStack + ", arg" + i + "); // " + argTypes[i + 2].name + "\n";
        args1.push("argType" + i);
        args2.push(argTypes[i + 2])
        }
        if (isClassMethodFunc) {
        argsListWired = "thisWired" + (argsListWired.length > 0 ? ", ": "") + argsListWired
        }
        invokerFnBody += (returns || isAsync ? "var rv = ": "") + "invoker(fn" + (argsListWired.length > 0 ? ", ": "") + argsListWired + ");\n";
        if (needsDestructorStack) {
        invokerFnBody += "runDestructors(destructors);\n"
        } else {
        for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; ++i) {
            var paramName = i === 1 ? "thisWired": "arg" + (i - 2) + "Wired";
            if (argTypes[i].destructorFunction !== null) {
            invokerFnBody += paramName + "_dtor(" + paramName + "); // " + argTypes[i].name + "\n";
            args1.push(paramName + "_dtor");
            args2.push(argTypes[i].destructorFunction)
            }
        }
        }
        if (returns) {
        invokerFnBody += "var ret = retType.fromWireType(rv);\n" + "return ret;\n"
        } else {}
        invokerFnBody += "}\n";
        args1.push(invokerFnBody);
        return newFunc(Function, args1).apply(null, args2)
    }
    function __embind_register_class_constructor(rawClassType: any, argCount: number, rawArgTypesAddr: any, invokerSignature: any, invoker: any, rawConstructor: any) {
        assert(argCount > 0);
        var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
        invoker = embind__requireFunction(invokerSignature, invoker);
        whenDependentTypesAreResolved([], [rawClassType],
        function(classType: any[]) {
        classType = classType[0];
        var humanName = `constructor $ {
            classType.name
        }`;
        if (undefined === classType.registeredClass.constructor_body) {
            classType.registeredClass.constructor_body = []
        }
        if (undefined !== classType.registeredClass.constructor_body[argCount - 1]) {
            throw new BindingError(`Cannot register multiple constructors with identical number of parameters($ {
            argCount - 1
            }) for class '${classType.name}' ! Overload resolution is currently only performed using the parameter count, not actual type info ! `)
        }
        classType.registeredClass.constructor_body[argCount - 1] = () => {
            throwUnboundTypeError(`Cannot construct $ {
            classType.name
            }
            due to unbound types`, rawArgTypes)
        };
        whenDependentTypesAreResolved([], rawArgTypes,
        function(argTypes: any[]) {
            argTypes.splice(1, 0, null);
            classType.registeredClass.constructor_body[argCount - 1] = craftInvokerFunction(humanName, argTypes, null, invoker, rawConstructor);
            return []
        });
        return []
        })
    }
    function __embind_register_class_function(rawClassType: any, methodName: string, argCount: number, rawArgTypesAddr: any, invokerSignature: any, rawInvoker: any, context: any, isPureVirtual: any, isAsync: any) {
        var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
        methodName = readLatin1String(methodName);
        rawInvoker = embind__requireFunction(invokerSignature, rawInvoker);
        whenDependentTypesAreResolved([], [rawClassType],
        function(classType: any[]) {
        classType = classType[0];
        var humanName = `$ {
            classType.name
        }.$ {
            methodName
        }`;
        if (methodName.startsWith("@@")) {
            methodName = Symbol[methodName.substring(2)]
        }
        if (isPureVirtual) {
            classType.registeredClass.pureVirtualFunctions.push(methodName)
        }
        function unboundTypesHandler() {
            throwUnboundTypeError(`Cannot call $ {
            humanName
            }
            due to unbound types`, rawArgTypes)
        }
        var proto = classType.registeredClass.instancePrototype;
        var method = proto[methodName];
        if (undefined === method || undefined === method.overloadTable && method.className !== classType.name && method.argCount === argCount - 2) {
            unboundTypesHandler.argCount = argCount - 2;
            unboundTypesHandler.className = classType.name;
            proto[methodName] = unboundTypesHandler
        } else {
            ensureOverloadTable(proto, methodName, humanName);
            proto[methodName].overloadTable[argCount - 2] = unboundTypesHandler
        }
        whenDependentTypesAreResolved([], rawArgTypes,
        function(argTypes: any) {
            var memberFunction = craftInvokerFunction(humanName, argTypes, classType, rawInvoker, context, isAsync);
            if (undefined === proto[methodName].overloadTable) {
            memberFunction.argCount = argCount - 2;
            proto[methodName] = memberFunction
            } else {
            proto[methodName].overloadTable[argCount - 2] = memberFunction
            }
            return []
        });
        return []
        })
    }
    function HandleAllocator(this: any) {
        this.allocated = [undefined];
        this.freelist = [];
        this.get = function(id: string | number) {
        return this.allocated[id]
        };
        this.has = function(id: string | number) {
        return this.allocated[id] !== undefined
        };
        this.allocate = function(handle: any) {
        var id = this.freelist.pop() || this.allocated.length;
        this.allocated[id] = handle;
        return id
        };
        this.free = function(id: string | number) {
        this.allocated[id] = undefined;
        this.freelist.push(id)
        }
    }
    var emval_handles = new HandleAllocator;
    function __emval_decref(handle: number) {
        if (handle >= emval_handles.reserved && 0 === --emval_handles.get(handle).refcount) {
        emval_handles.free(handle)
        }
    }
    function count_emval_handles() {
        var count = 0;
        for (var i = emval_handles.reserved; i < emval_handles.allocated.length; ++i) {
        if (emval_handles.allocated[i] !== undefined) {++count
        }
        }
        return count
    }
    function init_emval() {
        emval_handles.allocated.push({
        value: undefined
        },
        {
        value: null
        },
        {
        value: true
        },
        {
        value: false
        });
        emval_handles.reserved = emval_handles.allocated.length;
        Module["count_emval_handles"] = count_emval_handles
    }
    var Emval = {
        toValue: (handle: string) => {
        if (!handle) {
            throwBindingError("Cannot use deleted val. handle = " + handle)
        }
        return emval_handles.get(handle).value
        },
        toHandle: (value: any) => {
        switch (value) {
        case undefined:
            return 1;
        case null:
            return 2;
        case true:
            return 3;
        case false:
            return 4;
        default:
            {
            return emval_handles.allocate({
                refcount:
                1,
                value: value
            })
            }
        }
        }
    };
    function __embind_register_emval(rawType: any, name: string) {
        name = readLatin1String(name);
        registerType(rawType, {
        name: name,
        "fromWireType": function(handle: any) {
            var rv = Emval.toValue(handle);
            __emval_decref(handle);
            return rv
        },
        "toWireType": function(destructors: any, value: any) {
            return Emval.toHandle(value)
        },
        "argPackAdvance": 8,
        "readValueFromPointer": simpleReadValueFromPointer,
        destructorFunction: null
        })
    }
    function embindRepr(v: string | null) {
        if (v === null) {
        return "null"
        }
        var t = typeof v;
        if (t === "object" || t === "array" || t === "function") {
        return v.toString()
        } else {
        return "" + v
        }
    }
    function floatReadValueFromPointer(name: string, shift: number) {
        switch (shift) {
        case 2:
        return function(pointer: number) {
            return this["fromWireType"](HEAPF32[pointer >> 2])
        };
        case 3:
        return function(pointer: number) {
            return this["fromWireType"](HEAPF64[pointer >> 3])
        };
        default:
        throw new TypeError("Unknown float type: " + name)
        }
    }
    function __embind_register_float(rawType: any, name: string, size: any) {
        var shift = getShiftFromSize(size);
        name = readLatin1String(name);
        registerType(rawType, {
        name: name,
        "fromWireType": function(value: any) {
            return value
        },
        "toWireType": function(destructors: any, value: any) {
            return value
        },
        "argPackAdvance": 8,
        "readValueFromPointer": floatReadValueFromPointer(name, shift),
        destructorFunction: null
        })
    }
    function __embind_register_function(name: string, argCount: number, rawArgTypesAddr: any, signature: any, rawInvoker: any, fn: any, isAsync: any) {
        var argTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
        name = readLatin1String(name);
        rawInvoker = embind__requireFunction(signature, rawInvoker);
        exposePublicSymbol(name,
        function() {
        throwUnboundTypeError(`Cannot call $ {
            name
        }
        due to unbound types`, argTypes)
        },
        argCount - 1);
        whenDependentTypesAreResolved([], argTypes,
        function(argTypes: string | any[]) {
        var invokerArgsArray = [argTypes[0], null].concat(argTypes.slice(1));
        replacePublicSymbol(name, craftInvokerFunction(name, invokerArgsArray, null, rawInvoker, fn, isAsync), argCount - 1);
        return []
        })
    }
    function integerReadValueFromPointer(name: string, shift: number, signed: boolean) {
        switch (shift) {
        case 0:
        return signed ?
        function readS8FromPointer(pointer: string | number) {
            return HEAP8[pointer]
        }: function readU8FromPointer(pointer: string | number) {
            return HEAPU8[pointer]
        };
        case 1:
        return signed ?
        function readS16FromPointer(pointer: number) {
            return HEAP16[pointer >> 1]
        }: function readU16FromPointer(pointer: number) {
            return HEAPU16[pointer >> 1]
        };
        case 2:
        return signed ?
        function readS32FromPointer(pointer: number) {
            return HEAP32[pointer >> 2]
        }: function readU32FromPointer(pointer: number) {
            return HEAPU32[pointer >> 2]
        };
        default:
        throw new TypeError("Unknown integer type: " + name)
        }
    }
    function __embind_register_integer(primitiveType: any, name: string | string[], size: number, minRange: number, maxRange: number) {
        name = readLatin1String(name);
        if (maxRange === -1) {
        maxRange = 4294967295
        }
        var shift = getShiftFromSize(size);
        var fromWireType = (value: any) => value;
        if (minRange === 0) {
        var bitshift = 32 - 8 * size;
        fromWireType = value => value << bitshift >>> bitshift
        }
        var isUnsignedType = name.includes("unsigned");
        var checkAssertions = (value: any, toTypeName: any) => {};
        var toWireType;
        if (isUnsignedType) {
        toWireType = function(destructors: any, value: number) {
            checkAssertions(value, this.name);
            return value >>> 0
        }
        } else {
        toWireType = function(destructors: any, value: any) {
            checkAssertions(value, this.name);
            return value
        }
        }
        registerType(primitiveType, {
        name: name,
        "fromWireType": fromWireType,
        "toWireType": toWireType,
        "argPackAdvance": 8,
        "readValueFromPointer": integerReadValueFromPointer(name, shift, minRange !== 0),
        destructorFunction: null
        })
    }
    function __embind_register_memory_view(rawType: any, dataTypeIndex: string | number, name: string) {
        var typeMapping = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array];
        var TA = typeMapping[dataTypeIndex];
        function decodeMemoryView(handle: number) {
        handle = handle >> 2;
        var heap = HEAPU32;
        var size = heap[handle];
        var data = heap[handle + 1];
        return new TA(heap.buffer, data, size)
        }
        name = readLatin1String(name);
        registerType(rawType, {
        name: name,
        "fromWireType": decodeMemoryView,
        "argPackAdvance": 8,
        "readValueFromPointer": decodeMemoryView
        },
        {
        ignoreDuplicateRegistrations: true
        })
    }
    var stringToUTF8Array = (str: string, heap: any[], outIdx: number, maxBytesToWrite: number) => {
        if (! (maxBytesToWrite > 0)) return 0;
        var startIdx = outIdx;
        var endIdx = outIdx + maxBytesToWrite - 1;
        for (var i = 0; i < str.length; ++i) {
        var u = str.charCodeAt(i);
        if (u >= 55296 && u <= 57343) {
            var u1 = str.charCodeAt(++i);
            u = 65536 + ((u & 1023) << 10) | u1 & 1023
        }
        if (u <= 127) {
            if (outIdx >= endIdx) break;
            heap[outIdx++] = u
        } else if (u <= 2047) {
            if (outIdx + 1 >= endIdx) break;
            heap[outIdx++] = 192 | u >> 6;
            heap[outIdx++] = 128 | u & 63
        } else if (u <= 65535) {
            if (outIdx + 2 >= endIdx) break;
            heap[outIdx++] = 224 | u >> 12;
            heap[outIdx++] = 128 | u >> 6 & 63;
            heap[outIdx++] = 128 | u & 63
        } else {
            if (outIdx + 3 >= endIdx) break;
            heap[outIdx++] = 240 | u >> 18;
            heap[outIdx++] = 128 | u >> 12 & 63;
            heap[outIdx++] = 128 | u >> 6 & 63;
            heap[outIdx++] = 128 | u & 63
        }
        }
        heap[outIdx] = 0;
        return outIdx - startIdx
    };
    var stringToUTF8 = (str: any, outPtr: any, maxBytesToWrite: any) => {
        return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite)
    };
    var lengthBytesUTF8 = (str: string) => {
        var len = 0;
        for (var i = 0; i < str.length; ++i) {
        var c = str.charCodeAt(i);
        if (c <= 127) {
            len++
        } else if (c <= 2047) {
            len += 2
        } else if (c >= 55296 && c <= 57343) {
            len += 4; ++i
        } else {
            len += 3
        }
        }
        return len
    };
    var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : undefined;
    var UTF8ArrayToString = (heapOrArray: number[], idx: number, maxBytesToRead: any) => {
        var endIdx = idx + maxBytesToRead;
        var endPtr = idx;
        while (heapOrArray[endPtr] && !(endPtr >= endIdx))++endPtr;
        if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr))
        }
        var str = "";
        while (idx < endPtr) {
        var u0 = heapOrArray[idx++];
        if (! (u0 & 128)) {
            str += String.fromCharCode(u0);
            continue
        }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 224) == 192) {
            str += String.fromCharCode((u0 & 31) << 6 | u1);
            continue
        }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 240) == 224) {
            u0 = (u0 & 15) << 12 | u1 << 6 | u2
        } else {
            u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63
        }
        if (u0 < 65536) {
            str += String.fromCharCode(u0)
        } else {
            var ch = u0 - 65536;
            str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023)
        }
        }
        return str
    };
    var UTF8ToString = (ptr: any, maxBytesToRead: number | undefined) => {
        return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : ""
    };
    function __embind_register_std_string(rawType: any, name: string) {
        name = readLatin1String(name);
        var stdStringIsUTF8 = name === "std::string";
        registerType(rawType, {
        name: name,
        "fromWireType": function(value: number) {
            var length = HEAPU32[value >> 2];
            var payload = value + 4;
            var str;
            if (stdStringIsUTF8) {
            var decodeStartPtr = payload;
            for (var i = 0; i <= length; ++i) {
                var currentBytePtr = payload + i;
                if (i == length || HEAPU8[currentBytePtr] == 0) {
                var maxRead = currentBytePtr - decodeStartPtr;
                var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
                if (str === undefined) {
                    str = stringSegment
                } else {
                    str += String.fromCharCode(0);
                    str += stringSegment
                }
                decodeStartPtr = currentBytePtr + 1
                }
            }
            } else {
            var a = new Array(length);
            for (var i = 0; i < length; ++i) {
                a[i] = String.fromCharCode(HEAPU8[payload + i])
            }
            str = a.join("")
            }
            _free(value);
            return str
        },
        "toWireType": function(destructors: (() => any)[] | null, value: string | any[] | ArrayLike<number> | ArrayBuffer) {
            if (value instanceof ArrayBuffer) {
            value = new Uint8Array(value)
            }
            var length;
            var valueIsOfTypeString = typeof value == "string";
            if (! (valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) {
            throwBindingError("Cannot pass non-string to std::string")
            }
            if (stdStringIsUTF8 && valueIsOfTypeString) {
            length = lengthBytesUTF8(value)
            } else {
            length = value.length
            }
            var base = _malloc(4 + length + 1);
            var ptr = base + 4;
            HEAPU32[base >> 2] = length;
            if (stdStringIsUTF8 && valueIsOfTypeString) {
            stringToUTF8(value, ptr, length + 1)
            } else {
            if (valueIsOfTypeString) {
                for (var i = 0; i < length; ++i) {
                var charCode = value.charCodeAt(i);
                if (charCode > 255) {
                    _free(ptr);
                    throwBindingError("String has UTF-16 code units that do not fit in 8 bits")
                }
                HEAPU8[ptr + i] = charCode
                }
            } else {
                for (var i = 0; i < length; ++i) {
                HEAPU8[ptr + i] = value[i]
                }
            }
            }
            if (destructors !== null) {
            destructors.push(_free, base)
            }
            return base
        },
        "argPackAdvance": 8,
        "readValueFromPointer": simpleReadValueFromPointer,
        destructorFunction: function(ptr: any) {
            _free(ptr)
        }
        })
    }
    var UTF16Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf-16le") : undefined;
    var UTF16ToString = (ptr: number, maxBytesToRead: number) => {
        var endPtr = ptr;
        var idx = endPtr >> 1;
        var maxIdx = idx + maxBytesToRead / 2;
        while (! (idx >= maxIdx) && HEAPU16[idx])++idx;
        endPtr = idx << 1;
        if (endPtr - ptr > 32 && UTF16Decoder) return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
        var str = "";
        for (var i = 0; ! (i >= maxBytesToRead / 2); ++i) {
        var codeUnit = HEAP16[ptr + i * 2 >> 1];
        if (codeUnit == 0) break;
        str += String.fromCharCode(codeUnit)
        }
        return str
    };
    var stringToUTF16 = (str: string, outPtr: number, maxBytesToWrite: number | undefined) => {
        if (maxBytesToWrite === undefined) {
        maxBytesToWrite = 2147483647
        }
        if (maxBytesToWrite < 2) return 0;
        maxBytesToWrite -= 2;
        var startPtr = outPtr;
        var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
        for (var i = 0; i < numCharsToWrite; ++i) {
        var codeUnit = str.charCodeAt(i);
        HEAP16[outPtr >> 1] = codeUnit;
        outPtr += 2
        }
        HEAP16[outPtr >> 1] = 0;
        return outPtr - startPtr
    };
    var lengthBytesUTF16 = (str: string | any[]) => {
        return str.length * 2
    };
    var UTF32ToString = (ptr: number, maxBytesToRead: number) => {
        var i = 0;
        var str = "";
        while (! (i >= maxBytesToRead / 4)) {
        var utf32 = HEAP32[ptr + i * 4 >> 2];
        if (utf32 == 0) break; ++i;
        if (utf32 >= 65536) {
            var ch = utf32 - 65536;
            str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023)
        } else {
            str += String.fromCharCode(utf32)
        }
        }
        return str
    };
    var stringToUTF32 = (str: string, outPtr: number, maxBytesToWrite: number | undefined) => {
        if (maxBytesToWrite === undefined) {
        maxBytesToWrite = 2147483647
        }
        if (maxBytesToWrite < 4) return 0;
        var startPtr = outPtr;
        var endPtr = startPtr + maxBytesToWrite - 4;
        for (var i = 0; i < str.length; ++i) {
        var codeUnit = str.charCodeAt(i);
        if (codeUnit >= 55296 && codeUnit <= 57343) {
            var trailSurrogate = str.charCodeAt(++i);
            codeUnit = 65536 + ((codeUnit & 1023) << 10) | trailSurrogate & 1023
        }
        HEAP32[outPtr >> 2] = codeUnit;
        outPtr += 4;
        if (outPtr + 4 > endPtr) break
        }
        HEAP32[outPtr >> 2] = 0;
        return outPtr - startPtr
    };
    var lengthBytesUTF32 = (str: string) => {
        var len = 0;
        for (var i = 0; i < str.length; ++i) {
        var codeUnit = str.charCodeAt(i);
        if (codeUnit >= 55296 && codeUnit <= 57343)++i;
        len += 4
        }
        return len
    };
    var __embind_register_std_wstring = function(rawType: any, charSize: number, name: string) {
        name = readLatin1String(name);
        var decodeString: (arg0: any, arg1: number) => any, encodeString: (arg0: any, arg1: any, arg2: any) => void, getHeap: boolean | (() => any), lengthBytesUTF: (arg0: any) => any, shift: number;
        if (charSize === 2) {
        decodeString = UTF16ToString;
        encodeString = stringToUTF16;
        lengthBytesUTF = lengthBytesUTF16;
        getHeap = () => HEAPU16;
        shift = 1
        } else if (charSize === 4) {
        decodeString = UTF32ToString;
        encodeString = stringToUTF32;
        lengthBytesUTF = lengthBytesUTF32;
        getHeap = () => HEAPU32;
        shift = 2
        }
        registerType(rawType, {
        name: name,
        "fromWireType": function(value: number) {
            var length = HEAPU32[value >> 2];
            var HEAP = getHeap();
            var str;
            var decodeStartPtr = value + 4;
            for (var i = 0; i <= length; ++i) {
            var currentBytePtr = value + 4 + i * charSize;
            if (i == length || HEAP[currentBytePtr >> shift] == 0) {
                var maxReadBytes = currentBytePtr - decodeStartPtr;
                var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
                if (str === undefined) {
                str = stringSegment
                } else {
                str += String.fromCharCode(0);
                str += stringSegment
                }
                decodeStartPtr = currentBytePtr + charSize
            }
            }
            _free(value);
            return str
        },
        "toWireType": function(destructors: (() => any)[] | null, value: any) {
            if (! (typeof value == "string")) {
            throwBindingError(`Cannot pass non - string to C++string type $ {
                name
            }`)
            }
            var length = lengthBytesUTF(value);
            var ptr = _malloc(4 + length + charSize);
            HEAPU32[ptr >> 2] = length >> shift;
            encodeString(value, ptr + 4, length + charSize);
            if (destructors !== null) {
            destructors.push(_free, ptr)
            }
            return ptr
        },
        "argPackAdvance": 8,
        "readValueFromPointer": simpleReadValueFromPointer,
        destructorFunction: function(ptr: any) {
            _free(ptr)
        }
        })
    };
    function __embind_register_value_object(rawType: string | number, name: any, constructorSignature: any, rawConstructor: any, destructorSignature: any, rawDestructor: any) {
        structRegistrations[rawType] = {
        name: readLatin1String(name),
        rawConstructor: embind__requireFunction(constructorSignature, rawConstructor),
        rawDestructor: embind__requireFunction(destructorSignature, rawDestructor),
        fields: []
        }
    }
    function __embind_register_value_object_field(structType: string | number, fieldName: any, getterReturnType: any, getterSignature: any, getter: any, getterContext: any, setterArgumentType: any, setterSignature: any, setter: any, setterContext: any) {
        structRegistrations[structType].fields.push({
        fieldName: readLatin1String(fieldName),
        getterReturnType: getterReturnType,
        getter: embind__requireFunction(getterSignature, getter),
        getterContext: getterContext,
        setterArgumentType: setterArgumentType,
        setter: embind__requireFunction(setterSignature, setter),
        setterContext: setterContext
        })
    }
    function __embind_register_void(rawType: any, name: string) {
        name = readLatin1String(name);
        registerType(rawType, {
        isVoid: true,
        name: name,
        "argPackAdvance": 0,
        "fromWireType": function() {
            return undefined
        },
        "toWireType": function(destructors: any, o: any) {
            return undefined
        }
        })
    }
    function __emval_incref(handle: number) {
        if (handle > 4) {
        emval_handles.get(handle).refcount += 1
        }
    }
    function requireRegisteredType(rawType: string | number, humanName: string) {
        var impl = registeredTypes[rawType];
        if (undefined === impl) {
        throwBindingError(humanName + " has unknown type " + getTypeName(rawType))
        }
        return impl
    }
    function __emval_take_value(type: { [x: string]: (arg0: any) => any; }, arg: any) {
        type = requireRegisteredType(type, "_emval_take_value");
        var v = type["readValueFromPointer"](arg);
        return Emval.toHandle(v)
    }
    var _abort = () => {
        abort("")
    };
    var _emscripten_memcpy_big = (dest: number, src: number, num: any) => HEAPU8.copyWithin(dest, src, src + num);
    var getHeapMax = () => 2147483648;
    var growMemory = (size: number) => {
        var b = wasmMemory.buffer;
        var pages = size - b.byteLength + 65535 >>> 16;
        try {
        wasmMemory.grow(pages);
        updateMemoryViews();
        return 1
        } catch(e) {}
    };
    var _emscripten_resize_heap = (requestedSize: number) => {
        var oldSize: number = HEAPU8.length;
        requestedSize = requestedSize >>> 0;
        var maxHeapSize = getHeapMax();
        if (requestedSize > maxHeapSize) {
        return false
        }
        var alignUp = (x: number, multiple: number) => x + (multiple - x % multiple) % multiple;
        for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
        var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
        var replacement = growMemory(newSize);
        if (replacement) {
            return true
        }
        }
        return false
    };
    var ENV = {};
    var getExecutableName = () => {
        return thisProgram || "./this.program"
    };
    var getEnvStrings = () => {
        if (!getEnvStrings.strings) {
        var lang = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
        var env = {
            "USER": "web_user",
            "LOGNAME": "web_user",
            "PATH": "/",
            "PWD": "/",
            "HOME": "/home/web_user",
            "LANG": lang,
            "_": getExecutableName()
        };
        for (var x in ENV) {
            if (ENV[x] === undefined) delete env[x];
            else env[x] = ENV[x]
        }
        var strings = [];
        for (var x in env) {
            strings.push(`$ {
            x
            } = $ {
            env[x]
            }`)
        }
        getEnvStrings.strings = strings
        }
        return getEnvStrings.strings
    };
    var stringToAscii = (str: string, buffer: number) => {
        for (var i = 0; i < str.length; ++i) {
        HEAP8[buffer++>>0] = str.charCodeAt(i)
        }
        HEAP8[buffer >> 0] = 0
    };
    var SYSCALLS = {
        varargs: undefined,
        get: function() {
        SYSCALLS.varargs += 4;
        var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
        return ret
        },
        getStr: function(ptr: any) {
        var ret = UTF8ToString(ptr);
        return ret
        }
    };
    var _environ_get = (__environ: number, environ_buf: number) => {
        var bufSize = 0;
        getEnvStrings().forEach(function(string: string | any[], i: number) {
        var ptr = environ_buf + bufSize;
        HEAPU32[__environ + i * 4 >> 2] = ptr;
        stringToAscii(string, ptr);
        bufSize += string.length + 1
        });
        return 0
    };
    var _environ_sizes_get = (penviron_count: number, penviron_buf_size: number) => {
        var strings = getEnvStrings();
        HEAPU32[penviron_count >> 2] = strings.length;
        var bufSize = 0;
        strings.forEach(function(string: string | any[]) {
        bufSize += string.length + 1
        });
        HEAPU32[penviron_buf_size >> 2] = bufSize;
        return 0
    };
    function _llvm_eh_typeid_for(type: any) {
        return type
    }
    var isLeapYear = (year: number) => {
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
    };
    var arraySum = (array: number[], index: number) => {
        var sum = 0;
        for (var i = 0; i <= index; sum += array[i++]) {}
        return sum
    };
    var MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var MONTH_DAYS_REGULAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var addDays = (date: Date, days: number) => {
        var newDate = new Date(date.getTime());
        while (days > 0) {
        var leap = isLeapYear(newDate.getFullYear());
        var currentMonth = newDate.getMonth();
        var daysInCurrentMonth = (leap ? MONTH_DAYS_LEAP: MONTH_DAYS_REGULAR)[currentMonth];
        if (days > daysInCurrentMonth - newDate.getDate()) {
            days -= daysInCurrentMonth - newDate.getDate() + 1;
            newDate.setDate(1);
            if (currentMonth < 11) {
            newDate.setMonth(currentMonth + 1)
            } else {
            newDate.setMonth(0);
            newDate.setFullYear(newDate.getFullYear() + 1)
            }
        } else {
            newDate.setDate(newDate.getDate() + days);
            return newDate
        }
        }
        return newDate
    };
    function intArrayFromString(stringy: string, dontAddNull: boolean, length: number | undefined) {
        var len = length > 0 ? length: lengthBytesUTF8(stringy) + 1;
        var u8array = new Array(len);
        var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
        if (dontAddNull) u8array.length = numBytesWritten;
        return u8array
    }
    var writeArrayToMemory = (array: any[], buffer: any) => {
        HEAP8.set(array, buffer)
    };
    var _strftime = (s: any, maxsize: number, format: any, tm: number) => {
        var tm_zone = HEAP32[tm + 40 >> 2];
        var date = {
        tm_sec: HEAP32[tm >> 2],
        tm_min: HEAP32[tm + 4 >> 2],
        tm_hour: HEAP32[tm + 8 >> 2],
        tm_mday: HEAP32[tm + 12 >> 2],
        tm_mon: HEAP32[tm + 16 >> 2],
        tm_year: HEAP32[tm + 20 >> 2],
        tm_wday: HEAP32[tm + 24 >> 2],
        tm_yday: HEAP32[tm + 28 >> 2],
        tm_isdst: HEAP32[tm + 32 >> 2],
        tm_gmtoff: HEAP32[tm + 36 >> 2],
        tm_zone: tm_zone ? UTF8ToString(tm_zone) : ""
        };
        var pattern = UTF8ToString(format);
        var EXPANSION_RULES_1 = {
        "%c": "%a %b %d %H:%M:%S %Y",
        "%D": "%m/%d/%y",
        "%F": "%Y-%m-%d",
        "%h": "%b",
        "%r": "%I:%M:%S %p",
        "%R": "%H:%M",
        "%T": "%H:%M:%S",
        "%x": "%m/%d/%y",
        "%X": "%H:%M:%S",
        "%Ec": "%c",
        "%EC": "%C",
        "%Ex": "%m/%d/%y",
        "%EX": "%H:%M:%S",
        "%Ey": "%y",
        "%EY": "%Y",
        "%Od": "%d",
        "%Oe": "%e",
        "%OH": "%H",
        "%OI": "%I",
        "%Om": "%m",
        "%OM": "%M",
        "%OS": "%S",
        "%Ou": "%u",
        "%OU": "%U",
        "%OV": "%V",
        "%Ow": "%w",
        "%OW": "%W",
        "%Oy": "%y"
        };
        for (var rule in EXPANSION_RULES_1) {
        pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_1[rule])
        }
        var WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        function leadingSomething(value: { toString: () => any; }, digits: number, character: string | any[]) {
        var str = typeof value == "number" ? value.toString() : value || "";
        while (str.length < digits) {
            str = character[0] + str
        }
        return str
        }
        function leadingNulls(value: number, digits: number) {
        return leadingSomething(value, digits, "0")
        }
        function compareByDay(date1: { getFullYear: () => number; getMonth: () => number; getDate: () => number; }, date2: Date) {
        function sgn(value: number) {
            return value < 0 ? -1 : value > 0 ? 1 : 0
        }
        var compare;
        if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
            if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
            compare = sgn(date1.getDate() - date2.getDate())
            }
        }
        return compare
        }
        function getFirstWeekStartDate(janFourth: Date) {
        switch (janFourth.getDay()) {
        case 0:
            return new Date(janFourth.getFullYear() - 1, 11, 29);
        case 1:
            return janFourth;
        case 2:
            return new Date(janFourth.getFullYear(), 0, 3);
        case 3:
            return new Date(janFourth.getFullYear(), 0, 2);
        case 4:
            return new Date(janFourth.getFullYear(), 0, 1);
        case 5:
            return new Date(janFourth.getFullYear() - 1, 11, 31);
        case 6:
            return new Date(janFourth.getFullYear() - 1, 11, 30)
        }
        }
        function getWeekBasedYear(date: { tm_sec?: any; tm_min?: any; tm_hour?: any; tm_mday?: any; tm_mon?: any; tm_year: any; tm_wday?: any; tm_yday: any; tm_isdst?: any; tm_gmtoff?: any; tm_zone?: string; }) {
        var thisDate = addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);
        var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
        var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4);
        var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
        var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
        if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
            if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
            return thisDate.getFullYear() + 1
            }
            return thisDate.getFullYear()
        }
        return thisDate.getFullYear() - 1
        }
        var EXPANSION_RULES_2 = {
        "%a": (date: { tm_wday: string | number; }) => WEEKDAYS[date.tm_wday].substring(0, 3),
        "%A": (date: { tm_wday: string | number; }) => WEEKDAYS[date.tm_wday],
        "%b": (date: { tm_mon: string | number; }) => MONTHS[date.tm_mon].substring(0, 3),
        "%B": (date: { tm_mon: string | number; }) => MONTHS[date.tm_mon],
        "%C": (date: { tm_year: number; }) => {
            var year = date.tm_year + 1900;
            return leadingNulls(year / 100 | 0, 2)
        },
        "%d": (date: { tm_mday: number; }) => leadingNulls(date.tm_mday, 2),
        "%e": (date: { tm_mday: { toString: () => any; }; }) => leadingSomething(date.tm_mday, 2, " "),
        "%g": (date: any) => {
            return getWeekBasedYear(date).toString().substring(2)
        },
        "%G": (date: { tm_sec?: any; tm_min?: any; tm_hour?: any; tm_mday?: any; tm_mon?: any; tm_year: any; tm_wday?: any; tm_yday: any; tm_isdst?: any; tm_gmtoff?: any; tm_zone?: string | undefined; }) => getWeekBasedYear(date),
        "%H": (date: { tm_hour: number; }) => leadingNulls(date.tm_hour, 2),
        "%I": (date: { tm_hour: any; }) => {
            var twelveHour = date.tm_hour;
            if (twelveHour == 0) twelveHour = 12;
            else if (twelveHour > 12) twelveHour -= 12;
            return leadingNulls(twelveHour, 2)
        },
        "%j": (date: { tm_mday: number; tm_year: number; tm_mon: number; }) => {
            return leadingNulls(date.tm_mday + arraySum(isLeapYear(date.tm_year + 1900) ? MONTH_DAYS_LEAP: MONTH_DAYS_REGULAR, date.tm_mon - 1), 3)
        },
        "%m": (date: { tm_mon: number; }) => leadingNulls(date.tm_mon + 1, 2),
        "%M": (date: { tm_min: number; }) => leadingNulls(date.tm_min, 2),
        "%n": () => "\n",
        "%p": (date: { tm_hour: number; }) => {
            if (date.tm_hour >= 0 && date.tm_hour < 12) {
            return "AM"
            }
            return "PM"
        },
        "%S": (date: { tm_sec: number; }) => leadingNulls(date.tm_sec, 2),
        "%t": () => "\t",
        "%u": (date: { tm_wday: any; }) => date.tm_wday || 7,
        "%U": (date: { tm_yday: number; tm_wday: number; }) => {
            var days = date.tm_yday + 7 - date.tm_wday;
            return leadingNulls(Math.floor(days / 7), 2)
        },
        "%V": (date: { tm_yday: number; tm_wday: number; tm_year: number; }) => {
            var val = Math.floor((date.tm_yday + 7 - (date.tm_wday + 6) % 7) / 7);
            if ((date.tm_wday + 371 - date.tm_yday - 2) % 7 <= 2) {
            val++
            }
            if (!val) {
            val = 52;
            var dec31 = (date.tm_wday + 7 - date.tm_yday - 1) % 7;
            if (dec31 == 4 || dec31 == 5 && isLeapYear(date.tm_year % 400 - 1)) {
                val++
            }
            } else if (val == 53) {
            var jan1 = (date.tm_wday + 371 - date.tm_yday) % 7;
            if (jan1 != 4 && (jan1 != 3 || !isLeapYear(date.tm_year))) val = 1
            }
            return leadingNulls(val, 2)
        },
        "%w": (date: { tm_wday: any; }) => date.tm_wday,
        "%W": (date: { tm_yday: number; tm_wday: number; }) => {
            var days = date.tm_yday + 7 - (date.tm_wday + 6) % 7;
            return leadingNulls(Math.floor(days / 7), 2)
        },
        "%y": (date: { tm_year: number; }) => {
            return (date.tm_year + 1900).toString().substring(2)
        },
        "%Y": (date: { tm_year: number; }) => date.tm_year + 1900,
        "%z": (date: { tm_gmtoff: any; }) => {
            var off = date.tm_gmtoff;
            var ahead = off >= 0;
            off = Math.abs(off) / 60;
            off = off / 60 * 100 + off % 60;
            return (ahead ? "+": "-") + String("0000" + off).slice( - 4)
        },
        "%Z": (date: { tm_zone: any; }) => date.tm_zone,
        "%%": () => "%"
        };
        pattern = pattern.replace(/%%/g, "\0\0");
        for (var rule in EXPANSION_RULES_2) {
        if (pattern.includes(rule)) {
            pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_2[rule](date))
        }
        }
        pattern = pattern.replace(/\0\0/g, "%");
        var bytes = intArrayFromString(pattern, false);
        if (bytes.length > maxsize) {
        return 0
        }
        writeArrayToMemory(bytes, s);
        return bytes.length - 1
    };
    var _strftime_l = (s: any, maxsize: any, format: any, tm: any, loc: any) => {
        return _strftime(s, maxsize, format, tm)
    };
    InternalError = Module["InternalError"] = extendError(Error, "InternalError");
    embind_init_charCodes();
    BindingError = Module["BindingError"] = extendError(Error, "BindingError");
    init_ClassHandle();
    init_embind();
    init_RegisteredPointer();
    UnboundTypeError = Module["UnboundTypeError"] = extendError(Error, "UnboundTypeError");
    init_emval();
    var wasmImports = {
        "q": ___cxa_begin_catch,
        "u": ___cxa_end_catch,
        "a": ___cxa_find_matching_catch_2,
        "h": ___cxa_find_matching_catch_3,
        "l": ___cxa_find_matching_catch_4,
        "I": ___cxa_get_exception_ptr,
        "P": ___cxa_rethrow,
        "n": ___cxa_throw,
        "$": ___cxa_uncaught_exceptions,
        "d": ___resumeException,
        "ma": __embind_finalize_value_object,
        "W": __embind_register_bigint,
        "da": __embind_register_bool,
        "la": __embind_register_class,
        "ka": __embind_register_class_constructor,
        "D": __embind_register_class_function,
        "ca": __embind_register_emval,
        "U": __embind_register_float,
        "J": __embind_register_function,
        "w": __embind_register_integer,
        "r": __embind_register_memory_view,
        "T": __embind_register_std_string,
        "L": __embind_register_std_wstring,
        "Q": __embind_register_value_object,
        "na": __embind_register_value_object_field,
        "ea": __embind_register_void,
        "ha": __emval_decref,
        "ia": __emval_incref,
        "ja": __emval_take_value,
        "K": _abort,
        "ba": _emscripten_memcpy_big,
        "aa": _emscripten_resize_heap,
        "Z": _environ_get,
        "_": _environ_sizes_get,
        "H": invoke_diii,
        "S": invoke_fiii,
        "B": invoke_fiiiff,
        "p": invoke_i,
        "b": invoke_ii,
        "C": invoke_iidi,
        "fa": invoke_iif,
        "c": invoke_iii,
        "j": invoke_iiii,
        "i": invoke_iiiii,
        "x": invoke_iiiiii,
        "O": invoke_iiiiiid,
        "v": invoke_iiiiiii,
        "G": invoke_iiiiiiii,
        "N": invoke_iiiiiiiii,
        "A": invoke_iiiiiiiiii,
        "F": invoke_iiiiiiiiiiii,
        "X": invoke_jiii,
        "V": invoke_jiiii,
        "k": invoke_v,
        "f": invoke_vi,
        "e": invoke_vii,
        "g": invoke_viii,
        "M": invoke_viiiddi,
        "m": invoke_viiii,
        "o": invoke_viiiii,
        "R": invoke_viiiiii,
        "s": invoke_viiiiiii,
        "ga": invoke_viiiiiiii,
        "y": invoke_viiiiiiiii,
        "t": invoke_viiiiiiiiii,
        "E": invoke_viiiiiiiiiiiiiii,
        "z": _llvm_eh_typeid_for,
        "Y": _strftime_l
    };
    var asm = createWasm();
    var ___wasm_call_ctors = function() {
        return (___wasm_call_ctors = Module["asm"]["pa"]).apply(null, arguments)
    };
    var _free = Module["_free"] = function() {
        return (_free = Module["_free"] = Module["asm"]["qa"]).apply(null, arguments)
    };
    var _malloc = Module["_malloc"] = function() {
        return (_malloc = Module["_malloc"] = Module["asm"]["ra"]).apply(null, arguments)
    };
    var ___cxa_free_exception = function() {
        return (___cxa_free_exception = Module["asm"]["__cxa_free_exception"]).apply(null, arguments)
    };
    var ___getTypeName = function() {
        return (___getTypeName = Module["asm"]["ta"]).apply(null, arguments)
    };
    var __embind_initialize_bindings = Module["__embind_initialize_bindings"] = function() {
        return (__embind_initialize_bindings = Module["__embind_initialize_bindings"] = Module["asm"]["ua"]).apply(null, arguments)
    };
    var ___errno_location = function() {
        return (___errno_location = Module["asm"]["__errno_location"]).apply(null, arguments)
    };
    var _setThrew = function() {
        return (_setThrew = Module["asm"]["va"]).apply(null, arguments)
    };
    var setTempRet0 = function() {
        return (setTempRet0 = Module["asm"]["wa"]).apply(null, arguments)
    };
    var stackSave = function() {
        return (stackSave = Module["asm"]["xa"]).apply(null, arguments)
    };
    var stackRestore = function() {
        return (stackRestore = Module["asm"]["ya"]).apply(null, arguments)
    };
    var ___cxa_decrement_exception_refcount = function() {
        return (___cxa_decrement_exception_refcount = Module["asm"]["za"]).apply(null, arguments)
    };
    var ___cxa_increment_exception_refcount = function() {
        return (___cxa_increment_exception_refcount = Module["asm"]["Aa"]).apply(null, arguments)
    };
    var ___cxa_can_catch = function() {
        return (___cxa_can_catch = Module["asm"]["Ba"]).apply(null, arguments)
    };
    var ___cxa_is_pointer_type = function() {
        return (___cxa_is_pointer_type = Module["asm"]["Ca"]).apply(null, arguments)
    };
    var dynCall_viijii = Module["dynCall_viijii"] = function() {
        return (dynCall_viijii = Module["dynCall_viijii"] = Module["asm"]["Da"]).apply(null, arguments)
    };
    var dynCall_jiii = Module["dynCall_jiii"] = function() {
        return (dynCall_jiii = Module["dynCall_jiii"] = Module["asm"]["Ea"]).apply(null, arguments)
    };
    var dynCall_jiiii = Module["dynCall_jiiii"] = function() {
        return (dynCall_jiiii = Module["dynCall_jiiii"] = Module["asm"]["Fa"]).apply(null, arguments)
    };
    var dynCall_iiiiij = Module["dynCall_iiiiij"] = function() {
        return (dynCall_iiiiij = Module["dynCall_iiiiij"] = Module["asm"]["Ga"]).apply(null, arguments)
    };
    var dynCall_iiiiijj = Module["dynCall_iiiiijj"] = function() {
        return (dynCall_iiiiijj = Module["dynCall_iiiiijj"] = Module["asm"]["Ha"]).apply(null, arguments)
    };
    var dynCall_iiiiiijj = Module["dynCall_iiiiiijj"] = function() {
        return (dynCall_iiiiiijj = Module["dynCall_iiiiiijj"] = Module["asm"]["Ia"]).apply(null, arguments)
    };
    function invoke_ii(index: any, a1: any) {
        var sp = stackSave();
        try {
        return getWasmTableEntry(index)(a1)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_viii(index: any, a1: any, a2: any, a3: any) {
        var sp = stackSave();
        try {
        getWasmTableEntry(index)(a1, a2, a3)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_vii(index: any, a1: any, a2: any) {
        var sp = stackSave();
        try {
        getWasmTableEntry(index)(a1, a2)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_iii(index: any, a1: any, a2: any) {
        var sp = stackSave();
        try {
        return getWasmTableEntry(index)(a1, a2)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_v(index: any) {
        var sp = stackSave();
        try {
        getWasmTableEntry(index)()
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_vi(index: any, a1: any) {
        var sp = stackSave();
        try {
        getWasmTableEntry(index)(a1)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_iiii(index: any, a1: any, a2: any, a3: any) {
        var sp = stackSave();
        try {
        return getWasmTableEntry(index)(a1, a2, a3)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_iiiii(index: any, a1: any, a2: any, a3: any, a4: any) {
        var sp = stackSave();
        try {
        return getWasmTableEntry(index)(a1, a2, a3, a4)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_viiiii(index: any, a1: any, a2: any, a3: any, a4: any, a5: any) {
        var sp = stackSave();
        try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_viiiiii(index: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any) {
        var sp = stackSave();
        try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_viiiiiiiiii(index: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: any, a9: any, a10: any) {
        var sp = stackSave();
        try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_viiiiiii(index: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any) {
        var sp = stackSave();
        try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_viiii(index: any, a1: any, a2: any, a3: any, a4: any) {
        var sp = stackSave();
        try {
        getWasmTableEntry(index)(a1, a2, a3, a4)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_iiiiiii(index: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any) {
        var sp = stackSave();
        try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_viiiiiiii(index: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: any) {
        var sp = stackSave();
        try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_i(index: any) {
        var sp = stackSave();
        try {
        return getWasmTableEntry(index)()
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_iiiiiid(index: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any) {
        var sp = stackSave();
        try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_iidi(index: any, a1: any, a2: any, a3: any) {
        var sp = stackSave();
        try {
        return getWasmTableEntry(index)(a1, a2, a3)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_diii(index: any, a1: any, a2: any, a3: any) {
        var sp = stackSave();
        try {
        return getWasmTableEntry(index)(a1, a2, a3)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_iiiiii(index: any, a1: any, a2: any, a3: any, a4: any, a5: any) {
        var sp = stackSave();
        try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_fiiiff(index: any, a1: any, a2: any, a3: any, a4: any, a5: any) {
        var sp = stackSave();
        try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_iiiiiiiiii(index: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: any, a9: any) {
        var sp = stackSave();
        try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_iif(index: any, a1: any, a2: any) {
        var sp = stackSave();
        try {
        return getWasmTableEntry(index)(a1, a2)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_viiiiiiiii(index: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: any, a9: any) {
        var sp = stackSave();
        try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_iiiiiiii(index: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any) {
        var sp = stackSave();
        try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_iiiiiiiii(index: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: any) {
        var sp = stackSave();
        try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_viiiddi(index: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any) {
        var sp = stackSave();
        try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_fiii(index: any, a1: any, a2: any, a3: any) {
        var sp = stackSave();
        try {
        return getWasmTableEntry(index)(a1, a2, a3)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_iiiiiiiiiiii(index: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: any, a9: any, a10: any, a11: any) {
        var sp = stackSave();
        try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_viiiiiiiiiiiiiii(index: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: any, a9: any, a10: any, a11: any, a12: any, a13: any, a14: any, a15: any) {
        var sp = stackSave();
        try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_jiii(index: any, a1: any, a2: any, a3: any) {
        var sp = stackSave();
        try {
        return dynCall_jiii(index, a1, a2, a3)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    function invoke_jiiii(index: any, a1: any, a2: any, a3: any, a4: any) {
        var sp = stackSave();
        try {
        return dynCall_jiiii(index, a1, a2, a3, a4)
        } catch(e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew(1, 0)
        }
    }
    var calledRun: boolean;
    dependenciesFulfilled = function runCaller() {
        if (!calledRun) run();
        if (!calledRun) dependenciesFulfilled = runCaller
    };
    function run() {
        if (runDependencies > 0) {
        return
        }
        preRun();
        if (runDependencies > 0) {
        return
        }
        function doRun() {
        if (calledRun) return;
        calledRun = true;
        Module["calledRun"] = true;
        if (ABORT) return;
        initRuntime();
        readyPromiseResolve(Module);
        if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
        postRun()
        }
        if (Module["setStatus"]) {
        Module["setStatus"]("Running...");
        setTimeout(function() {
            setTimeout(function() {
            Module["setStatus"]("")
            },
            1);
            doRun()
        },
        1)
        } else {
        doRun()
        }
    }
    if (Module["preInit"]) {
        if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]];
        while (Module["preInit"].length > 0) {
        Module["preInit"].pop()()
        }
    }
    run();

    return moduleArg.ready
    }

    );
})();
if (: anytypeof: any exports: any === 'object' && typeof module === 'object') module.exports = ZXing;
else if (typeof define === 'function' && define['amd']) define([],
function() {
    return ZXing;
});
else if (typeof exports === 'object') exports["ZXing"] = ZXing;