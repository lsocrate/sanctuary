import gleam/uri.{type Uri}
import lustre/attribute.{type Attribute, href}
import lustre/element.{type Element}
import lustre/element/html.{a}

pub type Route {
  Home
  About
  HowToPlay
  Community
}

pub fn route_of_uri(uri: Uri) {
  case uri.path_segments(uri.path) {
    ["about"] -> About
    ["how-to-play"] -> HowToPlay
    ["community"] -> Community
    _ -> Home
  }
}

pub fn path_of_route(route: Route) {
  case route {
    Home -> "/"
    About -> "/about"
    HowToPlay -> "/how-to-play"
    Community -> "/community"
  }
}

pub fn link_to_route(
  route: Route,
  attrs: List(Attribute(a)),
  content: List(Element(a)),
) {
  a([href(path_of_route(route)), ..attrs], content)
}
