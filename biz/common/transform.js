module.exports = {
    listTransform : async data => {
        return data.map((item, i) => ({
            ...item, index: i
        }))
    }
}