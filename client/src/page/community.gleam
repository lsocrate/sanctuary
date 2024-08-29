import lustre/attribute.{href, target}
import lustre/element.{type Element}
import lustre/element/html.{a, p, text}
import ui/content_box.{content_box}
import ui/plain.{h3}

pub fn page() -> Element(a) {
  content_box([], "Jigoku Online - Community Information", [
    h3("What is this page?"),
    p([], [
      text(
        "This page is a shoutout to other works/resources in the L5R community.",
      ),
    ]),
    h3("L5R Discord"),
    p([], [
      text("Link: "),
      a([href("https://discord.gg/zPvBePb"), target("_blank")], [
        text("L5R Discord"),
      ]),
    ]),
    p([], [
      text(
        "Discord is a text and voice communicaton application. Created by members of the L5R subreddit, it's a robust community of LCG/CCG/RPG players.",
      ),
    ]),
    h3("Emerald DB"),
    p([], [
      text("Link: "),
      a([href("https://www.emeralddb.org/"), target("_blank")], [
        text("Emerald DB"),
      ]),
    ]),
    p([], [
      text(
        "Card database and deck builder. Contains card rulings as well. Deck list are able to be directly imported into the Deckbuilder here. Successor to FiveRingsDB.",
      ),
    ]),
    h3("Discord League"),
    p([], [
      text("Link: "),
      a([href("https://discord-league.herokuapp.com"), target("_blank")], [
        text("Discord League"),
      ]),
    ]),
    p([], [
      text(
        "A competitive league, with a friendly tournament running each month. Sign up with your discord account, and also ",
      ),
      a([href("https://discord.gg/mfpZTqxxah"), target("_blank")], [
        text("join the discord server where the games are scheduled"),
      ]),
      text("."),
    ]),
    h3("Troll5R"),
    p([], [
      text("Link: "),
      a([href("https://www.facebook.com/Troll5R/"), target("_blank")], [
        text("Troll5R"),
      ]),
    ]),
    p([], [
      text(
        "Winners of the podcast wars. A couple of L5R old-timers/playtesters who talk at length on just about anything.",
      ),
    ]),
    h3("The Lotus Pavilion"),
    p([], [
      text("Link: "),
      a([href("https://l5r.tourneygrounds.com"), target("_blank")], [
        text("The Lotus Pavilion"),
      ]),
    ]),
    p([], [
      text(
        "Browser-based tournament software that originated for AGOT 2.0. Has an excellent pedigree.",
      ),
    ]),
    h3("The Ringteki Dev Discord"),
    p([], [
      text("Link: "),
      a([href("https://discord.gg/tMzhyND"), target("_blank")], [
        text("Ringteki Discord"),
      ]),
    ]),
    p([], [
      text(
        "If you're interested in helping develop Ringteki, or you have a bug to report, feel free to contact us here.",
      ),
    ]),
  ])
}
