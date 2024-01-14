const newman = require('newman'); // require newman in your project
const fs = require('fs');

// Hack using dotenv. Preferred is secrets manager
require('dotenv').config();
const apiKey =  process.env.apikey;

// hack cache
let cachedPackageJson = null;

// Function to read package.json and return a specific value
function readPackageJson(key) {
    if (!cachedPackageJson) {
        try {
            // Read the file content
            const rawData = fs.readFileSync('package.json', 'utf8');

            // Parse the JSON data
            cachedPackageJson = JSON.parse(rawData);
        } catch (error) {
            console.error('Error reading package.json:', error);
            return null;
        }
    }
    // Return the value for the specified key
    return cachedPackageJson[key];
}

const collectionId =  readPackageJson('collectionId');

// call newman.run to pass `options` object and wait for callback
newman.run({
    collection: `https://api.getpostman.com/collections/${collectionId}?apikey=${apiKey}`,
    reporters: 'cli'
}, function (err) {
    if (err) { throw err; }
    console.log('collection run complete!');
});