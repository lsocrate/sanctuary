import bison/bson.{type Value}
import bison/decoder
import gleam/dict.{type Dict}
import gleam/io
import gleam/option.{type Option, None, Some}
import gleam/result
import mungo

pub type Card {
  Card(name: String)
}

pub fn read_cards() {
  let assert Ok(client) = mungo.start("mongodb://127.0.0.1:27017/ringteki", 512)

  client
  |> mungo.collection("cards")
  |> mungo.find_one([], [], 128)
  |> result.map(option.then(_, card_of_value))
}

fn card_of_value(value: Value) -> Option(Card) {
  case value {
    bson.Document(doc) -> single_card(doc)
    bson.Array(_) -> None
    _ -> None
  }
}

fn single_card(doc: Dict(String, Value)) {
  case dict.get(doc, "type") {
    Ok(bson.String("event")) -> event(doc)
    _ -> None
  }
}

fn event(doc: Dict(String, Value)) {
  Some(Card(name: "bla"))
}
