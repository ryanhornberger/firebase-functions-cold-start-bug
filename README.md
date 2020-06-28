# Firebase Functions Cold Start Bug Demo

The purpose of this project is to document excessive delay on cold-starting firebase functions.

## Conclusions


## Raw Results

    TODO

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
