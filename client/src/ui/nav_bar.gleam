import gleam/list
import lustre/attribute.{class, href}
import lustre/element/html.{a, li, nav, summary, text, ul}
import page

pub fn nav_bar() {
  nav([class("bg-gray-800 fixed top-0 left-0 right-0 z-10")], [
    ul(
      [class("my-0 mx-auto px-0 py-1 max-w-screen-lg space-x-4")],
      resolve(menu),
    ),
  ])
}

type MenuItem {
  TopItem(#(String, String))
  SubMenu(String, List(#(String, String)))
}

const menu = [
  TopItem(#("Jigoku Online", page.path_of_home)),
  TopItem(#("Decks", page.path_of_decks)), TopItem(#("Play", page.path_of_home)),
  SubMenu(
    "Help",
    [
      #("How To Play", page.path_of_how_to_play), #("About", page.path_of_about),
      #("Community", page.path_of_community), #("Formats", page.path_of_formats),
    ],
  ),
]

fn resolve(items: List(MenuItem)) {
  list.map(items, fn(item) {
    case item {
      TopItem(item) ->
        li([class("list-none inline-block")], [
          a([href(item.1)], [text(item.0)]),
        ])
      SubMenu(label, items) ->
        li([class("list-none inline-block")], [
          html.details([attribute.name("topMenu")], [
            summary([class("cursor-pointer")], [text(label)]),
            ul(
              [class("fixed bg-gray-800 m-0 py-2 px-4")],
              list.map(items, fn(item) {
                li([class("list-none")], [a([href(item.1)], [text(item.0)])])
              }),
            ),
          ]),
        ])
    }
  })
}
