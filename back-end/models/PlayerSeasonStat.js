const mongoose = require ('mongoose')

const playerSeasonStatSchema = new mongoose.Schema({
    fullName: String,
    Seasons:[
        {
            Season: Number,
            Gp: Number,
            Min: String,
            Pts: Number,
            Reb: Number,
            Ast: Number,
            Stl: Number,
            Blk: Number,
            To: Number,
            Pf: Number,
        
        }
    ],

    lastUpdated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('PlayerSeasonStat', playerSeasonStatSchema);