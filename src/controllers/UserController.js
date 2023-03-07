const { registerUserInDb } = require("../models/userModel")
const { resultObject, generateResponse } = require("../utils/CommonUtils")
const { validateAge, validateEmail, validatePassword } = require("../utils/ValidationUtils")
const registerNewUser = (req, res) => {
    return new Promise((resolve, reject) => {
        const { email, password, age } = req.body
        try {
            if (validateEmail(email) && validatePassword(password) && validateAge(age)) {
                registerUserInDb(email, password, age).then((response) => {
                    if (response.success == true && response.code == 200) {
                        resolve(res.status(200).send(generateResponse(true, `Success: successfully added user`, {}, 200)))
                    } else if (response.success == false && response.code == 302) {
                        resolve(res.status(200).send(generateResponse(true, `Email is in use`, {}, 302)))
                    } else {
                        throw response
                    }
                }).catch((response) => {

                    console.log(response.message, response.code)
                    resolve(res.status(200).send(generateResponse(false, `Failed: something went wrong`, {}, response.code)))


                })
            } else {
                resolve(res.status(200).send(generateResponse(false, `Failed: Invalid parameters`, {}, 400)))

            }
        } catch (error) {
            console.log(error.message, error.stack)
            resolve(generateResponse(false, 'Internal Server Error', {}, 500))
        }
    })
}

module.exports = {
    registerNewUser
}