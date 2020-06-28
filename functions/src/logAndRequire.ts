export default (callerName:string) => {
    return (filename:string) => {
        const result = require(filename)
        console.log(callerName, 'is requiring', filename)
        return result.default
    }
}
