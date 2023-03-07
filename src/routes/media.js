const router = require('express').Router();
const { isAuthorisedForSensitiveMovies, isUserLoggedIn } = require("../middlewares/validateUserMiddleware")
const { searchInMedia, getMediaData } = require("../controllers/mediaController")
router.get('/search', [isUserLoggedIn], searchInMedia)
router.get('/getMediaData', [isUserLoggedIn], getMediaData)
module.exports = router