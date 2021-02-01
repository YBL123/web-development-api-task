const router = require('express').Router()
const users = require('../controllers/users')

// USER

router.route('/users/:id')
  .get(users.single)
  .put(users.update)
  .delete(users.delete)

router.route('/users')
  .get(users.index)
  .post(users.create)

module.exports = router