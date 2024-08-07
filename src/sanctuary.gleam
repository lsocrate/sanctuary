import lustre
import lustre/attribute
import lustre/element/html
import ui/content_box.{content_box}

pub fn main() {
  let app =
    lustre.element(
      html.div([], [
        html.h1(
          [attribute.class("text-3xl font-bold text-center bg-green-900 p-2")],
          [html.text("Legend of the Five Rings LCG")],
        ),
        content_box([attribute.class("mt-4")], "Getting Started", [
          html.p([], [
            html.text(
              "This site allows you to play the Legend of the Five Rings LCG in your browser.",
            ),
          ]),
          html.p([], [
            html.text("If you're new, head on over to the "),
            html.a([attribute.href("/how-to-play")], [
              html.text("How To Play guide"),
            ]),
            html.text(" for a thorough explanation on how to use the site!"),
          ]),
        ]),
        content_box([attribute.class("mt-8")], "Latest site news", [
          html.ol([attribute.class("space-y-2")], [
            html.li([], [
              html.strong([attribute.class("inline-block min-w-[10ch]")], [
                html.text("Legend of the Five Rings LCG"),
              ]),
              html.text(
                "is a fan-run nonprofit volunteer collective. Its mission is to provide a living and thriving continuation of the LCG after the end of official support for the game. Emerald Legacy is responsible for creating and releasing new cards, organizing tournaments, and maintaining the rules and balance of the game.",
              ),
            ]),
          ]),
        ]),
      ]),
    )
  let assert Ok(_) = lustre.start(app, "#app", Nil)

  Nil
}
//, contentBox [ class "mt-8" ]
//    "Latest site news"
//    [ ol [ class "space-y-2" ] <|
//        List.map
//            (\item ->
//                li []
//                    [ strong [ class "inline-block min-w-[10ch]" ] [ text item.datePublished ]
//                    , text item.text
//                    ]
//            )
//            model.news
//    ]
//, contentBox [ class "mt-8" ]
//    "Community Information"
//    [ div [ class "grid grid-cols-2 gap-y-6 gap-x-12" ]
//        [ div []
//            [ h3 []
//                [ viewSideIllustration "/illustration/community_discord_icon.gif"
//                , text "L5R Community Discord Server"
//                ]
//            , p [] [ a [ href "https://discord.gg/zPvBePb", target "_blank" ] [ text "Invite Link" ] ]
//            , p [] [ text "Are you interested in the L5R LCG? Come and chat on our Discard server!" ]
//            , p [] [ text "The server was created by members of the L5R community, and is maintained by the community, so come and talk anything L5R related." ]
//            ]
//        , div []
//            [ h3 []
//                [ viewSideIllustration "/illustration/event_discord_icon.webp"
//                , text "L5R Event Discord Server"
//                ]
//            , p []
//                [ a [ href "https://discord.gg/mfpZTqxxah", target "_blank" ]
//                    [ text "Invite Link"
//                    ]
//                ]
//            , p [] [ text "This discord server is used by the community to coordinate community run events." ]
//            , p [] [ text "Whether you want to play in a sanctioned Emerald Legacy tournament, join the monthly Discord League, or find fellow beginners in the Beginner's League, this server has something for everyone, not just competitive players." ]
//            ]
//        , div [ class "col-start-1 col-end-3" ]
//            [ img
//                [ src "/illustration/emerald-legacy-logo.png"
//                , alt ""
//                , width 320
//                , height 83
//                , class "block mx-auto"
//                ]
//                []
//            , h3 []
//                [ a [ href "https://emeraldlegacy.org/", target "_blank" ]
//                    [ text "Emerald Legacy"
//                    ]
//                ]
//            , p [] [ text "The Emerald Legacy project is a fan-run nonprofit volunteer collective. Its mission is to provide a living and thriving continuation of the LCG after the end of official support for the game. Emerald Legacy is responsible for creating and releasing new cards, organizing tournaments, and maintaining the rules and balance of the game." ]
//            , p []
//                [ text "Emerald Legacy provides the "
//                , a [ href "https://www.emeralddb.org/", target "_blank" ] [ text "EmeraldDB" ]
//                , text "service, which is an online collection of all cards and rules for the LCG. EmeraldDB includes a deck builder for the LCG, as well as lists that have been made public by other players. Deck lists that you create are able to be directly imported into the Deckbuilder here!"
//                ]
//            ]
//        ]
//    ]
//]
