import data/clans
import gleam/option.{type Option, None}

pub type Decklist {
  Decklist(
    deck_id: String,
    name: String,
    alliance: Option(clans.Clan),
    format: String,
    faction: clans.Clan,
    stronghold: List(#(String, Int)),
    role: List(#(String, Int)),
    provinces: List(#(String, Int)),
    dynasty_events: List(#(String, Int)),
    dynasty_characters: List(#(String, Int)),
    dynasty_holdings: List(#(String, Int)),
    conflict_events: List(#(String, Int)),
    conflict_characters: List(#(String, Int)),
    conflict_attachments: List(#(String, Int)),
    last_updated: String
  )
}

pub const sample_decks = [
  Decklist(
    deck_id: "1",
    name: "The First Deck",
    alliance: None,
    format: "Standard",
    faction: clans.Crab,
    stronghold: [#("Stronghold", 1)],
    role: [#("Role", 1), #("Role", 2)],
    provinces: [#("Province", 1), #("Province", 2)],
    dynasty_events: [#("Dynasty Event", 1), #("Dynasty Event", 2)],
    dynasty_characters: [#("Dynasty Character", 1), #("Dynasty Character", 2)],
    dynasty_holdings: [#("Dynasty Holding", 1), #("Dynasty Holding", 2)],
    conflict_events: [#("Conflict Event", 1), #("Conflict Event", 2)],
    conflict_characters: [
      #("Conflict Character", 1), #("Conflict Character", 2),
    ],
    conflict_attachments: [
      #("Conflict Attachment", 1), #("Conflict Attachment", 2),
    ],
    last_updated: "2024-01-02",
  ),
]
