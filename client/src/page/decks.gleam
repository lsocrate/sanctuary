import data/clans.{name_of_clan}
import data/decklists
import gleam/list
import gleam/option.{None, Some}
import js/intl.{nice_date}
import lustre/attribute.{class}
import lustre/element/html.{a, div, span, text}
import ui/content_box.{content_box}

pub fn page(list_of_decks: List(decklists.Decklist)) {
  div([class("flex flex-row gap-4")], [
    content_box([], "Your decks", [
      div([], [html.button([class("btn btn-primary")], [text("Get Started")])]),
      div([], list_of_decks |> list.map(view_deck)),
    ]),
    content_box([], "Latest site news", []),
  ])
}

fn view_deck(deck: decklists.Decklist) {
  a([class("card")], [
    div([], [text(name_of_clan(deck.faction))]),
    div([], [
      div([], [text(deck.name)]),
      div([], case deck.alliance {
        None -> [text(name_of_clan(deck.faction))]
        Some(alliance) -> [
          text(name_of_clan(deck.faction)),
          text(" / "),
          span([], [text(name_of_clan(alliance))]),
        ]
      }),
    ]),
    div([], [
      div([], [text("Valid")]),
      div([], [text(nice_date(deck.last_updated))]),
    ]),
  ])
}
