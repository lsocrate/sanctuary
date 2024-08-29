import lustre/attribute.{href, target}
import lustre/element.{type Element}
import lustre/element/html.{a, p, text}
import ui/content_box.{content_box}
import ui/plain.{h2, h3, h4}

pub fn page() -> Element(a) {
  content_box([], "Jigoku Online - Game Formats", [
    h2("What are the game formats?"),
    p([], [
      text(
        "During it's life, Legend of the Five Rings accumulated a few different game formats. A few of them are currently maintained, others are historical but receive no updates.",
      ),
    ]),
    h3("Current formats"),
    p([], [
      text("The following formats are currently maintained by the community."),
    ]),
    h4("Emerald Legacy"),
    p([], [
      text(
        "When FFG announced they would stop releasing the game, the community formed a group to take the stewardship of the game, this group is the Emerald Legacy. The Emerald Legacy continues to publish cards, and took the role of maintaining game balance through ban and restricted lists. It also introduced a few rule changes to the game in regards to Rally, attachments, and covert. ",
      ),
      a([href("https://emeraldlegacy.org/rules/"), target("_blank")], [
        text("Learn more about the Emerald Legacy in their website"),
      ]),
      text("."),
    ]),
    h4("Obsidian Heresy"),
    p([], [
      text(
        "The Obsidian Heresy is an alternative format that aims to keep L5R pure in its impurity. The Obsidian legacy maintains a short ban list, and has no restricted cards. It introduces a big rule change in making the maximum ammount of copies per card in decks 2 instead of 3 copies. Obsidian is a wild format, where mostly everything is possible, and fire is fought with fire. The format recommends playing matches as best of 3.",
      ),
      a(
        [
          href("https://obsidianheresy.blogspot.com/2021/10/the-format.html"),
          target("_blank"),
        ],
        [text("Learn more about the Obsidian Heresy in their website")],
      ),
    ]),
    h3("Historical formats"),
    p([], [
      text(
        "The following formats were developed by Fantasy Flight Games. When they declared the game complete, the formats stopped being maintained. They still work in Jigoku, in addition to the community formats listed above.",
      ),
    ]),
    h4("Imperial Law [FFG]"),
    p([], [
      text(
        "The Imperial Law was the official ban and restricted lists published by Fantasy Flight Games [FFG]. They were released every 3 months in FFG's website, and were focused on balancing the game through a combination of bans, restrictions, and erratas. ",
      ),
      a(
        [
          href(
            "https://www.fantasyflightgames.com/en/news/2021/8/10/restoring-imperial-law/",
          ),
          target("_blank"),
        ],
        [text("Check here the last Imperial Law")],
      ),
      text(", or if you curious "),
      a(
        [
          href(
            "https://www.fantasyflightgames.com/en/news/2018/5/21/maintaining-balance/",
          ),
          target("_blank"),
        ],
        [text("check here the first Imperial Law!")],
      ),
    ]),
    h4("Skirmish [FFG]"),
    p([], [
      text(
        "Skirmish was an alternative format released by FFG. It changed many core rules of the game, like getting rid of strongholds and provinces, and reducing the flow of resources in the game. The goal of Skirmish was to have an easier to learn and faster to play version of L5R. The format was released in these two articles: ",
      ),
      a(
        [
          href(
            "https://www.fantasyflightgames.com/en/news/2020/3/20/legend-of-the-five-rings-skirmish-part-1/",
          ),
          target("_blank"),
        ],
        [text("part 1")],
      ),
      text(", and "),
      a(
        [
          href(
            "https://www.fantasyflightgames.com/en/news/2020/3/27/legend-of-the-five-rings-skirmish-part-2/",
          ),
          target("_blank"),
        ],
        [text("part 2")],
      ),
      text("."),
    ]),
  ])
}
