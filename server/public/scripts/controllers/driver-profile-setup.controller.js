myApp.controller('DriverProfileController', function($http) {
    console.log('DriverProfileController created');
    var dc = this;

    // Intiialize empty user object
    dc.user = {};

    // List of states abbreviations for dropdown select
    dc.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
            'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
            'WY').split(' ').map(function (state) { return { abbrev: state }; }
    );

    // Updates driver profile after setup
    dc.updateDriver = function() {
      console.log(dc.user);
      $http.put('/driver/update', dc.user).then(function(response) {
        console.log('updated driver', response);
      }).catch(function(response) {
        console.log('update driver error', response);
      })
    }

    // Photo upload functionality
    // API key
    dc.client = filestack.init('AX0Uil0hBT3afjt9bxjXXz');
    // Feedback for file upload
    dc.photoMessage = 'Photo is optional and will be displayed to riders'
    // Upload image and put file url
    dc.pickProfilePic = function() {
      console.log('adding driver pic');
      dc.client.pick({
        accept: 'image/*',
        maxFiles:1
      }).then(function (result) {
        console.log('json result', JSON.stringify(result));
        console.log('url:', result.filesUploaded[0].url);
        var imgUrl = {
          driver_photo_url: result.filesUploaded[0].url
        }
        $http.put('/driver/profilephoto', imgUrl).then(function(response) {
          console.log('added picture', response);
          dc.photoMessage = 'Photo added successfully';
        }).catch(function(response) {
          console.log('add picture error', response);
          dc.photoMessage = 'Error uploading photo';
        })
      });
    }

    // Feedback for file upload
    dc.vehicleMessage = ''
    // Upload image and put file url
    dc.pickVehiclePic = function() {
      console.log('adding vehicle pic');
      dc.client.pick({
        accept: 'image/*',
        maxFiles:1
      }).then(function (result) {
        console.log('json result', JSON.stringify(result));
        console.log('url:', result.filesUploaded[0].url);
        var imgUrl = {
          vehicle_photo_url: result.filesUploaded[0].url
        }
        $http.put('/driver/vehiclephoto', imgUrl).then(function(response) {
          console.log('added picture', response);
          dc.vehicleMessage = 'Photo added successfully';
        }).catch(function(response) {
          console.log('add picture error', response);
          dc.vehicleMessage = 'Error uploading photo';
        })
      });
    }


});