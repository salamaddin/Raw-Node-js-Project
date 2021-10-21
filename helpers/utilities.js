/*
 * Title: Utilities
 * Description: Important utility functions
 * Author: Sumit Saha ( Learn with Sumit )
 * Date: 11/21/2020
 *
 */

// dependencies
const environments = require('./environments');
const crypto = require('crypto');

// module scaffolding
const utilities = {};


// parse JSON string to Object
utilities.parseJSON = (jsonString) => {
    let output;

    try {
        output = JSON.parse(jsonString);
    } catch {
        output = {};
    }

    return output;
};

// hash string
utilities.hash = (str) => {
    if (typeof str === 'string' && str.length > 0) {
       // console.log(environments, process.env.NODE_ENV);
        const hash = crypto.createHmac('sha256', 'fdgdyhdh').update(str).digest('hex');
        return hash;
    }
    return false;
};

// export module
module.exports = utilities;