export default {
    apiUrl: 'https://testapi.meelian.art',
    timeout: 10000,

    withSignature: true,
    signatureWhiteList: [],

    tokenExpiresIn: 7200,

    bindTokenToDevice: false,

    passwordErrorLimit: 6,
    passwordErrorRetryTime: 3600,

    appPlus: {
        tokenExpiresIn: 2592000,
    },
    service: {
        sms: {
            "codeExpiresIn": 300
        }
    },


};
