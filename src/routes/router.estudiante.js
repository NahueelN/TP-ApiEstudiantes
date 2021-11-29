const express = require('express')
const controller = require('../controllers/estudiante.controller')
const router = express.Router()


router.post("/", controller.post)
router.delete("/", controller.delete)
router.put("/", controller.put)
router.get('/', controller.get)
router.get("/", controller.getD)
router.get("/", controller.getE)


module.exports = router