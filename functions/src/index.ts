import * as functions from 'firebase-functions'
const logAndRequireWithName = require('./logAndRequire').default

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'testHttpsCallEmpty') {
    exports.testHttpsCallEmpty = functions.runWith({
        timeoutSeconds: 20,
        memory: "256MB",
    }).https.onCall(logAndRequireWithName('index-testHttpsCallEmpty')('./testHttpsCallEmpty'))
}

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'testHttpsRequestEmpty') {
    exports.testHttpsRequestEmpty = functions.runWith({
        timeoutSeconds: 20,
        memory: "256MB",
    }).https.onRequest(logAndRequireWithName('index-testHttpsRequestEmpty')('./testHttpsRequestEmpty'))
}

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'testHttpsCallWithFirestore') {
    exports.testHttpsCallWithFirestore = functions.runWith({
        timeoutSeconds: 20,
        memory: "256MB",
    }).https.onCall(logAndRequireWithName('index-testHttpsCallWithFirestore')('./testHttpsCallWithFirestore'))
}

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'testHttpsRequestWithFirestore') {
    exports.testHttpsRequestWithFirestore = functions.runWith({
        timeoutSeconds: 20,
        memory: "256MB",
    }).https.onRequest(logAndRequireWithName('index-testHttpsRequestWithFirestore')('./testHttpsRequestWithFirestore'))
}

//
//if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'scheduledTestApiCall') {
//    exports.scheduledTestApiCall = functions.runWith({
//        timeoutSeconds: 20,
//        memory: "256MB",
//    }).pubsub.schedule('*/5 * * * *').timeZone('America/New_York').onRun(logAndRequireWithName('index-scheduledTestApiCall')('./scheduledTestApiCall'))
//}
//
