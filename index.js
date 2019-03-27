const nforce = require('nforce');
const express = require('express');
const config = require('./config');

const app = express();
const port = config.app.port;

const org = nforce.createConnection({
    clientId: config.salesforce.clientId,
    clientSecret: config.salesforce.clientSecret,
    redirectUri: config.salesforce.callbackUri
});

app.get('/',(req, res) => {
    res.redirect(org.getAuthUri());
});

//listen to requests
app.listen(port,(err)=>{
    if (err) {
        console.log('failed to start the server on port ',port);
    } else {
        console.log('server is running on port ',port);
    }
})