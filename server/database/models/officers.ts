import { Schema, model } from 'mongoose';

const rankObject = new Schema({
  maxLevel: { type: Number, required: true },
  shards: { type: Number, required: true },
  credits: {
    type: { type: String, enum: ['Independent', 'Federation', 'Romulan', 'Klingon', ''] },
    cost: Number,
  },
  experience: { type: Number, required: true },
  badges: {
    type: { type: String, enum: ['Command', 'Engineering', 'Science', ''] },
    cost: Number,
  },
  attack: [Number],
  defense: [Number],
  health: [Number],
  strength: [Number],
  exp: [Number],
});

const officersSchema = new Schema({
  name: { type: String, maxlength: 64 },
  rarity: { type: String, enum: ['Uncommon', 'Common', 'Rare', 'Epic'] },
  description: { type: String, required: true },
  class: { type: String, enum: ['Command', 'Engineering', 'Science'] },
  group: { type: String, required: true, maxlength: 64 },
  faction: { type: String, enum: ['Neutral', 'Federation', 'Romulan', 'Klingon', 'Augment', 'Rogues', '????'] },
  abilities: {
    captain: {
      name: { type: String, required: true },
      description: { type: String, required: true },
      value: { type: Number, required: true },
      synergy: {
        command: { type: Number, required: true },
        engineering: { type: Number, required: true },
        science: { type: Number, required: true },
      },
    },
    officer: {
      name: { type: String, required: true },
      description: { type: String, required: true },
      rank: [Number],
    },
  },
  ranks: {
    rank1: rankObject,
    rank2: rankObject,
    rank3: rankObject,
    rank4: rankObject,
    rank5: rankObject,
  },

  updatedDate: { type: Date, default: Date.now },
  createdDate: { type: Date, default: Date.now },
});

export default model('Officers', officersSchema);
