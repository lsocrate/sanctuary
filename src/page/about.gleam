import lustre/attribute.{href, target}
import lustre/element.{type Element}
import lustre/element/html.{a, h2, h3, p, text}
import ui/content_box.{content_box}

pub fn page() -> Element(a) {
  content_box([], "About Jigoku Online - help and information", [
    h3([], [text("What is this?")]),
    p([], [
      text(
        "This site was setup to allow you to play Legend of the Five Rings, an LCG from Fantasy Flight Games (FFG) in your browser.",
      ),
    ]),
    h3([], [text("That's pretty cool! But how does any of this work?")]),
    p([], [
      text("Head on over to the "),
      a([href("/how-to-play"), target("_blank")], [text("How To Play guide")]),
      text(" for a thorough explanation."),
    ]),
    h3([], [text("Everyone has a shiny avatar, how do I get one?")]),
    p([], [
      text("This is handled by the good people at "),
      a([href("http://gravatar.com"), target("_blank")], [text("Gravatar")]),
      text(
        ". Sign up there with the same email address you did there and it should appear on the site after a short while. It will also use the avatar on any site that uses gravatar. Examples include github and jinteki.",
      ),
    ]),
    h3([], [text("The artwork on this site is pretty cool, where's that from?")]),
    p([], [text("You're right, it is pretty nice isn't it?")]),
    p([], [
      text("The background of the site is by an artist named "),
      a([href("https://speeh.deviantart.com/"), target("_blank")], [
        text("Speeh"),
      ]),
      text(" and can be found "),
      a(
        [
          href("https://speeh.deviantart.com/art/L5R-Fu-Leng-575822238"),
          target("_blank"),
        ],
        [text("here")],
      ),
      text("."),
    ]),
    p([], [
      text("The in game backgrounds are by "),
      a([href("https://alayna.deviantart.com/"), target("_blank")], [
        text("Alayna Lemmer-Danner"),
      ]),
      text(". She's very talented, you should check out her work!"),
    ]),
    p([], [
      text("The tokens used for Spirit of the River are by "),
      a(
        [
          href("https://www.dojocreativedesign.com/l5r-cardgame"),
          target("_blank"),
        ],
        [text("David Robotham")],
      ),
      text(". He has a selection of L5R related merchandise, check it out "),
      a([href("https://www.dojocreativedesign.com/shop"), target("_blank")], [
        text("here"),
      ]),
      text("."),
    ]),
    p([], [
      text(
        "Don't want to be distracted by beautiful art during your games? In-game backgrounds can be disabled from your ",
      ),
      a([href("/profile")], [text("Profile")]),
      text("."),
    ]),
    h3([], [text("Can I help?")]),
    p([], [
      text(
        "Sure! The project is all written in Javascript. The server is node.js and the client is React.js. The source code can be found in the",
      ),
      a([href("http://github.com/gryffon/ringteki"), target("_blank")], [
        text("GitHub Repository"),
      ]),
      text("."),
      text(
        "Check out the code and instructions on there on how to get started and hack away! See the card implementation status list above to have a look at what needs to be done. If you want to join the dev discord, there's a link on the ",
      ),
      a([href("/community")], [text("Community")]),
      text(" page."),
    ]),
    h3([], [text("Donations")]),
    p([], [
      text(
        "Since I've been asked a few times about where people can donate to the project, I thought I'd put up a small section about it here.",
      ),
    ]),
    p([], [
      text("You can use this link:"),
      a([href("https://paypal.me/ringteki"), target("_blank")], [text("Paypal")]),
      text(
        " to donate to the project. Note: The account uses my name, but is completely separate from my personal Paypal account.",
      ),
    ]),
    p([], [
      text(
        "We may also look into creating a Patreon in the future, for those people who wish to make recurring donations.",
      ),
    ]),
    p([], [
      text(
        "Just to make things clear, I'm not doing this for any personal gain whatsoever, I'm happy to run the servers at my own expense, but any money raised via this link will be used towards paying the hosting fees for the server and related services such as error tracking. All money in this account will only go towards these expenses.",
      ),
    ]),
    p([], [
      text(
        "Also, this is not required to continue to use and enjoy the site and will not give anything of substance in return. I will also create an expense report that I will publish, so that you know where your donations are going.",
      ),
    ]),
    p([], [
      text(
        "If you wish to reward the devs in particular, feel free to thank them when you see them out at events. Sharing a cold beverage is always appreciated!",
      ),
    ]),
    h2([], [text("Special Thanks")]),
    p([], [
      text(
        "I'd like to thank mtgred, and the whole of the jinteki.net development team(except whoever decided to write the code in clojure, not you. - just kidding!) as without their work to use as a guide and as inspiration, this site would not be where it is today. To say jinteki is an inspiration is an understa                                                                     tement.",
      ),
    ]),
    p([], [
      text(
        "I'd also like to thank cryogen and his team for their work on creating throneteki, which i've based this particular application off of.",
      ),
    ]),
    h2([], [text("Additional Notes")]),
    p([], [
      text(
        "The Legend of the Five Rings living card game, the artwork and many other things are all copyright Fantasy Flight Games and I make no claims of ownership or otherwise of any of the artwork or trademarks. This site exists for passionate fans to play a game they enjoy and augment, rather than replace, the in person LCG. FFG does not endorse, support, and is not involved with, this site in any way.",
      ),
    ]),
  ])
}
