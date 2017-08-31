'use strict'

const mongoose = require('mongoose')

const patchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  isPrivate: {
    type: Boolean,
    default: false
  },

  // Oscillator 1 settings
  osc1Waveform: {
    type: String,
    required: true,
    enum: ['sawtooth', 'sine', 'square', 'triangle']
  },
  osc1Volume: { type: Number, required: true },
  osc1Octave: { type: Number, required: true },
  osc1Detune: { type: Number, required: true },
  osc1Unison: { type: Number, required: true },
  osc1Panning: { type: Number, required: true },
  osc1TremoloWaveform: {
    type: String,
    required: true,
    enum: ['sawtooth', 'sine', 'square', 'triangle']
  },
  osc1TremoloAmp: { type: Number, required: true },
  osc1TremoloFreq: { type: Number, required: true },
  osc1Attack: { type: Number, required: true },
  osc1Decay: { type: Number, required: true },
  osc1Sustain: { type: Number, required: true },
  osc1Release: { type: Number, required: true },

  // Oscillator 2 settings
  osc2Waveform: {
    type: String,
    required: true,
    enum: ['sawtooth', 'sine', 'square', 'triangle']
  },
  osc2Volume: { type: Number, required: true },
  osc2Octave: { type: Number, required: true },
  osc2Detune: { type: Number, required: true },
  osc2Unison: { type: Number, required: true },
  osc2Panning: { type: Number, required: true },
  osc2TremoloAmp: { type: Number, required: true },
  osc2TremoloFreq: { type: Number, required: true },
  osc2TremoloWaveform: {
    type: String,
    required: true,
    enum: ['sawtooth', 'sine', 'square', 'triangle']
  },
  osc2Attack: { type: Number, required: true },
  osc2Decay: { type: Number, required: true },
  osc2Sustain: { type: Number, required: true },
  osc2Release: { type: Number, required: true },

  // Filter settings
  filterFrequency: { type: Number, required: true },
  filterQ: { type: Number, required: true },
  filterEnv: { type: Number, required: true },
  filterTremoloWaveform: {
    type: String,
    required: true,
    enum: ['sawtooth', 'sine', 'square', 'triangle']
  },
  filterTremoloAmp: { type: Number, required: true },
  filterTremoloFreq: { type: Number, required: true },
  filterAttack: { type: Number, required: true },
  filterDecay: { type: Number, required: true },
  filterSustain: { type: Number, required: true },
  filterRelease: { type: Number, required: true },
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
