'use strict'

const mongoose = require('mongoose')

const patchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  osc1Volume: {
    type: Number,
    required: true
  },
  osc1Octave: {
    type: Number,
    required: true
  },
  osc1Detune: {
    type: Number,
    required: true
  },
  osc1Waveform: {
    type: String,
    required: true,
    enum: ['sawtooth', 'sine', 'square', 'triangle']
  },
  osc1Unison: {
    type: Number,
    required: true
  },
  osc1Panning: {
    type: Number,
    required: true
  },
  osc1TremoloAmp: {
    type: Number,
    required: true
  },
  osc1TremoloFreq: {
    type: Number,
    required: true
  },
  osc1Attack: {
    type: Number,
    required: true
  },
  osc1Decay: {
    type: Number,
    required: true
  },
  osc1Sustain: {
    type: Number,
    required: true
  },
  osc1Release: {
    type: Number,
    required: true
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
}
)

const Patch = mongoose.model('Patch', patchSchema)

module.exports = Patch
