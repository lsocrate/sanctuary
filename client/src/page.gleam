import data/decklists
import data/news

pub type Page {
  Home(model: List(news.News))
  About
  HowToPlay
  Community
  Formats
  Decks(model: List(decklists.Decklist))
}

pub const path_of_home = "/"

pub const path_of_about = "/about"

pub const path_of_how_to_play = "/how-to-play"

pub const path_of_community = "/community"

pub const path_of_formats = "/formats"

pub const path_of_decks = "/decks"
