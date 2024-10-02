import app/router
import app/web.{Context}
import gleam/erlang/process
import gleam/io
import mist
import wisp
import wisp/wisp_mist

pub fn main() {
  wisp.configure_logger()

  let ctx = Context(static_directory: static_directory())

  let handler = router.handle_request(_, ctx)

  let assert Ok(_) =
    wisp_mist.handler(handler, "secret_key")
    |> mist.new
    |> mist.port(8000)
    |> mist.start_http

  process.sleep_forever()
}

fn static_directory() {
  let assert Ok(priv_directory) = wisp.priv_directory("server")
  priv_directory <> "/static"
}
