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

//routes
app.get('/',(req, res) => {
    res.redirect(org.getAuthUri());
});

app.get('/callback',(req, res)=>{
    org.authenticate({code: req.query.code}, function(err, response){
        if (!err) {
            console.log('OK auth success ',response);
            res.status(200).json({message:'authorization succeded'});
        } else {
            res.status(401).json({error: 'authorization failed'});
        }
    });
})

//listen to requests
app.listen(port,(err)=>{
    if (err) {
        console.log('failed to start the server on port ',port);
    } else {
        console.log('server is running on port ',port);
    }
});


//shutdown on unhandled errors
process.on('uncaughtException', (unhandlederr)=>{
    console.log('fatal unhandled errors ',err);
    console.log('app will shutdown ...');
    process.exit(1);
})