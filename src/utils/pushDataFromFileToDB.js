const fs = require('fs')
const { client, mediaCollection } = require("../models/DbConnection")
const csv = require('fast-csv');
const data = []
async function uploadData() {
    let data = []
    fs.createReadStream('../../netflix_titles.csv')
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.error(error))
        .on('data', row => data.push(row))
        .on('end', () => {
            let dataToPush = []
            while (data.length > 0) {
                const element = data.pop();
                element._id = element.show_id
                dataToPush.push(element)
            }

            mediaCollection.insertMany(dataToPush).then((success) => {
                console.log(success)
            }).catch((error) => {
                console.log(error)
            })
        });
}
async function main() {
    let ifCollectionExists = await client.db('fletnix').listCollections({ name: "appdata" }).hasNext().then((data))
    if (ifCollectionExists) {
        uploadData()
    } else {
        client.db('fletnix').createCollection('appdata').then((data) => {
            uploadData()

        }).catch((error) => {
            console.log(error)
        })
    }

}

main()

