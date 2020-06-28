# Firebase Functions Cold Start Bug Demo

The purpose of this project is to document excessive delay on cold-starting firebase functions.

## Conclusions

The raw data from this test shows that excessive delays are associated with two specific moments:

* the instantiation of the firestore (3194ms)
* the first api call using the firestore libraries (1817ms)

Calls to a warmed up function are much faster

* instantiation of the firestore (preloaded - skipped)
* first api call using the firestore libraries (52ms)

Delays of this length are extremely disruptive to the user experience of various applications and our
engineers are regularly writing work-arounds for critical path UI steps to reduce user impact.

## Raw Results

FIRST CALL

  [
    {
      targetUrl: 'https://us-central1-cinder-firebase-debug.cloudfunctions.net/testHttpsCallEmpty',
      calledFnName: 'testHttpsCallEmpty',
      callId: '1593312994839.1593312994839.testHttpsCallEmpty',
      status: 200,
      timers: {
        functionTotalDeltaTs: 0,
        clientDeltaTs: 436
      }
    },
    {
      targetUrl: 'https://us-central1-cinder-firebase-debug.cloudfunctions.net/testHttpsCallWithFirestore',
      calledFnName: 'testHttpsCallWithFirestore',
      callId: '1593312995336.1593313000351.testHttpsCallWithFirestore',
      status: 200,
      timers: {
        firebaseAdminInstanceDeltaTs: 4,
        firestoreInstanceDeltaTs: 3194,
        firestoreQueryDeltaTs: 1817,
        functionTotalDeltaTs: 5015,
        clientDeltaTs: 5429
      }
    },
    {
      targetUrl: 'https://us-central1-cinder-firebase-debug.cloudfunctions.net/testHttpsRequestEmpty',
      calledFnName: 'testHttpsRequestEmpty',
      callId: '1593313000707.1593313000707.testHttpsRequestEmpty',
      status: 200,
      timers: {
        functionTotalDeltaTs: 0,
        clientDeltaTs: 354
      }
    },
    {
      targetUrl: 'https://us-central1-cinder-firebase-debug.cloudfunctions.net/testHttpsRequestWithFirestore',
      calledFnName: 'testHttpsRequestWithFirestore',
      callId: '1593313000981.1593313006076.testHttpsRequestWithFirestore',
      status: 200,
      timers: {
        firebaseAdminInstanceDeltaTs: 81,
        firestoreInstanceDeltaTs: 3212,
        firestoreQueryDeltaTs: 1802,
        functionTotalDeltaTs: 5095,
        clientDeltaTs: 5372
      }
    }
  ]

SECOND CALL

  [
    {
      targetUrl: 'https://us-central1-cinder-firebase-debug.cloudfunctions.net/testHttpsCallEmpty',
      calledFnName: 'testHttpsCallEmpty',
      callId: '1593313154033.1593313154034.testHttpsCallEmpty',
      status: 200,
      timers: {
        functionTotalDeltaTs: 1,
        clientDeltaTs: 261
      }
    },
    {
      targetUrl: 'https://us-central1-cinder-firebase-debug.cloudfunctions.net/testHttpsCallWithFirestore',
      calledFnName: 'testHttpsCallWithFirestore',
      callId: '1593313154258.1593313154321.testHttpsCallWithFirestore',
      status: 200,
      timers: {
        firebaseAdminInstanceDeltaTs: 'preloaded',
        firestoreInstanceDeltaTs: 'preloaded',
        firestoreQueryDeltaTs: 63,
        functionTotalDeltaTs: 63,
        clientDeltaTs: 286
      }
    },
    {
      targetUrl: 'https://us-central1-cinder-firebase-debug.cloudfunctions.net/testHttpsRequestEmpty',
      calledFnName: 'testHttpsRequestEmpty',
      callId: '1593313154504.1593313154504.testHttpsRequestEmpty',
      status: 200,
      timers: {
        functionTotalDeltaTs: 0,
        clientDeltaTs: 181
      }
    },
    {
      targetUrl: 'https://us-central1-cinder-firebase-debug.cloudfunctions.net/testHttpsRequestWithFirestore',
      calledFnName: 'testHttpsRequestWithFirestore',
      callId: '1593313154649.1593313154701.testHttpsRequestWithFirestore',
      status: 200,
      timers: {
        firebaseAdminInstanceDeltaTs: 'preloaded',
        firestoreInstanceDeltaTs: 'preloaded',
        firestoreQueryDeltaTs: 52,
        functionTotalDeltaTs: 52,
        clientDeltaTs: 197
      }
    }
  ]

## Prerequisites

    node v10.21

## How To Execute Locally

    git clone https://github.com/ryanhornberger/firebase-functions-cold-start-bug.git
    cd firebase-functions-cold-start-bug/functions
    npm install
    ts-node runTest testlocal

## How To Execute Against Deployed Servers

NOTE this project is currently hard coded for a public firebase project on the free firebase plan.

    git clone https://github.com/ryanhornberger/firebase-functions-cold-start-bug.git
    cd firebase-functions-cold-start-bug/functions
    npm install
    ts-node runTest
