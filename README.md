# Firebase Functions Cold Start Bug Demo

https://issuetracker.google.com/issues/158014637

The purpose of this project is to document excessive delay on cold-starting firebase functions.

## This code is up-to-date as of

   January 6, 2021

## Conclusions

The raw data from this test shows that excessive delays are associated with two specific moments:

* the instantiation of the firestore library (3194ms)
* the first api call using the firestore library (1817ms)

Calls to a warmed up function are much faster

* instantiation of the firestore library (preloaded - skipped)
* first api call using the firestore library (52ms)

Delays of this length are extremely disruptive to the user experience of various applications and our
engineers are regularly writing work-arounds for critical path UI steps to reduce user impact.

## Expected Results

Cold starting functions should be able to achieve millisecond initialization speed even when
activating firestore libraries during a cold start.

## How To Execute Against Deployed Servers

NOTE this project is currently hard coded for a public firebase project on the free firebase plan.

    git clone https://github.com/ryanhornberger/firebase-functions-cold-start-bug.git
    cd firebase-functions-cold-start-bug/functions
    npm install
    npm run demo-prod

## How To Execute Locally

Please have node v10.21 installed before proceeding.
Executing locally DOES NOT appear to reproduce the issue.
You will need to deploy the project to your own servers for real testing.
However, you can verify the code works locally be performing the following.

    git clone https://github.com/ryanhornberger/firebase-functions-cold-start-bug.git
    cd firebase-functions-cold-start-bug/functions
    npm install
    npm run serve

From a second terminal

    npm run demo-local

## Raw Results

FIRST CALL

    [
      {
        "targetUrl": "https://us-central1-cinder-firebase-debug.cloudfunctions.net/testHttpsCallEmpty",
        "calledFnName": "testHttpsCallEmpty",
        "callId": "1609951547493.1609951547495.testHttpsCallEmpty",
        "status": 200,
        "timers": {
          "functionTotalDeltaTs": 2,
          "clientDeltaTs": 659
        }
      },
      {
        "targetUrl": "https://us-central1-cinder-firebase-debug.cloudfunctions.net/testHttpsCallWithFirestore",
        "calledFnName": "testHttpsCallWithFirestore",
        "callId": "1609951547851.1609951553159.testHttpsCallWithFirestore",
        "status": 200,
        "timers": {
          "firebaseAdminInstanceDeltaTs": 4,
          "firestoreInstanceDeltaTs": 2998,
          "firestoreQueryDeltaTs": 2306,
          "functionTotalDeltaTs": 5308,
          "clientDeltaTs": 5668
        }
      },
      {
        "targetUrl": "https://us-central1-cinder-firebase-debug.cloudfunctions.net/testHttpsRequestEmpty",
        "calledFnName": "testHttpsRequestEmpty",
        "callId": "1609951553569.1609951553571.testHttpsRequestEmpty",
        "status": 200,
        "timers": {
          "functionTotalDeltaTs": 2,
          "clientDeltaTs": 486
        }
      },
      {
        "targetUrl": "https://us-central1-cinder-firebase-debug.cloudfunctions.net/testHttpsRequestWithFirestore",
        "calledFnName": "testHttpsRequestWithFirestore",
        "callId": "1609951553984.1609951558490.testHttpsRequestWithFirestore",
        "status": 200,
        "timers": {
          "firebaseAdminInstanceDeltaTs": 6,
          "firestoreInstanceDeltaTs": 2713,
          "firestoreQueryDeltaTs": 1787,
          "functionTotalDeltaTs": 4506,
          "clientDeltaTs": 4840
        }
      }
    ]

SECOND CALL

    [
      {
        "targetUrl": "https://us-central1-cinder-firebase-debug.cloudfunctions.net/testHttpsCallEmpty",
        "calledFnName": "testHttpsCallEmpty",
        "callId": "1609951574990.1609951574990.testHttpsCallEmpty",
        "status": 200,
        "timers": {
          "functionTotalDeltaTs": 0,
          "clientDeltaTs": 410
        }
      },
      {
        "targetUrl": "https://us-central1-cinder-firebase-debug.cloudfunctions.net/testHttpsCallWithFirestore",
        "calledFnName": "testHttpsCallWithFirestore",
        "callId": "1609951575165.1609951575387.testHttpsCallWithFirestore",
        "status": 200,
        "timers": {
          "firebaseAdminInstanceDeltaTs": "preloaded",
          "firestoreInstanceDeltaTs": "preloaded",
          "firestoreQueryDeltaTs": 222,
          "functionTotalDeltaTs": 222,
          "clientDeltaTs": 400
        }
      },
      {
        "targetUrl": "https://us-central1-cinder-firebase-debug.cloudfunctions.net/testHttpsRequestEmpty",
        "calledFnName": "testHttpsRequestEmpty",
        "callId": "1609951575571.1609951575572.testHttpsRequestEmpty",
        "status": 200,
        "timers": {
          "functionTotalDeltaTs": 1,
          "clientDeltaTs": 176
        }
      },
      {
        "targetUrl": "https://us-central1-cinder-firebase-debug.cloudfunctions.net/testHttpsRequestWithFirestore",
        "calledFnName": "testHttpsRequestWithFirestore",
        "callId": "1609951575740.1609951575795.testHttpsRequestWithFirestore",
        "status": 200,
        "timers": {
          "firebaseAdminInstanceDeltaTs": "preloaded",
          "firestoreInstanceDeltaTs": "preloaded",
          "firestoreQueryDeltaTs": 55,
          "functionTotalDeltaTs": 55,
          "clientDeltaTs": 223
        }
      }
    ]
