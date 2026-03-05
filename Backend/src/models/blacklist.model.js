const mongoose = require('mongoose')

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type: String,
        required: [true, "Token is required"]
    }

},{
    timeseries : true
})

const tokenBlackistModel = mongoose.model('BlacklistToken', blacklistTokenSchema)

module.exports = tokenBlackistModel