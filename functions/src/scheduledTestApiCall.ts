const logAndRequire = (require('./logAndRequire').default)('scheduledTestApiCall')
const axios = logAndRequire('axios')

const prodApi = 'https://us-central1-cinder-firebase-debug.cloudfunctions.net'
const localApi = 'http://localhost:5001/cinder-firebase-debug/us-central1'

const timedApiCall = async (method:string, fnName:string, context: any) => {
    const targetApi = context.csLocalhostCall ? localApi : prodApi
    const targetUrl = `${targetApi}/${fnName}`

    const startTs = Date.now()
    const result = await axios({
        method: method,
        url: targetUrl,
        data: { data: {} }
    })
    const endTs = Date.now()

    return {
        targetUrl: targetUrl,
        calledFnName: fnName,
        callId: result.data.result.callId,
        status: result.status,
        timers: {
            ...result.data.result.timers,
            clientDeltaTs: endTs - startTs
        }
    }
}

export default async (context: any) => {
    const results = []
    {
        results.push(await timedApiCall('post','testHttpsCallEmpty', context))
        results.push(await timedApiCall('post','testHttpsCallWithFirestore', context))
        results.push(await timedApiCall('post','testHttpsRequestEmpty', context))
        results.push(await timedApiCall('post','testHttpsRequestWithFirestore', context))
    }
    console.log(JSON.stringify(results, null, 2))
}
