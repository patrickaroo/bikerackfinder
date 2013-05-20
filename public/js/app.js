
function initialize(userPos, racks) {
    var userLatLng = new google.maps.LatLng(userPos.coords.latitude, userPos.coords.longitude);

    var mapOptions = {
        center: userLatLng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
		streetViewControl: false
    };

    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    mapOptions.center = new google.maps.LatLng(racks[0].Latitude, racks[0].Longitude);
    var placeMarkers = function() {
        for(var i=0;i<racks.length;i++) {
            var marker = new google.maps.Marker({  position: new google.maps.LatLng(racks[i].Latitude, racks[i].Longitude),  map: map  });
            console.log(racks[i].Latitude, racks[i].Longitude);
        }
    }

    placeMarkers();

    var usrMarker = new google.maps.Marker({
        position: userLatLng,
        map: map,
        icon: 'http://maps.google.com/mapfiles/arrow.png'
    });

}

function drawListView(res){
    var ul = $('#list-container');

    for(var i =0, ii = res.length; i < ii; i++){
        ul.append('<li>'+res[i].Address+'</li>');
    }
    $('#map-canvas').after(ul);
    ul.listview("refresh");
}

$(function(){

    navigator.geolocation.getCurrentPosition(function(pos){

        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/findRacksByLoc?lat='+pos.coords.latitude+'&lng='+pos.coords.longitude);
        xhr.onload = function(){
            console.log(this.responseText);

            var res = JSON.parse(this.responseText);
            initialize(pos, res);

            drawListView(res);
        };
        xhr.send();
    });
});

// get lat and long by address from google
var getGeoByAddress = function(address) {    
    geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
            console.log(results[0].geometry.location.jb, results[0].geometry.location.kb);
    var LatLng = new google.maps.LatLng(results[0].geometry.location.jb, results[0].geometry.location.kb);
            return LatLng;
        }); 
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }   
    }); 
});
