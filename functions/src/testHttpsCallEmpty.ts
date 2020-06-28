const fnName = 'testHttpsCallEmpty'
//const logAndRequire = (require('./logAndRequire').default)(fnName)

const performTimedAction = async (inFn:any) => {
    const startTs = Date.now()
    const result = await inFn()
    const endTs = Date.now()
    return {
        callId: `${startTs}.${endTs}.${fnName}`,
        timers: {
            ...result.timers,
            functionTotalDeltaTs: endTs - startTs
        }
    }
}

export default async (data:any, context:any) => {
    return await performTimedAction(async () => {
        return { timers: {} }
    })
}
