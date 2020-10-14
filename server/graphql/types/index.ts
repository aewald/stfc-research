const abilities = `
  type Abilities {
    captain: AbilityCaptain
    officer: AbilityOfficer
  }

  type AbilityCaptain {
    name: String!
    description: String!
    value: Int!
    synergy: Synergy
  }

  type Synergy {
    command: Int!
    engineering: Int!
    science: Int!
  }

  type AbilityOfficer {
    name: String!
    description: String!
    rank: [Int!]!
  }
`;

const ranks = `
  type OfficerRanks {
    rank1: OfficerRank
    rank2: OfficerRank
    rank3: OfficerRank
    rank4: OfficerRank
    rank5: OfficerRank
  }

  type OfficerRank {
    maxLevel: Int!
    shards: Int!
    credits: OfficerCredits
    experience: Int!
    badges: OfficerBadges
    attack: [Int!]!
    defense: [Int!]!
    health: [Int!]!
    strength: [Int!]!
    exp: [Int!]!
  }

  type OfficerCredits{
    type: String
    cost: Int
  }

  type OfficerBadges {
    type: String
    cost: Int
  }
`;

const officersFields = `
  name: String!
  rarity: String!
  description: String!
  class: String!
  group: String!
  faction: String!
  abilities: Abilities
  ranks: OfficerRanks
`;

export const officersTypes = `
${abilities}
${ranks}
type Officers {
  _id: ID
  ${officersFields}
}`;
