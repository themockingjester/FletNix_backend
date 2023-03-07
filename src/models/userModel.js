const { response } = require("express")
const { resultObject } = require("../utils/commonUtils")
const { usersCollection } = require("./DbConnection")
const registerUserInDb = (email, password, age) => {
    return new Promise((resolve, reject) => {
        try {
            checkIfEmailExists(email).then((response) => {
                if (response.success == true && response.code == 302) {
                    resolve(resultObject(false, `User Email already exists`, {}, 302))
                } else if (response.success == true && response.code == 404) {
                    usersCollection.insertOne({
                        email: email, password: password, age: age, _id: email
                    }).then((data) => {
                        console.log(data)
                        resolve(resultObject(true, `Successfully registered user`, {}, 200))
                    }).catch((error => {
                        reject(resultObject(false, `Failed to register user`, { error: error }, 500))
                    }))
                } else {
                    reject(resultObject(false, `Failed to register user`, response.data, response.code))

                }
            })
        } catch (err) {
            reject(resultObject(false, `Failed to register user`, { error: err }, 500))
        }
    })
}

const checkIfEmailExists = (email) => {
    return new Promise((resolve, reject) => {
        try {
            usersCollection.findOne({ email: email }).then((data) => {
                if (data != null) {
                    // data exists
                    resolve(resultObject(true, `Successfully checked for user existence`, {}, 302))

                } else {
                    resolve(resultObject(true, `Successfully checked for user existence`, {}, 404))
                }
            }).catch((err) => {
                reject(resultObject(false, `Failed checked for user existence`, { error: err }, 500))

            })
        } catch (err) {
            reject(resultObject(false, `Failed checked for user existence`, { error: err.message }, 500))

        }
    })
}

const checkUserCredentialsInDB = (email, password) => {
    return new Promise((resolve, reject) => {
        try {
            usersCollection.findOne({ email: email, password: password }).then((data) => {
                if (data != null) {
                    // data exists
                    resolve(resultObject(true, `Successfully checked for user credentials`, { data: data }, 302))

                } else {
                    resolve(resultObject(true, `Successfully checked for user credentials`, {}, 404))
                }
            }).catch((err) => {
                reject(resultObject(false, `Failed checked for user credentials`, { error: err }, 500))

            })
        } catch (err) {
            reject(resultObject(false, `Failed checked for user credentials`, { error: err.message }, 500))

        }
    })
}

module.exports = {
    registerUserInDb, checkUserCredentialsInDB
}