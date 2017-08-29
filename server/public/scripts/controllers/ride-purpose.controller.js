myApp.controller('RidePurposeController', function($http) {
    console.log('RidePurposeController created');
    var rpc = this;

    geolocate();

    var placeSearch, autocomplete, autocomplete2, destA, destB, latA, lngA, latB, lngB;
    // var componentForm = {
    //   street_number: 'short_name',
    //   route: 'long_name',
    //   locality: 'long_name',
    //   administrative_area_level_1: 'short_name',
    //   country: 'long_name',
    //   postal_code: 'short_name'
    // };

    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
      {types: ['geocode']});

    // second location
    autocomplete2 = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete2')),
      {types: ['geocode']});

      function fillInAddress() {
        var geocoder = new google.maps.Geocoder();
        destA = autocomplete.getPlace();
        destB = autocomplete2.getPlace();

            latA = destA.geometry.location.lat();
            lngA = destA.geometry.location.lng();
            latB = destB.geometry.location.lat();
            lngB = destB.geometry.location.lng();
      }


    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
    rpc.addressA = destA;

    autocomplete2.addListener('place_changed', fillInAddress);
    rpc.addressB = destB;


    // Bias the autocomplete object to the user's geographical location,
    // as supplied by the browser's 'navigator.geolocation' object.
    function geolocate() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          console.log(position);
          var geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
          });
          autocomplete.setBounds(circle.getBounds());
        });
      }
    }

    rpc.putDestAB = function() {
      console.log("destA lat/lan are:", latA, lngA);
      console.log("destB lat/lng are:", latB, lngB);
      $http.put('/rider/destAB', rpc.user).then(function(response) {
        console.log('destAB put to db', response);
      }).catch(function(response) {
        console.log('destAB put error', response);
      });
    };

});
