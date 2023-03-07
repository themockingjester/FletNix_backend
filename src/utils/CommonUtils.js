const resultObject = function (success, message, data, code) {
    return {
        success,
        message,
        data,
        code,
    };
};
const generateResponse = function (success, message, data, statusCode) {
    return {
        success,
        message,
        data,
        statusCode,
    };
};

module.exports = {
    generateResponse, resultObject
}