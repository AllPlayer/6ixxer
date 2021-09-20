//01-12-2017
jQuery( document ).ready(function() {


       console.log(location_check);
       console.log(location_popup);
      jQuery( ".locationDialog" ).dialog({
      resizable: false,
      height: "auto",
      width: 700,
      draggable: false,
      closeOnEscape: false,
      height: 300,
      modal: true,
      title:"Location Alert",
      buttons:{},
      autoOpen:false,
    });

     jQuery.cookie("latitude", "" );
    jQuery.cookie("longitude", "");
      jQuery.cookie("geolocation_status_flag", '');
	var isCollected = false;
        if(window.sessionStorage){
           isCollected = window.sessionStorage.getItem('geo_collected');
           if(!isCollected){
              isCollected = false;
              window.sessionStorage.setItem('geo_collected',false);
           }
        }

  var geoUrl = '/get-geo-coordiantes/';
  function getFromAppEngine(errorStr){
        jQuery.getJSON( geoUrl, function( data ) {
                var status = data.status;
                if(status == "success"){
                    jQuery.cookie("geolocation_status_flag", 'fallback_success');
                    showPosition(
                        {
                          'coords' :
                                {
                                        'latitude' :data.lat,
                                        'longitude' :  data.lon
                                }
                        }
                    );
                }else{
                    if(errorStr){
                        jQuery.cookie("geolocation_status_flag", 'fallback_failed');
        	        alert(errorStr);
	             }
		}
        });

  }

  function errorHandler(error){
        getFromAppEngine(error);
  }

  function getLocation() {
    if (navigator.geolocation) {
      var options = {
        enableHighAccuracy: true,
        timeout: 20000,
//        maximumAge: 60000
      };

      if (!navigator.permissions) {
      //alert('permission not available')
      	      navigator.geolocation.getCurrentPosition(showPosition, showError, options);
      }
      else {
          navigator.permissions && navigator.permissions.query({name: 'geolocation'}).then(function(PermissionStatus) {
              console.log('PermissionStatus.state ' + PermissionStatus.state);
              if(PermissionStatus.state == 'granted'){
                jQuery.cookie("geolocation_status_flag", 'state_granted');
      	      navigator.geolocation.getCurrentPosition(showPosition, showError, options);
                  console.log('show position called');
                    console.log('allowed');
                    //alert('allowed')

              }
              else if(PermissionStatus.state == 'prompt'){
                   jQuery.cookie("geolocation_status_flag", 'state_prompt');
                   navigator.geolocation.getCurrentPosition(showPosition, showError, options);
                  console.log('show position called');
                   console.log('prompt');
                   //alert('prompt')
              }
              else if(PermissionStatus.state == 'denied'){
                   jQuery.cookie("geolocation_status_flag", 'state_denied');
                   //alert('Please enable location by going to settings');
                   //jQuery('.locationDialog').removeClass('hidethis');
                   if(location_popup == "true"){
                    jQuery( ".locationDialog" ).dialog('open');
                  }
                   console.log('denied');
                   //alert('denied');
             }
          })
      }
    }
     else {
        alert("Geolocation is not supported by this browser. Please update browser or contact support");
        jQuery.cookie("geolocation_status_flag", 'geolocation_not_supported_by_browser');
        errorHandler();
    }
  }

  function showPosition(position) {
    console.log('inside show position');
    jQuery.cookie("geolocation_status_flag", "success");
    //jQuery.cookie("latitude", position.coords.latitude );
    //jQuery.cookie("longitude", position.coords.longitude );
    var geoUrl = '/set-geo-coordiantes/?latitude='+position.coords.latitude+'&longitude='+position.coords.longitude;
    jQuery.getJSON( geoUrl, function( data ) {
                var status = data.status;
                if(status == "success"){
                    jQuery.cookie("geolocation_status_flag", 'fallback_success');

                }else{
                    if(errorStr){
                        jQuery.cookie("geolocation_status_flag", 'fallback_failed');
        	            console.log(errorStr);
	             }
		}
     });




    /*jQuery.getJSON('https://maps.googleapis.com/maps/api/geocode/json', { latlng: position.coords.latitude + ',' + position.coords.longitude }, function(data) {
       var address_components = data['results'][0]['address_components'];
  	var address = data['results'][0]["formatted_address"];
  	console.log('address');
  	console.log(address);
  	//alert(address);
        for (var i in address_components){
          if(address_components[i].types[0] == 'postal_code'){
	    var postal_code = address_components[i].long_name;
           // alert(postal_code)
	  }
	}
       jQuery.cookie("formatted_address", address);
       jQuery.cookie("postal_code", postal_code);
       if (postal_code == 'undefined') {
         jQuery.cookie("postal_code", '');
       }

       jQuery.cookie("geolocation_status_flag", 'success');

	isCollected=true;
        if(window.sessionStorage){
               window.sessionStorage.setItem('geo_collected',true);
	}
    });*/
  }

  function showError(error) {
      jQuery.cookie("formatted_address", '');
      jQuery.cookie("postal_code", '');

      console.log('error');
      console.log(error);
	var msg=null;
      switch(error.code) {
          case error.PERMISSION_DENIED:
              jQuery.cookie("geolocation_status_flag", 'permission_denied');
              msg="Please enable your Location/GPS to Login/Register in our site.";
              //alert("Please enable your Location/GPS to Login/Register in our site.");
              if(location_popup == "true"){
                jQuery( ".locationDialog" ).dialog('open');
              }

              //errorHandler();
              break;
          case error.POSITION_UNAVAILABLE:
              jQuery.cookie("geolocation_status_flag", 'position_unavailable');
              msg="Location information is unavailable.";
              console.log("Location information is unavailable.");
              console.log(error.message);
              errorHandler(msg);
              break;
          case error.TIMEOUT:
              jQuery.cookie("geolocation_status_flag", 'timeout');
              msg="The request to get user location timed out.";
              //alert("The request to get user location timed out.");
              if(location_popup == "true"){
                jQuery( ".locationDialog" ).dialog('open');
              }
              break;
          case error.UNKNOWN_ERROR:
              jQuery.cookie("geolocation_status_flag", 'unkown_error')
	          //alert('An unknown error occurred.');
	          if(location_popup == "true"){
                jQuery( ".locationDialog" ).dialog('open');
              }
              break;
     }
     //location.reload();
  }
 // if(!isCollected ||  isCollected == 'false'){

    if(location_check == "true"){
	  getLocation();
	}
 // }

});