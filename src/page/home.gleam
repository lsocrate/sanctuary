import data/news.{type News}
import gleam/list
import lustre/attribute.{alt, class, height, href, src, target, width}
import lustre/element.{type Element}
import lustre/element/html.{a, div, h1, h3, img, li, ol, p, strong, text}
import routing.{HowToPlay, link_to_route}
import ui/content_box.{content_box}

pub fn page(news: List(News)) -> Element(a) {
  div([class("space-y-8")], [
    h1([class("text-3xl font-bold text-center bg-green-900 p-2")], [
      text("Legend of the Five Rings LCG"),
    ]),
    content_box([], "Getting Started", [
      p_(
        "This site allows you to play the Legend of the Five Rings LCG in your browser.",
      ),
      p([], [
        text("If you're new, head on over to the "),
        link_to_route(HowToPlay, [], [text("How To Play guide")]),
        text(" for a thorough explanation on how to use the site!"),
      ]),
    ]),
    content_box([], "Latest site news", [
      ol([class("space-y-2")], list.map(news, news_item)),
    ]),
    content_box([], "Community Information", [
      div([class("grid grid-cols-2 gap-y-6 gap-x-12")], [
        div([], [
          h3([], [
            side_illustration("/static/illustration/community_discord_icon.gif"),
            text("L5R Community Discord Server"),
          ]),
          p([], [
            a([href("https://discord.gg/zPvBePb"), target("_blank")], [
              text("Invite Link"),
            ]),
          ]),
          p_(
            "Are you interested in the L5R LCG? Come and chat on our Discord server!",
          ),
          p_(
            "The server was created by members of the L5R community, and is maintained by the community, so come and talk anything L5R related.",
          ),
        ]),
        div([], [
          h3([], [
            side_illustration("/static/illustration/event_discord_icon.webp"),
            text("L5R Event Discord Server"),
          ]),
          p([], [
            a([href("https://discord.gg/mfpZTqxxah"), target("_blank")], [
              text("Invite Link"),
            ]),
          ]),
          p_(
            "This discord server is used by the community to coordinate community run events.",
          ),
          p_(
            "Whether you want to play in a sanctioned Emerald Legacy tournament, join the monthly Discord League, or find fellow beginners in the Beginner's League, this server has something for everyone, not just competitive players.",
          ),
        ]),
        div([class("col-start-1 col-end-3")], [
          img([
            src("/static/illustration/emerald-legacy-logo.png"),
            alt(""),
            width(320),
            height(83),
            class("block mx-auto"),
          ]),
          h3([], [
            a([href("https://emeraldlegacy.org/"), target("_blank")], [
              text("Emerald Legacy"),
            ]),
          ]),
          p_(
            "The Emerald Legacy project is a fan-run nonprofit volunteer collective. Its mission is to provide a living and thriving continuation of the LCG after the end of official support for the game. Emerald Legacy is responsible for creating and releasing new cards, organizing tournaments, and maintaining the rules and balance of the game.",
          ),
          p([], [
            text("Emerald Legacy provides the "),
            a([href("https://www.emeralddb.org/"), target("_blank")], [
              text("EmeraldDB"),
            ]),
            text(
              " service, which is an online collection of all cards and rules for the LCG. EmeraldDB includes a deck builder for the LCG, as well as lists that have been made public by other players. Deck lists that you create are able to be directly imported into the Deckbuilder here!",
            ),
          ]),
        ]),
      ]),
    ]),
  ])
}

fn side_illustration(url: String) -> Element(a) {
  img([src(url), alt(""), class("inline-block mr-4 mb-2")])
}

fn news_item(item: News) {
  li([], [
    strong([class("inline-block min-w-[10ch]")], [text(item.date_published)]),
    text(item.text),
  ])
}

fn p_(content: String) -> Element(a) {
  p([], [text(content)])
}
