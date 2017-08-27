'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Patch = models.patch

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Patch.find()
    .then(patches => res.json({
      patches: patches.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    patch: req.patch.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next) => {
  const patch = Object.assign(req.body.patch, {
    _owner: req.user._id
  })
  Patch.create(patch)
    .then(patch =>
      res.status(201)
        .json({
          patch: patch.toJSON({ virtuals: true, user: req.user })
        }))
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body._owner  // disallow owner reassignment.
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
