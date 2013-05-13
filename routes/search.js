var mongoose = require('mongoose');

// define a schema to give Mongoose an idea of what we're looking for
var BikeRackSchema = new mongoose.Schema({
        Address: String,
        Latitude: String,
        Longitude: String
    },
    {
        collection: 'racks'
    }
);

// define an object that is going to represent one document
// pass in a name and a schema
// TO DO: double check parameters of model
var BikeRack = mongoose.model('rack', BikeRackSchema);

exports.byLoc = function(req, res){
    console.log(req.query.lat, req.query.lng);
    return BikeRack.find({
            loc: { $nearSphere:[ req.query.lng, req.query.lat ], $maxDistance: 100}
            }).limit(5).execFind(function(err, rack){
            res.send(rack);
    });
};

exports.byAddress = function(req, res){
    res.send('testing');
};
