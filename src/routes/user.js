const router = require('express').Router();
// const { isAuthorisedForNormalTasks, isAuthorisedForSensitiveTasks, addAdminAuthCode } = require("../middlewares/securityMiddleware")
const { registerNewUser } = require("../controllers/userController")
router.put('/registerUser', registerNewUser)
module.exports = router