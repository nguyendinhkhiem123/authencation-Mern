

const getUser = ((req, res) =>{
    return res.json({
        message : "Truy cập thành công"
    })
})

module.exports = {
    getUser
}