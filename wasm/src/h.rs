pub fn createElement(
    nodeName: &JsValue,
    props: &JsValue,
    children: Array,
) -> Result<Array, JsValue> {
    let arr = Object::entries(Object::try_from(props).unwrap());
    Ok(arr)
}
