const router = require('express').Router()
const controller = require('./controllers')

router.get('/', controller.home)
router.post('/shorten', controller.create)
router.put('/shorten/:id', controller.update)
router.delete('/shorten/:id', controller.remove)
router.get('/shorten/:code/stats', controller.getStats)
router.get('/:code', controller.redirect)

module.exports = router