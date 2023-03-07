const { mediaCollection } = require("../models/DbConnection")
const { resultObject } = require("../utils/CommonUtils")
const { ValidAge } = require("../utils/appConstants")
const DefaultRowsCount = 15
const searchMediaInDB = (query, pageNo, userAge, type) => {
    return new Promise(async (resolve, reject) => {
        try {
            pageNo = (pageNo - 1) * DefaultRowsCount
            const queryConfig = [
                {
                    $search: {
                        index: "newitemindex",
                        text: {
                            query: query,
                            path: {
                                wildcard: "*"
                            }
                        }
                    }
                }
            ]
            if (userAge < ValidAge) {
                queryConfig.push({ $match: { "rating": { $ne: "R" } } })

            }
            if (type != "All") {
                queryConfig.push({ $match: { "type": type } })
            }


            await mediaCollection.aggregate(
                queryConfig
            ).skip(pageNo).limit(DefaultRowsCount).toArray().then((data) => {
                resolve(resultObject(true, `Successfully collected data`, { data: data }, 200))

            }).catch((err) => {
                reject(resultObject(false, `Failed to query data`, { data: err }, 500))

            })


        } catch (err) {
            reject(resultObject(false, `Failed to collected data`, { error: err.message }, 500))

        }
    })
}

const getMediaDataFromDB = (mediaId, userAge) => {
    return new Promise(async (resolve, reject) => {
        try {
            let queryConfig = {
                _id: mediaId,
            }
            if (userAge < ValidAge) {
                queryConfig['rating'] = { $ne: "R" }
            }
            await mediaCollection.find(queryConfig).toArray().then((data) => {
                resolve(resultObject(true, `Successfully collected data`, { data: data }, 200))

            }).catch((err) => {
                reject(resultObject(false, `Failed to query data`, { data: err }, 500))

            })


        } catch (err) {
            reject(resultObject(false, `Failed to collected data`, { error: err.message }, 500))

        }
    })
}
module.exports = {
    searchMediaInDB, getMediaDataFromDB
}