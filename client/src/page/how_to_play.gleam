import lustre/attribute.{href, target}
import lustre/element.{type Element}
import lustre/element/html.{a, text, ul}
import ui/content_box.{content_box}
import ui/plain.{h3, h4, li, p}

pub fn page() -> Element(a) {
  content_box([], "How To Play on Jigoku Online", [
    html.p([], [
      text(
        "This guide is aimed at players familiar with the Legend of the Five Rings: The Card Game who want to start playing online using the Jigoku Online platform. If you are new to this cardgame in general, there is a ",
      ),
      a(
        [href("https://www.youtube.com/watch?v=wTtjYzq4T54"), target("_blank")],
        [text("helpful tutorial video")],
      ),
      text(", a "),
      a(
        [
          href(
            "https://images-cdn.fantasyflightgames.com/filer_public/74/46/7446c964-613e-4c01-8902-199257c5d4af/l5c01_learntoplay_web.pdf",
          ),
          target("_blank"),
        ],
        [text("Learn To Play guide")],
      ),
      text(", and a "),
      a([href("https://www.emeralddb.org/rules/emerald"), target("_blank")], [
        text("Rules Reference Guide"),
      ]),
      text(" to help you out."),
    ]),
    h3("Topics"),
    ul([], [
      html.li([], [a([href("#decks")], [text("Adding Decks")])]),
      html.li([], [a([href("#profile")], [text("Profile Options")])]),
      html.li([], [a([href("#mmode")], [text("Manual Mode")])]),
      html.li([], [a([href("#commands")], [text("Manual Commands")])]),
      html.li([], [
        a([href("#conceding")], [
          text("About Stats, Conceding and Leaving Games"),
        ]),
      ]),
    ]),
    h3("Adding Decks"),
    html.p([], [
      text(
        "Start by making sure you have created an account and are logged in. You must be logged in to add decks and spectate or play games. Jigoku Online has a functional ",
      ),
      a([href("/decks"), target("_blank")], [text("Deckbuilder")]),
      text(", although most people use the more fully featured "),
      a([href("https://www.emeralddb.org/"), target("_blank")], [
        text("Emerald DB"),
      ]),
      text(
        " deckbuilder to build their decks. After building your deck on FiveRingsDB, copy the Permalink URL, paste it into popup window in the deckbuilder that is brought up when you click 'Import Deck'. You are now ready to start playing. Head over to the ",
      ),
      a([href("/play")], [text("Play")]),
      text(" section to create, join or watch games."),
    ]),
    h3("Profile Options"),
    html.p([], [
      text("Clicking your "),
      a([href("/profile")], [text("Profile")]),
      text(
        " at the top right of the page allows you to tailor certain aspects of gameplay to your wishes.",
      ),
    ]),
    h4("Action Windows"),
    p(
      "Legend of the Five Rings has quite a large number of phases and their associated action windows, a number of which are not used regularly by all decks. Always prompting these action windows leads to a lot of tediously clicking ‘Pass’, while never prompting these action windows leads to certain cards not being able to be used to their fullest extent. To solve this issue you can check/uncheck any action windows in your profile to determine when you’ll be prompted or not.",
    ),
    h4("Timed Interrupt Window"),
    p(
      "The combination of automated gameplay and the ability to play reactions or interrupts from hand has the potential to “leak” information about what your opponent might hold in his or her hand. For example: if after playing an event there is a pause before it resolves, you might guess correctly that was due to your opponent being prompted to use Voice of Honor. To solve this issue, the Timed Interrupt Window was created. Depending on which options you have checked, you get a timed prompt during certain triggers asking for interrupts whether you are able to interrupt these triggers or not. Now your opponent experiences the same pause any time and won’t be able to correctly guess whether you’re holding certain cards anymore.",
    ),
    p(
      "There are a couple of options: you can decide whether you want to always be prompted for triggered card abilities , events or both. The timer duration can be modified too. Obviously, if you don’t care about leaking cards from your hand (or you don’t play these cards anyway) and just want a quick game, deselecting both options will allow for that. You will still get prompted to use the aforementioned cards, but only when you actually have them.",
    ),
    h3("Manual Mode"),
    p(
      "Most of the cards should be implemented, but if things go wrong, or someone misclicks, or you really hate automation, you can switch on Manual Mode by typing /manual in chat.",
    ),
    p(
      "In Manual Mode, the game will no longer resolve conflicts automatically - the attacking player will be asked to indicate who won the conflict. You will also get the option to use a Manual Action in action windows which puts an announcement in chat and passes priority to your opponent, but won't have any other in-game effect.",
    ),
    p(
      "In manual mode, clicking cards and rings will bring up a menu which allows you to easily change the game state. Most of the functions in these menus mirror the Manual Commands listed below, but there are a couple of things which can only be done in menus. The ring menu lets you flip a ring, which you can use to change the conflict type during conflicts. You can also change the contested ring by selecting the ring you want to switch to and choosing the appropriate menu button. Finally, there is also an option to initiate a conflict in case someone passed by accident. NB: Initiate Conflict can only be used during a pre-conflict action window, and it won't count against your conflict opportunities for the turn.",
    ),
    h3("Manual Commands"),
    p(
      "The following manual commands have been implemented in order to allow for a smoother gameplay experience:",
    ),
    ul([], [
      li("/discard x - Discards x cards randomly from your hand"),
      li("/draw x - Draws x cards from your deck to your hand"),
      li(
        "/give-control - Give control of a card to your opponent. Use with caution",
      ),
      li("/reveal - Reveal a facedown card."),
      li("/duel - Initiates an honor bid for a duel."),
      li("/move-to-conflict - Moves one or more characters into a conflict."),
      li("/send-home - Sends a character home from a conflict."),
      li(
        "/claim-favor x - Claims the Imperial favor. x should be 'military' or 'political'.",
      ),
      li("/discard-favor - Discards your Imperial favor."),
      li(
        "/move-to-bottom-deck - Will prompt you to select a card to move it to the bottom of it's relevant deck.",
      ),
      li("/add-fate x - Add 'x' fate to a card."),
      li("/rem-fate x - Remove 'x' fate from a card."),
      li("/add-fate-ring ring x - Add 'x' fate to 'ring'."),
      li("/rem-fate-ring ring x - Remove 'x' fate from 'ring'."),
      li("/claim-ring ring - Claim 'ring'."),
      li("/unclaim-ring ring - Set 'ring' as unclaimed."),
      li("/honor - Move the state of a character towards honored."),
      li("/dishonor - Move the state of a character towards dishonored."),
      li("/roll x - Displays a random number between 1 and x (4 by default)."),
      li("/manual - Activate or deactivate manual mode (see above)."),
    ]),
    h3("About Stats, Conceding, and Leaving Games"),
    p(
      "Jigoku Online does not rank and/or match players by skill level in any way. There are three categories (beginner, casual and competitive) to be chosen when creating a game which gives an indication of what to expect, but it doesn't enforce anything. Even though personal stats are not being tracked, most players still very much appreciate a formal concede by clicking the ‘Concede’ button and typing ‘gg’ before leaving a game. The reality of quick and anonymous online games dictates this won’t always happen though, as evidenced by regular complaining in the main lobby about people leaving without conceding. Our advice is to just move on to the next game since in the end, conceding or not doesn’t really impact anything. Happy gaming!",
    ),
  ])
}
