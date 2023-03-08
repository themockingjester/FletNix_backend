const { registerUserInDb, checkUserCredentialsInDB } = require("../models/userModel")
const { resultObject, generateResponse } = require("../utils/CommonUtils")
const { validateAge, validateEmail, validatePassword } = require("../utils/ValidationUtils")
const loginUser = (req, res) => {
    return new Promise((resolve, reject) => {
        const { email, password } = req.headers
        try {
            console.log(req.session)
            checkUserCredentialsInDB(email, password).then((response) => {
                if (response.success == true && response.code == 302) {
                    req.session.uEm = response.data.data.email
                    req.session.age = response.data.data.age
                    resolve(res.status(200).send(generateResponse(true, `Success: successfully logged in`, {}, 302)))
                } else if (response.success == true && response.code == 404) {
                    resolve(res.status(200).send(generateResponse(true, `Account not found`, {}, 404)))
                } else {
                    throw response
                }
            }).catch((response) => {

                console.log(response.message, response.code)
                resolve(res.status(200).send(generateResponse(false, `Failed: something went wrong`, {}, response.code)))


            })
        }
        catch (error) {
            console.log(error.message, error.stack)
            resolve(generateResponse(false, 'Internal Server Error', {}, 500))
        }
    })
}

module.exports = {
    loginUser
}