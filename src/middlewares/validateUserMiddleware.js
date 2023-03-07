const { generateResponse } = require("../utils/commonUtils")
const { ValidAge } = require("../utils/appConstants")



function isAuthorisedForSensitiveMovies(req, res, next) {
    console.log(req.session)
    if (req.session?.age >= ValidAge) {
        next()

    } else {
        return res.status(200).send(generateResponse(false, 'Failed: this content is age stricted!', {}, 403))
    }

};

function isUserLoggedIn(req, res, next) {
    if (req.session?.uEm) {
        next()

    } else {
        return res.status(200).send(generateResponse(false, 'Failed: You are not logged in', {}, 401))
    }

};

module.exports = {
    isAuthorisedForSensitiveMovies, isUserLoggedIn
}