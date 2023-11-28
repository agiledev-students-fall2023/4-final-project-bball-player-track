const mongoose = require ('mongoose')

const teamPlayerStatSchema = new mongoose.Schema({
    Name: String,
    Gp: Number,
    Min: Number,
    Pts: Number,
    Reb: Number,
    Ast: Number,
    Stl: Number,
    Blk: Number,
    To: Number,
    Pf: Number,
    lastUpdated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('TeamPlayerStat', teamPlayerStatSchema);