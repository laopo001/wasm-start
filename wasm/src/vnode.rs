use std::collections::HashMap;
use std::any::Any;

pub struct VNode {
    name: String,
    key: String,
    props: HashMap<String, Any>,
    children: Box<Vec<VNode>>,
}
