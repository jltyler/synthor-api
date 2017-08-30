'use strict'

const HttpError = require('lib/wiring/errors/http-error')
const controller = require('lib/wiring/controller')
const models = require('app/models')
const Patch = models.patch

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')


const index = (req, res, next) => {
  // If user then get both user patches and the public patches
  const query = req.user ? {$or: [{_owner: req.user._id}, {isPrivate: false}]} : {isPrivate: false}
  Patch.find(query)
    .then(patches => res.json({
      patches: patches.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  let allowIt = true
  if (req.patch.isPrivate) {
    if (!req.user || req.user._id.toString() !== req.patch._owner.toString()) {
      allowIt = false
    }
  }
  if (allowIt) {
    res.json({
      patch: req.patch.toJSON({ virtuals: true, user: req.user })
    })
  } else {
    console.log('!!!NOT ALLOWED!!!')
    res.sendStatus(404)
  }
}

const create = (req, res, next) => {
  // console.log('patches.create')
  // console.log(req.body);
  const patch = Object.assign(req.body.patch, {
    _owner: req.user._id
  })
  // console.log('passed patch assignment')
  // console.log(patch)
  Patch.create(patch)
    .then(patch => {
      // console.log('created?')
      return res.status(201)
      .json({
        patch: patch.toJSON({ virtuals: true, user: req.user })
      })
    })
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body._owner  // disallow owner reassignment.
  delete req.body.patch.isPrivate  // disallow privacy reassignment.
  // Check if osc is being updated and copyy unlisted properties
  // Lets just leave this feature out for now and worry later if I have time
  // console.log('patch.update')
  // console.log('req.patch:', req.patch)
  // console.log('req.body.patch:', req.body.patch)
  // if (req.body.patch.osc1) {
  //   console.log('We are updating some osc1 settings...')
  //   for (const key in req.patch.osc1) {
  //     console.log('Checking osc1.' + key)
  //     if (req.patch.osc1.hasOwnProperty(key)) {
  //       console.log('Found non-proto osc1.' + key)
  //       if (!req.body.patch.osc1.hasOwnProperty(key)) {
  //         console.log('Did not find non-proto osc1.' + key + ' on body.patch')
  //         req.body.patch[key] = req.patch[key]
  //       }
  //     }
  //   }
  // }
  req.patch.update(req.body.patch)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.patch.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Patch), only: ['show'] },
  { method: setModel(Patch, { forUser: true }), only: ['update', 'destroy'] }
] })
