var conn = new Mongo();
var db = conn.getDB("rackdata");

db.racks.find().forEach(function(data){
    db.racks.update({_id:data._id}, {$set: {loc: [data.Longitude, data.Latitude], city: "chicago"}});
});

db.racks.ensureIndex({"loc":"2d"});
