const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const {notFoundHandler} = require('../handlers/notFoundHandler');
const {parseJSON} = require('../helpers/utilities');

// module scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {

    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    const trimedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    // query string get req
    const queryStringObject = parseUrl.query;
    const headerObject = req.headers;

    const requestProperties = {
        parseUrl,
        path,
        trimedPath,
        method,
        queryStringObject,
        headerObject,
    };

    // String buffer for post req
    const decoder = new StringDecoder('utf-8');
    let realData = '';
    const chosenHandler = routes[trimedPath] ? routes[trimedPath] : notFoundHandler;
    

    req.on('data', (Buffer) => {
        realData += decoder.write(Buffer);
    });

    req.on('end', () => {
        realData += decoder.end();
        //console.log(realData);
        requestProperties.body =parseJSON(realData);

        chosenHandler(requestProperties,(statusCode, payload) => {
            statusCode = typeof statusCode === 'number' ? statusCode : 500;
            payload = typeof payload === 'object' ? payload : {};
    
            const payloadString = JSON.stringify(payload);

           // return the final response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
        });
          
    });

};


module.exports = handler;