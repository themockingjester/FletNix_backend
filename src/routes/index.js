
const { generateResponse } = require("../utils/commonUtils")
const router = require("express").Router();
const auth = require("./auth")
const user = require('./user')
const media = require("./media")
router.use("/auth", auth)
router.use("/user", user)
router.use("/media", media)
router.get('/logout', function (req, res) {
    try {
        req.session = null
        res.status(200).send(generateResponse(true, 'Successfully logged out', {}, 200))
    } catch (error) {
        res.status(500).send(generateResponse(true, 'Failed: to log out', {}, 500))
    }
});
module.exports = router