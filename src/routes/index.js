
const router = require("express").Router();
const auth = require("./auth")
const user = require('./user')
const media = require("./media")
router.use("/auth", auth)
router.use("/user", user)
router.use("/media", media)

module.exports = router