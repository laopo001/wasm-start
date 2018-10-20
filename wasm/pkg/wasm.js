/* tslint:disable */
import * as wasm from './wasm_bg';

const stack = [];

function addBorrowedObject(obj) {
    stack.push(obj);
    return ((stack.length - 1) << 1) | 1;
}

const slab = [{ obj: undefined }, { obj: null }, { obj: true }, { obj: false }];

function getObject(idx) {
    if ((idx & 1) === 1) {
        return stack[idx >> 1];
    } else {
        const val = slab[idx >> 1];

        return val.obj;

    }
}

let slab_next = slab.length;

function dropRef(idx) {

    idx = idx >> 1;
    if (idx < 4) return;
    let obj = slab[idx];

    obj.cnt -= 1;
    if (obj.cnt > 0) return;

    // If we hit 0 then free up our space in the slab
    slab[idx] = slab_next;
    slab_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropRef(idx);
    return ret;
}
/**
* @param {any} arg0
* @returns {any}
*/
export function collect_numbers(arg0) {
    try {
        return takeObject(wasm.collect_numbers(addBorrowedObject(arg0)));

    } finally {
        stack.pop();

    }

}

let cachedTextDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null) {
        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
    }
    return cachedGlobalArgumentPtr;
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}
/**
* @returns {string}
*/
export function run() {
    const retptr = globalArgumentPtr();
    wasm.run(retptr);
    const mem = getUint32Memory();
    const rustptr = mem[retptr / 4];
    const rustlen = mem[retptr / 4 + 1];

    const realRet = getStringFromWasm(rustptr, rustlen).slice();
    wasm.__wbindgen_free(rustptr, rustlen * 1);
    return realRet;

}

function addHeapObject(obj) {
    if (slab_next === slab.length) slab.push(slab.length + 1);
    const idx = slab_next;
    const next = slab[idx];

    slab_next = next;

    slab[idx] = { obj, cnt: 1 };
    return idx << 1;
}
/**
* @param {any} arg0
* @param {any} arg1
* @param {any} arg2
* @returns {any}
*/
export function createElement(arg0, arg1, arg2) {
    try {
        return takeObject(wasm.createElement(addBorrowedObject(arg0), addBorrowedObject(arg1), addHeapObject(arg2)));

    } finally {
        stack.pop();
        stack.pop();

    }

}

const __widl_f_create_element_Document_target = Document.prototype.createElement || function() {
    throw new Error(`wasm-bindgen: Document.prototype.createElement does not exist`);
};

export function __widl_f_create_element_Document(arg0, arg1, arg2, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {
        return addHeapObject(__widl_f_create_element_Document_target.call(getObject(arg0), varg1));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

function GetOwnOrInheritedPropertyDescriptor(obj, id) {
    while (obj) {
        let desc = Object.getOwnPropertyDescriptor(obj, id);
        if (desc) return desc;
        obj = Object.getPrototypeOf(obj);
    }
    throw new Error(`descriptor for id='${id}' not found`);
}

const __widl_f_body_Document_target = GetOwnOrInheritedPropertyDescriptor(Document.prototype, 'body').get || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(Document.prototype, 'body').get does not exist`);
};

function isLikeNone(x) {
    return x === undefined || x === null;
}

export function __widl_f_body_Document(arg0) {

    const val = __widl_f_body_Document_target.call(getObject(arg0));
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

const __widl_f_set_inner_html_Element_target = GetOwnOrInheritedPropertyDescriptor(Element.prototype, 'innerHTML').set || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(Element.prototype, 'innerHTML').set does not exist`);
};

export function __widl_f_set_inner_html_Element(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);
    __widl_f_set_inner_html_Element_target.call(getObject(arg0), varg1);
}

const __widl_f_append_child_Node_target = Node.prototype.appendChild || function() {
    throw new Error(`wasm-bindgen: Node.prototype.appendChild does not exist`);
};

export function __widl_f_append_child_Node(arg0, arg1, exnptr) {
    try {
        return addHeapObject(__widl_f_append_child_Node_target.call(getObject(arg0), getObject(arg1)));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

export function __widl_instanceof_Window(idx) {
    return getObject(idx) instanceof Window ? 1 : 0;
}

const __widl_f_document_Window_target = function() {
    return this.document;
};

export function __widl_f_document_Window(arg0) {

    const val = __widl_f_document_Window_target.call(getObject(arg0));
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

export function __wbg_new_7a259c7860f1b5c4() {
    return addHeapObject(new Array());
}

const __wbg_push_236df23a2ba3782d_target = Array.prototype.push || function() {
    throw new Error(`wasm-bindgen: Array.prototype.push does not exist`);
};

export function __wbg_push_236df23a2ba3782d(arg0, arg1) {
    return __wbg_push_236df23a2ba3782d_target.call(getObject(arg0), getObject(arg1));
}

export function __wbg_newnoargs_f3005d02efe69623(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(new Function(varg0));
}

const __wbg_call_10738551fb4d99e4_target = Function.prototype.call || function() {
    throw new Error(`wasm-bindgen: Function.prototype.call does not exist`);
};

export function __wbg_call_10738551fb4d99e4(arg0, arg1, exnptr) {
    try {
        return addHeapObject(__wbg_call_10738551fb4d99e4_target.call(getObject(arg0), getObject(arg1)));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

const __wbg_next_da9f5778cde00c4e_target = function() {
    return this.next();
};

export function __wbg_next_da9f5778cde00c4e(arg0, exnptr) {
    try {
        return addHeapObject(__wbg_next_da9f5778cde00c4e_target.call(getObject(arg0)));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

const __wbg_done_da646dabefc0c0ce_target = function() {
    return this.done;
};

export function __wbg_done_da646dabefc0c0ce(arg0) {
    return __wbg_done_da646dabefc0c0ce_target.call(getObject(arg0)) ? 1 : 0;
}

const __wbg_value_0d5b146abcfc1b1e_target = function() {
    return this.value;
};

export function __wbg_value_0d5b146abcfc1b1e(arg0) {
    return addHeapObject(__wbg_value_0d5b146abcfc1b1e_target.call(getObject(arg0)));
}

const __wbg_entries_836348822f11e2f9_target = Object.entries.bind(Object) || function() {
    throw new Error(`wasm-bindgen: Object.entries.bind(Object) does not exist`);
};

export function __wbg_entries_836348822f11e2f9(arg0) {
    return addHeapObject(__wbg_entries_836348822f11e2f9_target(getObject(arg0)));
}

const __wbg_get_b5fa2669cbf91d6f_target = Reflect.get.bind(Reflect) || function() {
    throw new Error(`wasm-bindgen: Reflect.get.bind(Reflect) does not exist`);
};

export function __wbg_get_b5fa2669cbf91d6f(arg0, arg1, exnptr) {
    try {
        return addHeapObject(__wbg_get_b5fa2669cbf91d6f_target(getObject(arg0), getObject(arg1)));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

const __wbg_iterator_abc35ff100957036_target = function() {
    return Symbol.iterator;
};

export function __wbg_iterator_abc35ff100957036() {
    return addHeapObject(__wbg_iterator_abc35ff100957036_target());
}

export function __wbindgen_object_clone_ref(idx) {
    // If this object is on the stack promote it to the heap.
    if ((idx & 1) === 1) return addHeapObject(getObject(idx));

    // Otherwise if the object is on the heap just bump the
    // refcount and move on
    const val = slab[idx >> 1];
    val.cnt += 1;
    return idx;
}

export function __wbindgen_object_drop_ref(i) {
    dropRef(i);
}

export function __wbindgen_string_new(p, l) {
    return addHeapObject(getStringFromWasm(p, l));
}

export function __wbindgen_is_object(i) {
    const val = getObject(i);
    return typeof(val) === 'object' && val !== null ? 1 : 0;
}

export function __wbindgen_is_function(i) {
    return typeof(getObject(i)) === 'function' ? 1 : 0;
}

export function __wbindgen_rethrow(idx) { throw takeObject(idx); }

