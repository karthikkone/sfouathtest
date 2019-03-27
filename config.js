const env = process.env.NODE_ENV;

console.log(`loading env : ${env}`);

const production = {
    app: {
        port: parseInt(process.env.PORT)
    },
    salesforce: {
        clientId: process.env.SF_OAUTH_CLIENT_ID,
        clientSecret: process.env.SF_OAUTH_CLIENT_SECRET,
        callbackUri: process.env.SF_OAUTH_CALLBACK_URI
    }
}

const test = {
    app: {
        port: parseInt(process.env.PORT) || 8080
    },
    salesforce: {
        clientId: process.env.SF_OAUTH_CLIENT_ID || 'SOME_CLIENT_ID',
        clientSecret: process.env.SF_OAUTH_CLIENT_SECRET || 'SOME_CLIENT_SECRET',
        callbackUri: process.env.SF_OAUTH_CALLBACK_URI || 'localhost:8080/callback'
    } 
}

const config = {
    production,
    test
}

module.exports = config[env];