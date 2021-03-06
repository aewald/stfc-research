import { gql } from 'apollo-boost';

export const GET_OFFICERS = gql`
  query Officers {
    officers {
      _id
      name
      rarity
    }
  }
`;

export const GET_OFFICER = gql`
  query Officer($id: ID) {
    officer(id: $id) {
      _id
      name
      description
      rarity
      class
      group
      faction
      abilities {
        captain {
          name
          description
          value
          synergy {
            command
            engineering
            science
          }
        }
        officer {
          name
          description
          rank
        }
      }
      ranks {
        rank1 {
          maxLevel
          shards
          credits {
            type
            cost
          }
          experience
          badges {
            type
            cost
          }
          attack
          defense
          health
          strength
          exp
        }
        rank2 {
          maxLevel
          shards
          credits {
            type
            cost
          }
          experience
          badges {
            type
            cost
          }
          attack
          defense
          health
          strength
          exp
        }
        rank3 {
          maxLevel
          shards
          credits {
            type
            cost
          }
          experience
          badges {
            type
            cost
          }
          attack
          defense
          health
          strength
          exp
        }
        rank4 {
          maxLevel
          shards
          credits {
            type
            cost
          }
          experience
          badges {
            type
            cost
          }
          attack
          defense
          health
          strength
          exp
        }
        rank5 {
          maxLevel
          shards
          credits {
            type
            cost
          }
          experience
          badges {
            type
            cost
          }
          attack
          defense
          health
          strength
          exp
        }
      }
    }
  }
`;
