
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

</script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-38041063-2', 'amazonaws.com');
  ga('send', 'pageview');

