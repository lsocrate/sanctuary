import data/decklists
import data/news
import gleam/uri.{type Uri}
import lustre
import lustre/attribute
import lustre/effect
import lustre/element.{type Element}
import lustre/element/html
import modem
import page.{type Page}
import page/about
import page/community
import page/decks
import page/formats
import page/home
import page/how_to_play
import ui/nav_bar.{nav_bar}

pub fn main() {
  let app = lustre.application(init, update, view)
  let assert Ok(_) = lustre.start(app, "#app", Nil)

  Nil
}

type Model {
  Model(page: Page)
}

fn init(_) {
  #(Model(page.Home(news.sample_news)), modem.init(on_url_change))
}

fn on_url_change(url: Uri) {
  RouteChanged(case uri.path_segments(url.path) {
    ["about"] -> page.About
    ["how-to-play"] -> page.HowToPlay
    ["community"] -> page.Community
    ["formats"] -> page.Formats
    ["decks"] -> page.Decks(decklists.sample_decks)
    _ -> page.Home(news.sample_news)
  })
}

type Msg {
  RouteChanged(Page)
}

fn update(model, msg: Msg) {
  case msg {
    RouteChanged(page) -> #(Model(page:), effect.none())
  }
}

fn view(model: Model) {
  with_navbar(case model.page {
    page.Home(news) -> home.page(news)
    page.About -> about.page()
    page.HowToPlay -> how_to_play.page()
    page.Community -> community.page()
    page.Formats -> formats.page()
    page.Decks(list_of_decks) -> decks.page(list_of_decks)
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
