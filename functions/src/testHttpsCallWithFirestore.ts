const fnName = 'testHttpsCallWithFirestore'
const logAndRequire = (require('./logAndRequire').default)(fnName)

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

let firebaseAdmin:any
let firebaseInstance:any
let firestore:any

export default async (data:any, context:any) => {
    return await performTimedAction(async ()=>{
        const timers:any = {}
        if(!firebaseAdmin) {
            // fire up firebase admin
            const t0 = Date.now()
            firebaseAdmin = logAndRequire('firebase-admin').default
            firebaseInstance = await firebaseAdmin.initializeApp()
            const t1 = Date.now()
            timers.firebaseAdminInstanceDeltaTs = t1 - t0

            // fire up firestore instance
            const t2 = Date.now()
            firestore = await firebaseInstance.firestore()
            const t3 = Date.now()
            timers.firestoreInstanceDeltaTs = t3 - t2
        }
        else {
            timers.firebaseAdminInstanceDeltaTs = 'preloaded'
            timers.firestoreInstanceDeltaTs = 'preloaded'
        }

        // make firebase read call
        const t4 = Date.now()
        await firestore.collection('testCollection').doc('testkey').get()
        const t5 = Date.now()
        timers.firestoreQueryDeltaTs = t5 - t4

        return { timers: timers }
    })
}
