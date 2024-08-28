import data/news.{sample_news}
import gleam/uri.{type Uri}
import lustre
import lustre/effect
import modem
import page/about
import page/home
import page/how_to_play
import routing.{type Route}

pub fn main() {
  let app = lustre.application(init, update, view)
  let assert Ok(_) = lustre.start(app, "#app", Nil)

  Nil
}

fn init(_) {
  #(routing.Home, modem.init(on_url_change))
}

fn on_url_change(url: Uri) {
  OnRouteChange(routing.route_of_uri(url))
}

type Msg {
  OnRouteChange(Route)
}

fn update(_, msg: Msg) {
  case msg {
    OnRouteChange(route) -> #(route, effect.none())
  }
}

fn view(route: Route) {
  case route {
    routing.Home -> home.page(sample_news)
    routing.About -> about.page()
    routing.HowToPlay -> how_to_play.page()
  }
}
