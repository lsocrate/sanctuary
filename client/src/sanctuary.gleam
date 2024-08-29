import data/news.{sample_news}
import gleam/uri.{type Uri}
import lustre
import lustre/attribute
import lustre/effect
import lustre/element.{type Element}
import lustre/element/html
import modem
import page/about
import page/community
import page/formats
import page/home
import page/how_to_play
import routing.{type Route}
import ui/nav_bar.{nav_bar}

pub fn main() {
  let app = lustre.application(init, update, view)
  let assert Ok(_) = lustre.start(app, "#app", Nil)

  Nil
}

type Model {
  Model(route: Route)
}

fn init(_) {
  #(Model(routing.Home), modem.init(on_url_change))
}

fn on_url_change(url: Uri) {
  RouteChanged(routing.route_of_uri(url))
}

type Msg {
  RouteChanged(Route)
}

fn update(model, msg: Msg) {
  case msg {
    RouteChanged(route) -> #(Model(route), effect.none())
  }
}

fn view(model: Model) {
  with_navbar(case model.route {
    routing.Home -> home.page(sample_news)
    routing.About -> about.page()
    routing.HowToPlay -> how_to_play.page()
    routing.Community -> community.page()
    routing.Formats -> formats.page()
  })
}

fn with_navbar(content: Element(a)) {
  html.div([], [
    nav_bar(),
    html.div(
      [attribute.class("mt-12 flex min-h-screen max-w-[120ch] mx-auto")],
      [content],
    ),
  ])
}
