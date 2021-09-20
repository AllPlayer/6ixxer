var googleUser = {};
var startApp = function() {
gapi.load('auth2', function(){
  // Retrieve the singleton for the GoogleAuth library and set up the client.
  auth2 = gapi.auth2.init({
    //client_id: '317765842922-appe94cdacf0bdbcc2f9pnq7790b725k.apps.googleusercontent.com',
    client_id:"64361962418-7busq1bddvreufprpvie9nrlp4hn241h.apps.googleusercontent.com",
    cookiepolicy: 'single_host_origin',
    // Request scopes in addition to 'profile' and 'email'
    //scope: 'additional_scope'
  });
  if(document.getElementById('customBtn')!=null)
  attachSignin(document.getElementById('customBtn'));
  if(document.getElementById('customBtn2')!=null)
attachSignin(document.getElementById('customBtn2'));if(document.getElementById('customBtn3')!=null)
attachSignin(document.getElementById('customBtn3'));if(document.getElementById('customBtn4')!=null)
attachSignin(document.getElementById('customBtn4'));
});
};

  function attachSignin(element) {
    console.log(element.id);
    auth2.attachClickHandler(element, {},
        function(googleUser) {
          var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
      $("#SOCIAL_API_TYPE").val("G");
      $("#SOCIAL_API_EMAIL").val(profile.getEmail());
      $("#SOCIAL_API_ID").val(profile.getId());
      $("#SOCIAL_API_NAME").val( profile.getName());
      $("#SocialForm").submit();
        }, function(error) {
          console.log(JSON.stringify(error, undefined, 2));
        });
  }



window.onbeforeunload = function(e){
  gapi.auth2.getAuthInstance().signOut();
};
startApp();

function emailedit(){
      
      var re = /\S+@\S+\.\S+/;
      var socemail = $('#socialmail').val();
      var validem = re.test(socemail);
      if (validem == true){
       $("#SOCIAL_API_EMAIL").val(socemail);
       social_log_check();
       return false; 
      }
      else{
         $('.socresponse_msg1').removeClass('success_msg');
         $('.socresponse_msg1').show();
         $('.socresponse_msg1').html('Please Enter Valid email id');
         $('.socresponse_msg1').addClass('error_msg');
         return false;
      }
      //window.scrollTo(0 ,0), !1;
    
  
  }

function social_log_check(){
    var api_email = $("#SOCIAL_API_EMAIL").val();
    var api_type = $("#SOCIAL_API_TYPE").val();
    var api_id =  $("#SOCIAL_API_ID").val();
    var api_name = $('#SOCIAL_API_NAME').val();

    if (api_email == ""){
      $('.socresponse_msg1').removeClass('success_msg');
      $('.socresponse_msg1').removeClass('error_msg');
      $('.socresponse_msg1').hide();
      $('#socialmailupdate').modal('show');
      return false;
    }

        $.ajax({
              url: '/api/v1/social-login-check/',
              dataType: 'json',
              data: {
              'api_email': api_email,
              'api_type': api_type,
              'api_id': api_id,
              'api_name':api_name,
              ////'csrfmiddlewaretoken': '{{ csrf_token }}',
              },
              async: false,
              type: "GET",
              success: function(data) {
                    status = data.status;
                    message = data.message;
                    res = data.data.show_form;
                    if (status == "Error"){

                        $('#response_msg').removeClass('success_msg');
                        $('#response_msg').show();
                        $('#response_msg').html(message);
                        $('#response_msg').addClass('error_msg');
                        //window.scrollTo(0 ,450), !1;
                    }
                    if (status == "Success"){
                        if (res == "register"){
                          ///logoogogogo//////

                          $.ajax({
                                    url: '/api/v1/signup/',
                                    dataType: 'json',
                                    data: {
                                    'api_email': api_email,
                                    'api_type': api_type,
                                    'api_id': api_id,
                                    'api_name':api_name,
                                    //'csrfmiddlewaretoken': '{{ csrf_token }}',
                                    },
                                    async: false,
                                    type: "POST",
                                    success: function(data) {
                                          status = data.status;
                                          message = data.message;
                                          if (status == "error"){

                                              $('#response_msg').removeClass('success_msg');
                                              $('#response_msg').show();
                                              $('#response_msg').html(message);
                                              $('#response_msg').addClass('error_msg');
                                              //window.scrollTo(0 ,450), !1;
                                          }
                                          if (status == "Success"){
                                              //$('#response_msg').show();
                                              //$('#response_msg').addClass('success_msg');
                                              //$('#response_msg').html("*Entered success");
                                              var token =data.token
                                              window.localStorage.setItem("token", token);
                                              try{
                                                  var reg_type="Form";
                                                  if(api_type == "FB")reg_type="FACEBOOK";
                                                  if(api_type == "G")reg_type="GOOGLE";
                                                  data.reg_type=reg_type;
                                                  CheckandsetGlobalEventService(JSON.stringify(data), true);
                                              }
                                              catch (e) {
                                                console.log("Error in Global Setting on Register.")
                                              }
                                              window.location.href="/thank-you/"
                                              //window.scrollTo(0 ,450), !1;

                                          }
                                    },
                                    error: function(edata) {
                                          status = edata.responseJSON.status;
                                          message = edata.responseJSON.message;
                                          if (status == "Error"){

                                              $('#response_msg').removeClass('success_msg');
                                              $('#response_msg').show();
                                              $('#response_msg').html(message);
                                              $('#response_msg').addClass('error_msg');
                                              //window.scrollTo(0 ,450), !1;
                                          } 
                                        }
                                      });
                                  return false;
                                  }



                        if (res == "login"){
                          var next_url= $("#next_url").val();
                          var url_redirect = "/lobby/";
                          if (next_url != ""){
                            url_redirect = next_url;
                          }
                          $.ajax({
                                        url: '/api/v1/login/',
                                        dataType: 'json',
                                        data: {
                                        'api_email': api_email,
                                        'api_type': api_type,
                                        'social_login':'true', 
                                        //'csrfmiddlewaretoken': '{{ csrf_token }}',
                                        },
                                        async: false,
                                        type: "POST",
                                        success: function(data) {
                                              status = data.status;
                                              message = data.message;
                                              if (status == "error"){

                                                  $('#response_msg').removeClass('success_msg');
                                                  $('#response_msg').show();
                                                  $('#response_msg').html(message);
                                                  $('#response_msg').addClass('error_msg');
                                                  //window.scrollTo(0 ,450), !1;
                                              }
                                              if (status == "Success"){
                                                  //$('#response_msg').show();
                                                  //$('#response_msg').addClass('success_msg');
                                                  //$('#response_msg').html("*Entered success");
                                                  var token =data.token
                                                  window.localStorage.setItem("token", token);
                                                  try{
                                                      var reg_type="Form";
                                                      if(api_type == "FB")reg_type="FACEBOOK";
                                                      if(api_type == "G")reg_type="GOOGLE";
                                                      CheckandsetGlobalEventService(JSON.stringify(data), true);
                                                  }
                                                  catch (e) {
                                                    console.log("Error in Global Setting on Login.")
                                                  }
                                                  window.location.href="/lobby/"
                                                  //window.scrollTo(0 ,450), !1;

                                              }
                                        },
                                      error: function(edata) {
                                              status = edata.responseJSON.status;
                                              message = edata.responseJSON.error;
                                              if (status == "Error"){

                                                  $('#response_msg').removeClass('success_msg');
                                                  $('#response_msg').show();
                                                  $('#response_msg').html(message);
                                                  $('#response_msg').addClass('error_msg');
                                                  //window.scrollTo(0 ,450), !1;
                                              } 
                                            }
                                  });
                        }
                        $('#response_msg').show();
                        $('#response_msg').addClass('success_msg');
                        $('#response_msg').html(res);
                        //window.location.href="/lobby/"
                        //window.scrollTo(0 ,450), !1;

                    }
              },
            error: function(edata) {
                    status = edata.responseJSON.status;
                    message = edata.responseJSON.message;
                    if (status == "Error"){

                        $('#response_msg').removeClass('success_msg');
                        $('#response_msg').show();
                        $('#response_msg').html(message);
                        $('#response_msg').addClass('error_msg');
                        //window.scrollTo(0 ,450), !1;
                    } 
                  }
        });
    return false;
}