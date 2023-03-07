const router = require('express').Router();
// const { isAuthorisedForNormalTasks, isAuthorisedForSensitiveTasks, addAdminAuthCode } = require("../middlewares/securityMiddleware")
const { loginUser } = require("../controllers/authController")
router.post('/login', loginUser)
module.exports = router