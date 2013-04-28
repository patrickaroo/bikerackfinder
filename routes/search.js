var mongoose = require('mongoose');

var BikeRackSchema = new mongoose.Schema({
        Address: String,
        Latitude: String,
        Longitude: String
    },
    {
        collection: 'racks'
    }
);
var BikeRack = mongoose.model('rack', BikeRackSchema);

exports.byLoc = function(req, res){
    console.log(req.query.lat, req.query.lng);
    return BikeRack.find({
            loc: { $nearSphere:[ req.query.lng, req.query.lat ]}
            }).limit(10).execFind(function(err, rack){
            console.log('here', rack);
            res.send(rack);
    });
};
exports.byAddress = function(req, res){
    res.send('testing');
};
