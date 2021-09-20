 //18-10-2018//
function getMobileExistOrNot(ele){
    var Mobile = $(ele).find(".reg-mble").val();
    Mobile=$.trim(Mobile);
    if (Mobile == ""){
      showexistErrors("mobile invalid",  false);
      return false; }
    var mobileexist=true;
    if (Mobile != ""){
      if (Mobile.length != 10 || parseInt(Mobile.charAt(0)) < 6){
        showexistErrors("mobile invalid",  true);
        return false;
    }
  }
    $.ajax({    url: '/checkmobileavailability/'+Mobile+"/",
              dataType: 'json',
              async: false,
              data: {},
              success: function(data) {
                    result = data.result
                    if (result == "True"){
                        showexistErrors("mobile",  true);
                         mobileexist = true;
                     }
                     if (result == "False"){
                        showexistErrors("mobile",  false)
                        mobileexist = false;

                     }
               }
    });
    return mobileexist;
}


function showexistErrors(error_type, is_error){

    var error_msg = ""
    if(error_type =="mobile invalid"){
        error_msg = "* Please enter valid mobile number."
    }
    else if(error_type == "mobile"){

        $("div[for='mobile invalid']").html("").hide();
         error_msg = "* Given mobile number already registered with us."
    }
    else if(error_type =="email"){
         error_msg = "* Given email address already registered with us."
    }
    else if(error_type == "username"){
        error_msg = "* Given username already registered with us."
    }
    if(is_error){
        $(".message_div,.popmessage_div").hide();
        $(".message_div,.popmessage_div").show();
        $("div[for='"+error_type+"']").html(error_msg).show();
        $('#signupsubmit').attr('disabled','disabled');
    }
    else{
        $(".message_div,.popmessage_div").hide();
        $("div[for='"+error_type+"']").html("").hide();
        $('#signupsubmit').removeAttr('disabled');
    }
}


var usernameexist=false;var emailexist=false;mobileexist=false;
function getUsernameExistOrNot(ele){
    var Username=$(ele).find(".reg-user").val();
    Username=$.trim(Username);
    if (Username == ""){  return false; }
    $.ajax({ url:'/checkusernameavailability/'+Username+"/",
             dataType:'json',
             async:false,
             data:{},
             success:function(data){
                result=data.result;
            if(result=="True"){
                showexistErrors("username",  true);
                usernameexist=true;
            }
            if(result=="False"){
                usernameexist=false;
                showexistErrors("username",  false);

             }
         }
    });
    return usernameexist;
}


function getEmailExistOrNot(ele){
    var Email=$(ele).find(".reg-email").val();
    Email=$.trim(Email);
    if (Email == ""){  return false; }
    $.ajax({ url:'/checkemailavailability/'+Email+"/",
             dataType:'json',
             async:false,
             data:{},
             success:function(data){
                result=data.result
                if(result=="True"){
                    showexistErrors("email",  true);
                    emailexist=true;
                 }
                if(result=="False"){
                    emailexist=false;
                    showexistErrors("email",  false);
                }
             }
    });

    return emailexist;
}

 
 function send_login(ele){

    var user= $(ele).find(".log-user").val();
    var pswd= $(ele).find(".log-pswd").val();
    var next_url= $(ele).find(".next_url").val();
    var url_redirect = "/lobby/";
    if (next_url != ""){
      url_redirect = next_url;
    }


        if(user == "" || pswd == "") {
            $('.response_msg').removeClass('success_msg');
            $('.response_msg').html("*Please Enter username and password");
            $('.response_msg').show();
            $('.response_msg').addClass('error_msg');
            //window.scrollTo(0 ,450), !1;
            return false;
        }
        $.ajax({
              url: '/api/v1/login/',
              dataType: 'json',
              data: {
              'username': user,
              'password': pswd, 
              },
              async: false,
              type: "POST",
              success: function(data) {
                    var status = data.status;
                    var message = data.message;
                    if (status == "error"){

                        $('.response_msg').removeClass('success_msg');
                        $('.response_msg').show();
                        $('.response_msg').html(message);
                        $('.response_msg').addClass('error_msg');
                        //window.scrollTo(0 ,450), !1;
                    }
                    if (status == "Success"){
                        //$('.response_msg').show();
                        //$('.response_msg').addClass('success_msg');
                        //$('.response_msg').html("*Entered success");
                        var token =data.token;
                        CheckandsetUserattributes(true, JSON.stringify(data));
                        Glb_WebEngage.loginEvent();
                        window.localStorage.setItem("token", token);
                        window.location.href=url_redirect;
                        //window.location.assign(url_redirect);
                        //window.scrollTo(0 ,450), !1;

                    }
              },
            error: function(edata) {
                    status = edata.responseJSON.status;
                    message = edata.responseJSON.error;
                    if (status == "Error"){

                        $('.response_msg').removeClass('success_msg');
                        $('.response_msg').show();
                        $('.response_msg').html(message);
                        $('.response_msg').addClass('error_msg');
                        //window.scrollTo(0 ,450), !1;
                    } 
                  }
        });
    return false;
}


function ajaxunblock(){
  var $body = $("body");
  $body.removeClass("loading");
  console.log("adasdad");

}
function ajaxBlockUI(ele){
  var $body = $("body");
   $body.addClass("loading"); 
  console.log("adasdad");  
}

function ajaxUnBlockUI(ele){
  setTimeout(ajaxunblock, 2000);
}



function send_signup(ele){

    var user_exists=getUsernameExistOrNot(ele);
    var email_exists=getEmailExistOrNot(ele);
    var mobile_exist = getMobileExistOrNot(ele);
    if(user_exists||email_exists || mobile_exist){
    $('#signupsubmit').attr('disabled','disabled');
    return false;
}


    var user = $(ele).find(".reg-user").val();
    var pswd = $(ele).find(".reg-pswd").val();
    var email = $(ele).find(".reg-email").val();
    var mobile = $(ele).find('.reg-mble').val();


        if(user == "" || pswd == "" || email == "") {
            $('.response_msg').removeClass('success_msg');
            $('.response_msg').html("*Please Enter below Details");
            $('.response_msg').show();
            $('.response_msg').addClass('error_msg');
            window.scrollTo(0 ,0), !1;
            return false;
        }
        ajaxBlockUI();
        $.ajax({
              url: '/api/v1/signup/',
              dataType: 'json',
              data: {
              'username': user,
              'password': pswd,
              'email': email,
              'mobile':mobile,
              },
              async: false,
              type: "POST",
              success: function(data) {
                    status = data.status;
                    if (status == "error"){

                        $('.response_msg').removeClass('success_msg');
                        $('.response_msg').show();
                        $('.response_msg').html("Please Try later");
                        $('.response_msg').addClass('error_msg');
                        //window.scrollTo(0 ,450), !1;
                    }
                    if (status == "Success"){
                        //$('.response_msg').show();
                        //$('.response_msg').addClass('success_msg');
                        //$('.response_msg').html("*Entered success");
                        var token =data.token;
                        CheckandsetUserattributes(true, JSON.stringify(data));
                        Glb_WebEngage.registerEvent();
                        window.localStorage.setItem("token", token);
                        window.location.href="/thank-you/";
                        //window.scrollTo(0 ,450), !1;

                    }
                    ajaxUnBlockUI();
              },
            error: function(edata) {
                    status = edata.responseJSON.status;
                    message = edata.responseJSON.message;
                    if (status == "Error"){

                        $('.response_msg').removeClass('success_msg');
                        $('.response_msg').show();
                        $('.response_msg').html(message);
                        $('.response_msg').addClass('error_msg');
                        window.scrollTo(0 ,0), !1;
                    }
                    ajaxUnBlockUI(); 
                  },
        });
    return false;


}

$(document).ready(function(){

        $(".reg-email").blur(function(){
            getEmailExistOrNot($(this).closest('form'));
       });
        $(".reg-user").blur(function(){
           getUsernameExistOrNot($(this).closest('form'));
       });

        $(".reg-mble").blur(function(){
           getMobileExistOrNot($(this).closest('form'));
       });

        $(".reg-mble").keyup(function(){
          var ele =  $(this).closest('form')
          var Mobile = ele.find(".reg-mble").val();
          Mobile=$.trim(Mobile);
          if (Mobile != ""){
            if (Mobile.length == 10){
              getMobileExistOrNot($(this).closest('form'));
            }
          }

          else{

            showexistErrors("mobile invalid",  false);

          }

           
       });

        $("#rv-signin-form-id").validate({//onfocusout: false,onkeyup: false,
              onfocusout: false,
              rules: {
                  Username: {

          required: true,
          minlength: 4

          },
                 Password: {

          required: true,
          minlength: 5

          }
              },
              messages: {
                  Username: {
                      required: "Please enter username",
                      minlength: "Length should be 4 to 15 "
                  },
                  Password: {
                      required: "Please enter password",
                      minlength: "Length should be 5 to 15 "
                  },
              },
              //errorPlacement: function(){
                //      return false;
                //},
                errorElement : 'div',
    errorLabelContainer: '.message_div',

          });


           $(".rv-signup-form").validate({rules:{Username:{required:true,minlength:4},
          Email:{required:true,email:true},Password:{required:true,minlength:5}},
          messages:{Username:{required:"Please enter username",minlength:"Username (4-15 Characters)"},
          Password:{required:"Please enter password",minlength:"Password (5-15 Characters)"},
          Email:"Please enter valid email"},
         //errorPlacement: function(){
           //           return false;
             //  },
            errorElement : 'div',
    errorLabelContainer: '.message_div',
          showErrors:function(errorMap,errorList){
            this.defaultShowErrors();},
        success:function(){
                },
             });
        });



//forgot password //
var resendOTP=false;
function reset_pswd(){

    
    var rmail= $("#resetmail").val();

        if(rmail == "") {
            $('.response_msg').removeClass('success_msg');
            $('.response_msg').html("*Please Enter Valid email or mobile");
            $('.response_msg').show();
            $('.response_msg').addClass('error_msg');
            //window.scrollTo(0 ,450), !1;
            return false;
        }
        var showmob = false
        if(!isNaN(rmail)){
          showmob = true

        }
        ajaxBlockUI();
        $.ajax({
              url: '/api/v1/forgot-password/',
              dataType: 'json',
              data: {
              'email': rmail,
              },
              async: false,
              type: "GET",
              success: function(data) {
                    status = data.status;
                    message = data.message;
                    if (status == "Error"){

                        $('.response_msg1').removeClass('success_msg');
                        $('.response_msg1').show();
                        $('.response_msg1').html(message);
                        $('.response_msg1').addClass('error_msg');
                        //window.scrollTo(0 ,450), !1;
                    }
                    if (status == "Success"){
                        if(showmob){
                          $('#formdiv').hide();
                          $('#otppop').show();
                          document.getElementById('modalreset2').reset();
                          $('.response_msg1').addClass('success_msg');
                          $('.response_msg1').show();
                          $('.response_msg1').html(message);
                        }
                    else{
                      $('#formdiv').hide();
                      resendOTP=true;
                      $('.response_msg1').show();
                      $('.response_msg1').addClass('success_msg');
                      $('.response_msg1').html(message);
                      //window.scrollTo(0 ,0), !1;
                    }

                    }
                    ajaxUnBlockUI();
              },
            error: function(edata) {
                    status = edata.responseJSON.status;
                    message = edata.responseJSON.message;
                    if (status == "Error"){

                        $('.response_msg1').removeClass('success_msg');
                        $('.response_msg1').show();
                        $('.response_msg1').html(message);
                        $('.response_msg1').addClass('error_msg');
                        //window.scrollTo(0 ,0), !1;
                    }
                    ajaxUnBlockUI(); 
                  }
        });
    return false;
}




function OTPcheck(){ 
    var rmail= $("#resetmail").val();
    var token = $("#resetotp").val();

        if(rmail == "" || token == "" ) {
            $('.response_msg1').removeClass('success_msg');
            $('.response_msg1').html("*Please Enter OTP");
            $('.response_msg1').show();
            $('.response_msg1').addClass('error_msg');
            //window.scrollTo(0 ,450), !1;
            return false;
        }
        $.ajax({
              url: '/api/v1/forgot-password/',
              dataType: 'json',
              data: {
              'mobile': rmail,
              'token': token, 
              },
              async: false,
              type: "POST",
              success: function(data) {
                    status = data.status;
                    message = data.message;
                    usertoken = data.token;
                    if (status == "Error"){

                        $('.response_msg1').removeClass('success_msg');
                        $('.response_msg1').show();
                        $('.response_msg1').html(message);
                        $('.response_msg1').addClass('error_msg');
                        //window.scrollTo(0 ,450), !1;
                    }
                    if (status == "Success"){
                      $('#otppop').hide();
                      $('.response_msg1').show();
                      $('.response_msg1').addClass('success_msg');
                      $('.response_msg1').html(message);
                      $('#cpasspop').show();
                      document.getElementById('modalreset3').reset();
                      $('#ctoken').val(usertoken);
                      //window.scrollTo(0 ,0), !1;

                    }
              },
            error: function(edata) {
                    status = edata.responseJSON.status;
                    message = edata.responseJSON.message;
                    if (status == "Error"){

                        $('.response_msg1').removeClass('success_msg');
                        $('.response_msg1').show();
                        $('.response_msg1').html(message);
                        $('.response_msg1').addClass('error_msg');
                        window.scrollTo(0 ,0), !1;
                    } 
                  }
        });
    return false;
}

function changepass(){ 
    var password = $("#cpassword").val();
    var password1 = $("#cpassword1").val();
    var token = $("#ctoken").val();

        if(password == "" || password1 == "" ) {
            $('.response_msg').removeClass('success_msg');
            $('.response_msg').html("*Please Enter Valid email or mobile");
            $('.response_msg').show();
            $('.response_msg').addClass('error_msg');
            //window.scrollTo(0 ,450), !1;
            return false;
        }
        if(password != password1) {
            $('.response_msg').removeClass('success_msg');
            $('.response_msg1').html("*The passwords field are not matching");
            $('.response_msg').show();
            $('.response_msg').addClass('error_msg');
            //window.scrollTo(0 ,450), !1;
            return false;
        }
        $.ajax({
              url: '/api/v1/change-password/',
              dataType: 'json',
              data: {
              'password': password,
              'password1': password1,
              'pwd_token': token, 
              },
              async: false,
              type: "POST",
              success: function(data) {
                    status = data.status;
                    message = data.message;
                    if (status == "Error"){

                        $('.response_msg1').removeClass('success_msg');
                        $('.response_msg1').show();
                        $('.response_msg1').html(message);
                        $('.response_msg1').addClass('error_msg');
                        //window.scrollTo(0 ,450), !1;
                    }
                    if (status == "Success"){
                      $('#cpasspop').hide();
                      $('.response_msg1').show();
                      $('.response_msg1').addClass('success_msg');
                      $('.response_msg1').html(message);
                      resendOTP=true;
                      //window.scrollTo(0 ,0), !1;

                    }
              },
            error: function(edata) {
                    status = edata.responseJSON.status;
                    message = edata.responseJSON.message;
                    if (status == "Error"){

                        $('.response_msg1').removeClass('success_msg');
                        $('.response_msg1').show();
                        $('.response_msg1').html(message);
                        $('.response_msg1').addClass('error_msg');
                        window.scrollTo(0 ,0), !1;
                    } 
                  }
        });
    return false;
}

//end of forgot password //




//popdisplay//

 function fppage(){
    if(resendOTP){
      $('#reset-password').modal('show');
      $('.response_msg1').hide();
      $('#cpasspop').hide();
        $('#otppop').hide();
      $('#formdiv').show();
      $('#otpsend').hide();
        $('#otpresend').show();
        $('.response_msg1').show();
        $('.response_msg1').html("You can request for resend or contact Support if you face problem");
        }
    else{
      $('#reset-password').modal('show');
      $('#cpasspop').hide();
      $('#otppop').hide();
      $('#formdiv').show();
      $('#otpsend').show();
        $('#otpresend').hide();
      $('.response_msg1').hide();
      //window.scrollTo(0 ,0), !1;
    }
    
  
  }
  function showpopform(e){
    
      $(e).modal('show');
      $('#response_msg1').hide();
      $('#response_msg').hide();
      $('.popmessage_div').hide();
      //window.scrollTo(0 ,0), !1;
    
  
  }

//endpopup//