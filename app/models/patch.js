'use strict'

const mongoose = require('mongoose')

const patchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  osc1: {
    volume: {
      type: Number,
      required: true
    },
    octave: {
      type: Number,
      required: true
    },
    detune: {
      type: Number,
      required: true
    },
    waveform: {
      type: String,
      required: true,
      enum: ['sawtooth', 'sine', 'square', 'triangle']
    },
    unison: {
      type: Number,
      required: true
    },
    panning: {
      type: Number,
      required: true
    },
    tremoloAmp: {
      type: Number,
      required: true
    },
    tremoloFreq: {
      type: Number,
      required: true
    },
    attack: {
      type: Number,
      required: true
    },
    decay: {
      type: Number,
      required: true
    },
    sustain: {
      type: Number,
      required: true
    },
    release: {
      type: Number,
      required: true
    }
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret, options) {
      const userId = (options.user && options.user._id) || false
      ret.editable = userId && userId.equals(doc._owner)
      return ret
    }
  }
})

patchSchema.virtual('length').get(function length () {
  return this.text.length
})

const Patch = mongoose.model('Patch', patchSchema)

module.exports = Patch
