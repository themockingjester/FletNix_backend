const { generateResponse } = require("../utils/CommonUtils")
const { searchMediaInDB, getMediaDataFromDB } = require("../models/mediaModel")
const searchInMedia = (req, res) => {
    return new Promise((resolve, reject) => {
        let { query, pageNo, type } = req.query
        pageNo = pageNo != undefined ? pageNo : 1
        type = type == undefined ? "All" : type

        if (!['All', 'TV Show', 'Movie'].includes(type)) {
            resolve(res.status(200).send(generateResponse(true, `Please provide a valid media type`, {}, 400)))

        } else {
            let userAge = req.session.age
            try {
                searchMediaInDB(query, pageNo, userAge, type).then((response) => {
                    if (response.success == true && response.code == 200) {
                        console.log(response.data.data.length)
                        resolve(res.status(200).send(generateResponse(true, `Successfully queried results`, response.data, 200)))
                    } else {
                        throw response
                    }
                }).catch((response) => {

                    console.log(response)
                    resolve(res.status(200).send(generateResponse(false, `Failed: something went wrong`, {}, response.code)))


                })
            } catch (error) {
                console.log(error.message, error.stack)
                resolve(generateResponse(false, 'Internal Server Error', {}, 500))
            }
        }

    })
}
const getMediaData = (req, res) => {
    return new Promise((resolve, reject) => {
        let { mediaId } = req.query
        let userAge = req.session.age
        try {
            getMediaDataFromDB(mediaId, userAge).then((response) => {
                if (response.success == true && response.code == 200) {
                    console.log(response.data.data.length)
                    resolve(res.status(200).send(generateResponse(true, `Successfully queried results`, response.data, 200)))
                } else {
                    throw response
                }
            }).catch((response) => {

                console.log(response)
                resolve(res.status(200).send(generateResponse(false, `Failed: something went wrong`, {}, response.code)))


            })
        } catch (error) {
            console.log(error.message, error.stack)
            resolve(generateResponse(false, 'Internal Server Error', {}, 500))
        }


    })
}

module.exports = {
    searchInMedia,
    getMediaData
}