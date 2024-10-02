import app/web.{type Context}
import db/cards.{read_cards}
import gleam/io
import gleam/option.{None, Some}
import gleam/string_builder
import wisp.{type Request, type Response}

pub fn handle_request(req: Request, ctx: Context) -> Response {
  use _req <- web.middleware(req, ctx)

  case wisp.path_segments(req) {
    ["hello"] ->
      wisp.html_response(
        string_builder.from_string("<p>Hello, world!</p>"),
        200,
      )
    ["api", "hello"] -> {
      case read_cards() {
        a -> {
          io.debug(a)
          wisp.json_response(string_builder.from_string("{}"), 404)
        }
      }
    }
    _ -> wisp.not_found()
  }
}
