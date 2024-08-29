import gleam/list
import lustre/attribute.{class}
import lustre/element/html.{li, nav, summary, text, ul}
import routing.{type Route, link_to_route}

pub fn nav_bar() {
  nav([class("bg-gray-800 fixed top-0 left-0 right-0 z-10")], [
    ul(
      [class("my-0 mx-auto px-0 py-1 max-w-screen-lg space-x-4")],
      resolve(menu),
    ),
  ])
}

type MenuItem {
  TopItem(#(String, Route))
  SubMenu(String, List(#(String, Route)))
}

const menu = [
  TopItem(#("Jigoku Online", routing.Home)), TopItem(#("Decks", routing.Home)),
  TopItem(#("Play", routing.Home)),
  SubMenu(
    "Help",
    [
      #("How To Play", routing.HowToPlay), #("About", routing.About),
      #("Community", routing.Community), #("Formats", routing.Formats),
    ],
  ),
]

fn resolve(items: List(MenuItem)) {
  list.map(items, fn(item) {
    case item {
      TopItem(item) ->
        li([class("list-none inline-block")], [
          link_to_route(item.1, [], [text(item.0)]),
        ])
      SubMenu(label, items) ->
        li([class("list-none inline-block")], [
          html.details([attribute.name("topMenu")], [
            summary([class("cursor-pointer")], [text(label)]),
            ul(
              [class("fixed bg-gray-800 m-0 py-2 px-4")],
              list.map(items, fn(item) {
                li([class("list-none")], [
                  link_to_route(item.1, [], [text(item.0)]),
                ])
              }),
            ),
          ]),
        ])
    }
  })
}
