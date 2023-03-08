const router = require('express').Router();
const { isUserLoggedIn } = require("../middlewares/validateUserMiddleware")
const { loginUser } = require("../controllers/authController")
const { generateResponse } = require("../utils/CommonUtils")
router.post('/login', loginUser)
router.post('/logout', [isUserLoggedIn], function (req, res) {
    try {
        req.session = null
        res.status(200).send(generateResponse(true, 'Successfully logged out', {}, 200))
    } catch (error) {
        res.status(500).send(generateResponse(true, 'Failed: to log out', {}, 500))
    }
});
module.exports = router