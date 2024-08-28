pub type News {
  News(date_published: String, text: String)
}

pub const sample_news = [
  News(date_published: "2024-02-24", text: "Piece of news"),
  News(date_published: "2023-02-24", text: "Another piece of news"),
]
