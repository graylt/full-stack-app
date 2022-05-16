const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const architectureSchema = new Schema ({

    dayVisit: {type: Boolean},
    overNight: {type: Boolean},
    title: {type: String, required:true},
    architect: {type: String, required: true},
    year: String,
    img: {type: String},
    loc: {streetAddress: String, city: String, state: String, postalCode: Number, country: String},
    link: {type: String}
})
    
const serverCollection = mongoose.model('architecture', architectureSchema);
module.exports = serverCollection;

