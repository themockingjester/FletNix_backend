var validator = require('validator')
const validateEmail = (email) => {
    try {
        if (validator.default.isEmail(email) && email.length <= 50) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const validateNumber = (num) => {
    try {
        return validator.default.isNumeric(`${num}`)
    } catch (error) {
        return false
    }
}

const validateAge = (num) => {
    try {
        return validator.default.isNumeric(`${num}`) && num > 8
    } catch (error) {
        return false
    }
}
const validatePassword = (password) => {
    try {
        return validator.default.isStrongPassword(`${password}`)
    } catch (error) {
        return false
    }
}


module.exports = {
    validateEmail, validateNumber, validatePassword, validateAge
}

