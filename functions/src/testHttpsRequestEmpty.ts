const fnName = 'testHttpsRequestEmpty'
//const logAndRequire = (require('./logAndRequire').default)(fnName)

const performTimedAction = async (inFn:any) => {
    const startTs = Date.now()
    const result = await inFn()
    const endTs = Date.now()
    return {
        result: {
            callId: `${startTs}.${endTs}.${fnName}`,
            timers: {
                ...result.timers,
                functionTotalDeltaTs: endTs - startTs
            }
        }
    }
}

export default async (req:any, res:any) => {
    res.status(200).send(await performTimedAction(async () => {
        return { timers: {} }
    }))
}
