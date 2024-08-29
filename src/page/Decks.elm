module Pages.Decks exposing (Model, Msg, page)

import API.Decks exposing (News, fetchDecks)
import Effect exposing (Effect)
import Html exposing (..)
import Html.Attributes exposing (..)
import Http
import Layouts
import Page exposing (Page)
import Route exposing (Route)
import Shared
import UI.ContentBox exposing (contentBox)
import View exposing (View)


type alias Model =
    { news : List News
    }


type Msg
    = GotNews (Result Http.Error (List News))


page : Shared.Model -> Route () -> Page Model Msg
page _ _ =
    Page.new
        { init = always ( { news = [] }, Effect.sendCmd (fetchDecks GotNews) )
        , update = update
        , view = view
        , subscriptions = always Sub.none
        }
        |> Page.withLayout toLayout


toLayout : Model -> Layouts.Layout Msg
toLayout _ =
    Layouts.Single {}


update : Msg -> Model -> ( Model, Effect Msg )
update msg model =
    case msg of
        GotNews (Ok news) ->
            ( { model | news = news }, Effect.none )

        GotNews (Err _) ->
            ( model, Effect.none )


view : Model -> View msg
view model =
    { title = "Decks < Jigoku Online"
    , body =
        [ div [ class "flex flex-row gap-4" ]
            [ contentBox [ class "Your decks" ]
                "Getting Started"
                [ p [] [ text "This site allows you to play the Legend of the Five Rings LCG in your browser." ]
                , p []
                    [ text "If you're new, head on over to the "
                    , a [ href "/how-to-play" ] [ text "How To Play guide" ]
                    , text " for a thorough explanation on how to use the site!"
                    ]
                ]
            , contentBox []
                "Latest site news"
                [ ol [ class "space-y-2" ] <|
                    List.map
                        (\item ->
                            li []
                                [ strong [ class "inline-block min-w-[10ch]" ] [ text item.datePublished ]
                                , text item.text
                                ]
                        )
                        model.news
                ]
            ]
        ]
    }
