pub type Clan {
  Crab
  Crane
  Dragon
  Lion
  Phoenix
  Scorpion
  Unicorn
}

pub fn name_of_clan(clan: Clan) {
  case clan {
    Crab -> "Crab"
    Crane -> "Crane"
    Dragon -> "Dragon"
    Lion -> "Lion"
    Phoenix -> "Phoenix"
    Scorpion -> "Scorpion"
    Unicorn -> "Unicorn"
  }
}
