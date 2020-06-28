import scheduledTestApiCall from "./src/scheduledTestApiCall"

scheduledTestApiCall({
    csLocalhostCall: process.argv[2] === 'testlocal'
})
