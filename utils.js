function toBase62(id){
    const CHARS = process.env.CHARS
    let result = ''
    while (id > 0) {
        result = CHARS[id % 62] + result
        id = Math.floor(id / 62)
    }
    return result
}

module.exports = { toBase62 }