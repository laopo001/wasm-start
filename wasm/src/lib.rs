extern crate cfg_if;
extern crate js_sys;
extern crate wasm_bindgen;
extern crate web_sys;
mod utils;

use cfg_if::cfg_if;
use js_sys::{Array, Object};
use std::collections::HashMap;
use wasm_bindgen::prelude::*;

cfg_if! {
    // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // allocator.
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn collect_numbers(some_iterable: &JsValue) -> Result<js_sys::Array, JsValue> {
    let nums = js_sys::Array::new();

    let iterator = js_sys::try_iter(some_iterable)?.ok_or("need to pass iterable JS values!")?;

    for x in iterator {
        // If the iterator's `next` method throws an error, propagate it
        // up to the caller.
        let x = x?;

        // If `x` is a number, add it to our array of numbers!
        // if x.is_f64() {
        nums.push(&x);
        // }
    }

    Ok(nums)
}

#[wasm_bindgen]
pub fn run() -> Result<String, JsValue> {
    // Use `web_sys`'s global `window` function to get a handle on the global
    // window object.
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    let body = document.body().expect("document should have a body");

    // Manufacture the element we're gonna append
    let val = document.create_element("p")?;
    val.set_inner_html("Hello from Rust!");

    // Right now the class inheritance hierarchy of the DOM isn't super
    // ergonomic, so we manually cast `val: Element` to `&Node` to call the
    // `append_child` method.
    std::convert::AsRef::<web_sys::Node>::as_ref(&body).append_child(val.as_ref())?;

    Ok("123".to_string())
}
enum js_type {}

struct VNode {
    name: String,
    key: String,
    props: HashMap<String, js_type>,
    children: Box<Vec<VNode>>,
}

#[wasm_bindgen]
pub fn createElement(
    nodeName: &JsValue,
    props: &JsValue,
    children: Array,
) -> Result<Array, JsValue> {
    let arr = Object::entries(Object::try_from(props).unwrap());
    Ok(arr)
}
