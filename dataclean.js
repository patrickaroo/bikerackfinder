var conn = new Mongo();
var db = conn.getDB("rackdata");

db.chicago.find().forEach(function(data){
    db.chicago.update({_id:data._id}, {$set: {loc: [data.Longitude, data.Latitude]}});
});

db.chicago.ensureIndex({"loc":"2d"});
