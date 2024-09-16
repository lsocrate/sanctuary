import gleam/list
import lustre/attribute.{type Attribute, href}
import lustre/element.{type Element}
import lustre/element/html.{a}

pub fn internal(
  path: List(String),
  attrs: List(Attribute(a)),
  content: List(Element(a)),
) {
  a([href(href_of_path(path)), ..attrs], content)
}

fn href_of_path(path: List(String)) {
  "/" <> list.fold(path, "", fn(acc, segment) { acc <> "/" <> segment })
}
