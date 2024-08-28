import lustre/element/html.{text}

pub fn p(content: String) {
  html.p([], [text(content)])
}

pub fn h3(content: String) {
  html.h3([], [text(content)])
}

pub fn h4(content: String) {
  html.h4([], [text(content)])
}

pub fn li(content: String) {
  html.li([], [text(content)])
}
