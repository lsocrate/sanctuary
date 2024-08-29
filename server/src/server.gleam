import gleam/erlang/process
import mist
import wisp
import wisp/wisp_mist

pub fn main() {
  wisp.configure_logger()

  let assert Ok(_) =
    wisp_mist.handler(
      fn(request) {
        use <- wisp.log_request(request)
        wisp.ok()
      },
      "secret_key",
    )
    |> mist.new
    |> mist.port(8000)
    |> mist.start_http

  process.sleep_forever()
}
