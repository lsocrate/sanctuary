import lustre/attribute.{type Attribute, class}
import lustre/element.{type Element}
import lustre/element/html.{div, text}

pub fn content_box(
  attributes: List(Attribute(a)),
  title: String,
  content: List(Element(a)),
) -> Element(a) {
  div(attributes, [
    div(
      [
        base_border(),
        class("rounded-t"),
        class(
          "bg-green-700 py-2 px-4 text-center uppercase font-bold leading-tight",
        ),
      ],
      [text(title)],
    ),
    div([base_border(), class("rounded-b"), class("bg-gray-700 p-4")], content),
  ])
}

fn base_border() {
  class("border border-green-500 border-solid")
}
