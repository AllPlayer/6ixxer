/* Date : 12/04/2021  */

var GlobalEventClsObj = null;
var UserAttributesData = null;
var webengage = undefined;


$(document).ready(function(){

    GlobalEventsInit();
    $(".track_event_button").click(function(ele){
        var clickType = $(this).attr('data');
        if(clickType == 'add_cash'){
        	try {
        		//CheckandsetGlobalEventService(JSON.stringify(data), true);
                if(GlobalEventClsObj !=undefined && GlobalEventClsObj != null){
                    GlobalEventClsObj.triggerEvent("Add Cash", {});
                }
		    }
		    catch(err) {
		      console.log(err.message);
		    }
        }
        else if(clickType == 'apk_download'){
        	try {
        		//CheckandsetGlobalEventService(JSON.stringify(data), true);
                if(GlobalEventClsObj !=undefined && GlobalEventClsObj != null){
                    GlobalEventClsObj.triggerEvent("Download APK for APK", {});
                }
		    }
		    catch(err) {
		      console.log(err.message);
		    }
        }
        else if(clickType == 'ios_download'){
        	try {
        		//CheckandsetGlobalEventService(JSON.stringify(data), true);
                if(GlobalEventClsObj !=undefined && GlobalEventClsObj != null){
                    GlobalEventClsObj.triggerEvent("Download APK for IOS", {});
                }
		    }
		    catch(err) {
		      console.log(err.message);
		    }
        }

    });
 });


function checkForLogoutPage() {
    try {
        var currentPath = window.location.pathname;
        if (currentPath.indexOf('playerlogout') >= 0) {
            window.localStorage.setItem("UserAttributes", undefined);
            window.localStorage.clear();
            //webengage.user.logout();
        }
    } catch (err) {
        console.log(err);
    }
}

function CheckandsetGlobalEventService(DataObject, refresh){
    if(refresh){
        window.localStorage.setItem("UserAttributes", DataObject);
    }
    var StoredAttributes = window.localStorage.getItem("UserAttributes");
    if(StoredAttributes != undefined && StoredAttributes != null){
        try{
          StoredAttributes = JSON.parse(StoredAttributes);
          GlobalEventClsObj = new GlobalEventService();
          GlobalEventClsObj.setUserAttributes(StoredAttributes);
          GlobalEventClsObj.setUser(StoredAttributes.playerid);
        }
        catch(err){
              console.log(err);
        }
    }
    else{
        GlobalEventClsObj = new GlobalEventService();
        var user_id = window.localStorage.getItem("player_id");
        if(user_id != undefined && user_id != null){
            GlobalEventClsObj.setUser(user_id);
        }

    }
}

function GlobalEventsInit(){
    checkForLogoutPage();
    CheckandsetGlobalEventService();
    try{
        /*var worker = new Worker('/service-worker.js');
        worker.addEventListener('message', function(e) {
            console.log('Worker said: ', e.data);
        }, false);
        worker.postMessage('Testing..');*/
    }
    catch (e) {
        console.log("Erro in worked");
    }

    //GlobalEventClsObj = new GlobalEventService();
    //GlobalEventClsObj.CheckandsetUserattributes();
}

class GlobalEventService {
    constructor() {
        this.user_id = undefined;
        this.user_data = undefined;
        this.email = undefined;
        this.mobile = undefined;
    }



    setUser(userId){
      this.user_id = userId.toString();
    }
    setUserAttributes(attrData){
      this.user_data = attrData;
    }
    updateUserEmail(email){
        this.email = email;
        if(typeof webengage == "object"  && webengage != undefined && webengage !=null){
            webengage.user.setAttribute('we_email', this.email);
        }
        if(typeof Moengage == "object"  && Moengage != undefined && Moengage !=null){
            Moengage.add_email(this.email);
        }
    }
    updateUserMobile(mobile){
        this.mobile = mobile;
        if(typeof webengage == "object"  && webengage != undefined && webengage !=null){
            webengage.user.setAttribute('we_phone', this.mobile);
        }
        if(typeof Moengage != "undefined"  && Moengage != undefined && Moengage !=null){
            Moengage.add_mobile(this.mobile);
        }
    }
    updateUserAttribute(attrName, attrValue){
        if(typeof webengage == "object"  && webengage != undefined && webengage !=null){
            if(attrName == "register_type")
                webengage.user.setAttribute('Type', attrValue);
            if(attrName == "user_firstname")
                webengage.user.setAttribute('we_first_name', attrValue);
            if(attrName == "user_lastname")
                webengage.user.setAttribute('we_last_name', attrValue);
            if(attrName == "user_city")
                webengage.user.setAttribute('city', attrValue);
            if(attrName == "user_state")
                webengage.user.setAttribute('State', attrValue);
            if(attrName == "user_pincode")
                webengage.user.setAttribute('pincode', attrValue);
            if(attrName == "user_address1")
                webengage.user.setAttribute('address1', attrValue);
            if(attrName == "user_address2")
                webengage.user.setAttribute('address2', attrValue);
            if(attrName == "user_gender")
                webengage.user.setAttribute('we_gender', attrValue);
        }

        if(typeof Moengage != "undefined"  && Moengage != undefined && Moengage !=null){
            if(attrName == "register_type")
                Moengage.user.setAttribute('Type', attrValue);
            if(attrName == "user_firstname")
                Moengage.add_first_name(attrValue);
            if(attrName == "user_lastname")
                Moengage.add_last_name(attrValue);
            if(attrName == "user_city")
                Moengage.add_user_attribute('city', attrValue);
            if(attrName == "user_state")
                Moengage.add_user_attribute('state', attrValue);
            if(attrName == "user_pincode")
                Moengage.add_user_attribute('pincode', attrValue);
            if(attrName == "user_address1")
                Moengage.add_user_attribute('address1', attrValue);
            if(attrName == "user_address2")
                Moengage.add_user_attribute('address2', attrValue);
            if(attrName == "user_dob"){
                var dob_list = attrValue.split("-");
                Moengage.add_birthday(new Date(parseInt(dob_list[0]),parseInt(dob_list[1]),parseInt(dob_list[2]) ));
            }
            if(attrName == "user_gender"){
                var Gender = "M";
                if(attrValue.toLowerCase() == "male"){
                    Gender = "M";
                }
                else if(attrValue.toLowerCase() == "female"){
                    Gender = "F";
                }
                Moengage.add_gender(Gender);
            }
        }
    }
    registerEvent() {

        try{
            if(typeof webengage == "object"  && webengage != undefined && webengage !=null){
                var  webEngageObj = new WebEngageEvents();
                webEngageObj.setService(this);
                webEngageObj.registerEvent();
            }
        }
        catch (e) {
            console.log("Error in Webengage Event Tracking Reg "+ e)
        }
        try{
            if(typeof Moengage != "undefined"  && Moengage != undefined && Moengage !=null){
                var MoEngageObj = new MoengageEvent()
                MoEngageObj.setService(this);
                MoEngageObj.registerEvent();
            }
        }
        catch (e) {
            console.log("Error in Webengage Event Tracking Reg "+ e)
        }
        try{
            if(typeof dataLayer != "undefined"  && dataLayer != undefined && dataLayer !=null){
                var GoogleTagManagerTrackerObj = new GoogleTagManagerDataTracker()
                GoogleTagManagerTrackerObj.setService(this);
                GoogleTagManagerTrackerObj.registerEvent();
            }
        }
        catch (e) {
            console.log("Error in Webengage Event Tracking  Reg " + e);
        }
        try{
            if((typeof fbq == "function" || typeof fbq == "object") && fbq != undefined && fbq !=null ){
                var FBDataObj = new FacebookDataTracker()
                FBDataObj.setService(this);
                FBDataObj.registerEvent();
            }
        }
        catch (e) {
            console.log("Error in FB Event Tracking Reg "+ e)
        }

    }
    LoginEvent() {

        try{
            if(typeof webengage == "object"  && webengage != undefined && webengage !=null){
                var  webEngageObj = new WebEngageEvents();
                webEngageObj.setService(this);
                webEngageObj.loginEvent();
            }
        }
        catch (e) {
            console.log("Error in Webengage Event Tracking Login " + e)
        }
        try{
            if(typeof Moengage != "undefined"  && Moengage != undefined && Moengage !=null){
                var MoEngageObj = new MoengageEvent()
                MoEngageObj.setService(this);
                MoEngageObj.loginEvent();
            }
        }
        catch (e) {
            console.log("Error in Webengage Event Tracking  Login " + e)
        }
        try{
            if(typeof dataLayer != "undefined"  && dataLayer != undefined && dataLayer !=null){
                var GoogleTagManagerTrackerObj = new GoogleTagManagerDataTracker()
                GoogleTagManagerTrackerObj.setService(this);
                GoogleTagManagerTrackerObj.loginEvent();
            }
        }
        catch (e) {
            console.log("Error in GOOGLE TagManager Event Tracking Login" + e)
        }
        try{
            if((typeof fbq == "function" || typeof fbq == "object") && fbq != undefined && fbq !=null ){
                var FBDataObj = new FacebookDataTracker()
                FBDataObj.setService(this);
                FBDataObj.loginEvent();
            }
        }
        catch (e) {
            console.log("Error in FB Event Tracking Login " + e)
        }


    }
    triggerEvent(event_name, eventData){
        if(this.user_id != undefined){
            eventData['userID'] = this.user_id;
        }
        try{
            if(typeof webengage == "object"  && webengage != undefined && webengage !=null){
                var  webEngageObj = new WebEngageEvents();
                webEngageObj.setService(this);
                webEngageObj.triggerEvent(event_name, eventData);
            }
        }
        catch (e) {
            console.log("Error in Webengage Event Tracking"  + event_name + " " +  eventData +" "+ e)
        }
        try{
            if(typeof Moengage != "undefined"  && Moengage != undefined && Moengage !=null){
                var MoEngageObj = new MoengageEvent()
                MoEngageObj.setService(this);
                MoEngageObj.triggerEvent(event_name, eventData);
            }
        }
        catch (e) {
            console.log("Error in Webengage Event Tracking"  + event_name + " " +  eventData +" "+ e)
        }
        try{
            if(typeof dataLayer != "undefined"  && dataLayer != undefined && dataLayer !=null){
                var GoogleTagManagerTrackerObj = new GoogleTagManagerDataTracker()
                GoogleTagManagerTrackerObj.setService(this);
                GoogleTagManagerTrackerObj.triggerEvent(event_name, eventData);
            }
        }
        catch (e) {
            console.log("Error in GOOGLE TagManager Event Tracking"  + event_name + " " +  eventData +" "+ e)
        }
        try{
            if((typeof fbq == "function" || typeof fbq == "object") && fbq != undefined && fbq !=null ){
                var FBDataObj = new FacebookDataTracker()
                FBDataObj.setService(this);
                FBDataObj.triggerEvent(event_name, eventData);
            }
        }
        catch (e) {
            console.log("Error in FB Event Tracking" + event_name + " " +  eventData +" "+ e)
        }
    }
}

class WebEngageEvents{

    setService(serviceObj){
        this.eventServiceObj = serviceObj;
        this.userId = serviceObj.user_id;
        this.userAttributes = serviceObj.user_data;
    }

    updateUserAttribute(attrName, attrValue){

        webengage.user.setAttribute(attrName, attrValue);

    }

    registerEvent(){
        webengage.user.login(this.userId); //9SBOkLVMWvPX is the unique user identifier being used here
        webengage.user.setAttribute('we_email', this.userAttributes.email);
        webengage.user.setAttribute('we_gender', this.userAttributes.gender.toLowerCase());
        webengage.user.setAttribute('we_phone', this.userAttributes.mobile);
        webengage.user.setAttribute('we_first_name', this.userAttributes.firstname);
        var regData = {"userId" : this.userId,
                        'we_email': this.userAttributes.email,
                        'we_phone': this.userAttributes.mobile, "Type": "Form"
                                    }
        if(this.userAttributes.reg_type != undefined || this.userAttributes.reg_type !=null){
            regData['Type'] = this.userAttributes.reg_type;
        }
        webengage.track("User Registered", regData);
    }
    loginEvent(){
        webengage.user.login(this.userId); //9SBOkLVMWvPX is the unique user identifier being used here
        webengage.track("User Login", {"userId" : this.userId});
        if(this.userAttributes == undefined || this.userAttributes == null){
            return;
        }
        webengage.user.setAttribute('we_email', this.userAttributes.email);
        webengage.user.setAttribute('we_gender', this.userAttributes.gender.toLowerCase());
        webengage.user.setAttribute('we_phone', this.userAttributes.mobile);
        if(this.userAttributes.dob != null || this.userAttributes.dob != "None"){
            webengage.user.setAttribute('we_birth_date', this.userAttributes.dob);
        }
        webengage.user.setAttribute('we_first_name', this.userAttributes.firstname);
        webengage.user.setAttribute('we_last_name', this.userAttributes.lastname);
        webengage.user.setAttribute('city', this.userAttributes.city);
        webengage.user.setAttribute('State', this.userAttributes.state);
        webengage.user.setAttribute('pincode', this.userAttributes.zipcode);
        webengage.user.setAttribute('RegistrationIP', this.userAttributes.creationip);
        webengage.user.setAttribute('FirstDepositDate', new Date(this.userAttributes.first_deposit_date));
        webengage.user.setAttribute('EmailVerificationStatus', this.userAttributes.verified);
        webengage.user.setAttribute('MobileVerificationStatus', this.userAttributes.mobileverified || this.userAttributes.manual_mobile_verified);
        webengage.user.setAttribute('KYCStatus', this.userAttributes.kycverified);
        //webengage.user.setAttribute('KYC_ADDRESS_STATUS', KYC_ADDRESS_STATUS);
        //webengage.user.setAttribute('networkoverlap', networkoverlap);
        //webengage.user.setAttribute('InactiveDays', InactiveDays);
        webengage.user.setAttribute('InactiveDays', this.userAttributes.last_login_days);
        webengage.user.setAttribute('LastLoginDate', new Date(this.userAttributes.last_login));
        //webengage.user.setAttribute('signup_type', );
        //x = new Date(a)
        webengage.user.setAttribute('RegistrationDate', new Date(this.userAttributes.registeredon));
        webengage.user.setAttribute('RegistrationDeviceType', this.userAttributes.register_device_type);
        webengage.user.setAttribute('RegistrationClientType', this.userAttributes.register_client_type);
        webengage.user.setAttribute('LastDepositDate', new Date(this.userAttributes.last_deposit_at));
        webengage.user.setAttribute('FirstWithdrawalDate', new Date(this.userAttributes.first_withdrawal_at));
        webengage.user.setAttribute('LastWithdrawalDate', new Date(this.userAttributes.last_withdrawal_at));
        webengage.user.setAttribute('totalDeposits', parseFloat(this.userAttributes.sumdeposit));
        webengage.user.setAttribute('totalWithdrawals', parseFloat(this.userAttributes.sumwithdrawl));
        webengage.user.setAttribute('totalNumberOfDeposits', parseFloat(this.userAttributes.deposits));
        webengage.user.setAttribute('totalNumberOfWithdrawals', parseFloat(this.userAttributes.withdrawls));

    }

    triggerEvent(event_name, data){
        webengage.track(event_name, data);
        if(event_name.toLowerCase() == "email verified"){
             webengage.user.setAttribute('EmailVerificationStatus', true);
        }
        if(event_name.toLowerCase() == "mobile verified"){
            webengage.user.setAttribute('MobileVerificationStatus', true);
        }
        if(event_name.toLowerCase() == "deposit success") {
            var depositNumber = data.depositNumber;
            if(depositNumber == 1){
                webengage.track("First Deposit Success", eventData);
            }
            else if(depositNumber == 2){
                webengage.track("Second Deposit Success", eventData);
            }
            else if(depositNumber == 3){
                webengage.track("Third Deposit Success", eventData);
            }
        }
    }
}


class MoengageEvent{
    setService(serviceObj){
        this.eventServiceObj = serviceObj;
        this.userId = serviceObj.user_id;
        this.userAttributes = serviceObj.user_data;
    }

    updateUserAttribute(attrName, attrValue){
        Moengage.add_user_attribute(attrName, attrValue);
    }

    registerEvent(){
        Moengage.add_unique_user_id(this.userId);
        Moengage.add_email( this.userAttributes.email);
        Moengage.add_mobile( this.userAttributes.mobile);
        var regData = {"userID" : this.userId,
                        'userEmailHash': this.userAttributes.email_hash,
                        'userMobileHash': this.userAttributes.mobile_hash, "Type": "Form"}
        if(this.userAttributes != undefined && this.userAttributes.reg_type != undefined && this.userAttributes.reg_type !=null){
            regData['Type'] = this.userAttributes.reg_type;
        }
        if(this.userAttributes != undefined && this.userAttributes.referrer != undefined && this.userAttributes.referrer !=null){
            regData['referrer'] = this.userAttributes.referrer;
        }
        Moengage.track_event("registrationSuccess", regData);
        Moengage.add_user_attribute('CurrentBalance', parseInt(this.userAttributes.realchips));

    }
    loginEvent(){
        var LoginData = {"userID" : this.userId,
                        'userEmailHash': this.userAttributes.email_hash,
                        'userMobileHash': this.userAttributes.mobile_hash, "Type": "Form",
        "totalNumberOfDeposits":  parseInt(this.userAttributes.deposits),
            "EmailVerificationStatus": this.userAttributes.verified,
            "MobileVerificationStatus": this.userAttributes.mobileverified || this.userAttributes.manual_mobile_verified,
            "KYC_STATUS": this.userAttributes.kycverified
        }
        if(this.userAttributes != undefined && this.userAttributes.reg_type != undefined && this.userAttributes.reg_type !=null){
            LoginData['Type'] = this.userAttributes.reg_type;
        }
        if(this.userAttributes != undefined && this.userAttributes.referrer != undefined && this.userAttributes.referrer !=null){
            LoginData['referrer'] = this.userAttributes.referrer;
        }
        Moengage.add_unique_user_id(this.userId);
        Moengage.track_event("loginSuccess", LoginData);
        if(this.userAttributes == undefined || this.userAttributes == null){
            return;
        }
        Moengage.add_email( this.userAttributes.email);
        Moengage.add_mobile( this.userAttributes.mobile);
        var Gender = this.userAttributes.gender.toLowerCase();
        if(Gender == "male"){
            Gender = "M";
        }
        else if(Gender == "female"){
            Gender = "F";
        }
        Moengage.add_gender(Gender);
        if(this.userAttributes.dob != null && this.userAttributes.dob != "None"){
            var dob_list = this.userAttributes.dob.split("-");
            Moengage.add_birthday(new Date(parseInt(dob_list[0]),parseInt(dob_list[1]),parseInt(dob_list[2]) ));
        }
        Moengage.add_first_name(this.userAttributes.firstname);
        Moengage.add_last_name( this.userAttributes.lastname);
        Moengage.add_user_attribute('city', this.userAttributes.city);
        Moengage.add_user_attribute('state', this.userAttributes.state);
        Moengage.add_user_attribute('pincode', this.userAttributes.zipcode);
        Moengage.add_user_attribute('RegisterationIP', this.userAttributes.creationip);
        Moengage.add_user_attribute('EmailVerificationStatus', this.userAttributes.verified);
        Moengage.add_user_attribute('MobileVerificationStatus', this.userAttributes.mobileverified || this.userAttributes.manual_mobile_verified);
        Moengage.add_user_attribute('KYC_STATUS', this.userAttributes.kycverified);
        Moengage.add_user_attribute('InactiveDays', this.userAttributes.last_login_days);
        if(this.userAttributes.first_deposit_date != undefined && this.userAttributes.first_deposit_date != null){
            Moengage.add_user_attribute('firstDepositDate', new Date(this.userAttributes.first_deposit_date));
        }
        if(this.userAttributes.last_login != undefined && this.userAttributes.last_login != null){
            Moengage.add_user_attribute('LastLoginDate', new Date(this.userAttributes.last_login));
        }
        Moengage.add_user_attribute('RegisterationDate', new Date(this.userAttributes.registeredon));
        if(this.userAttributes.last_deposit_at != undefined && this.userAttributes.last_deposit_at != null){
            Moengage.add_user_attribute('LastDepositDate', new Date(this.userAttributes.last_deposit_at));
        }
        if(this.userAttributes.first_withdrawal_at != undefined && this.userAttributes.first_withdrawal_at != null){
            Moengage.add_user_attribute('FirstWithdrawalDate', new Date(this.userAttributes.first_withdrawal_at));
        }
        if(this.userAttributes.last_withdrawal_at != undefined && this.userAttributes.last_withdrawal_at != null){
            Moengage.add_user_attribute('LastWithdrawalDate', new Date(this.userAttributes.last_withdrawal_at));
        }
        Moengage.add_user_attribute('totalDeposits', parseFloat(this.userAttributes.sumdeposit));
        Moengage.add_user_attribute('totalWithdrawals', parseFloat(this.userAttributes.sumwithdrawl));
        Moengage.add_user_attribute('totalNumberOfDeposits', parseInt(this.userAttributes.deposits));
        Moengage.add_user_attribute('totalNumberOfWithdrawals', parseInt(this.userAttributes.withdrawls));
        Moengage.add_user_attribute('CurrentBalance', parseFloat(this.userAttributes.realchips));
    }

    triggerEvent(event_name, data){
        if(event_name.toLowerCase() == "userBalanceUpdate"){
            Moengage.add_user_attribute('CurrentBalance', parseFloat(data.realchips));
        }else{
            Moengage.track_event(event_name, data);
        }
        if(event_name.toLowerCase() == "emailverified"){
             Moengage.add_user_attribute('EmailVerificationStatus', true);
        }
        if(event_name.toLowerCase() == "mobileverified"){
            Moengage.add_user_attribute('MobileVerificationStatus', true);
        }
        if(data.realchips != undefined ){
            Moengage.add_user_attribute('CurrentBalance', parseFloat(data.realchips));
        }
    }
}

class GoogleTagManagerDataTracker{
    setService(serviceObj){
        this.eventServiceObj = serviceObj;
        this.userId = serviceObj.user_id;
        this.userAttributes = serviceObj.user_data;
    }

    updateUserAttribute(attrName, attrValue){

    }

    registerEvent(){
        var regData = {"userID" : this.userId,
                        'userEmailHash': this.userAttributes.email_hash,
                        'userMobileHash': this.userAttributes.mobile_hash, "Type": "Form",
            "event": "registrationSuccess"}
        if(this.userAttributes != undefined && this.userAttributes.reg_type != undefined && this.userAttributes.reg_type !=null){
            regData['Type'] = this.userAttributes.reg_type;
        }
        if(this.userAttributes != undefined && this.userAttributes.referrer != undefined && this.userAttributes.referrer !=null){
            regData['referrer'] = this.userAttributes.referrer;
        }
        dataLayer.push(regData);
    }
    loginEvent(){

        var LoginData = {"userID" : this.userId,
                        'userEmailHash': this.userAttributes.email_hash,
                        'userMobileHash': this.userAttributes.mobile_hash, "Type": "Form",
        "totalNumberOfDeposits":  parseInt(this.userAttributes.deposits),
            "EmailVerificationStatus": this.userAttributes.verified,
            "MobileVerificationStatus": this.userAttributes.mobileverified || this.userAttributes.manual_mobile_verified,
            "KYC_STATUS": this.userAttributes.kycverified
        }
        if(this.userAttributes != undefined && this.userAttributes.reg_type != undefined && this.userAttributes.reg_type !=null){
            LoginData['Type'] = this.userAttributes.reg_type;
        }
        if(this.userAttributes != undefined && this.userAttributes.referrer != undefined && this.userAttributes.referrer !=null){
            LoginData['referrer'] = this.userAttributes.referrer;
        }
        LoginData['event'] = "loginSuccess";
        dataLayer.push({LoginData});
        if(this.userAttributes == undefined || this.userAttributes == null){
            return;
        }
        var Gender = this.userAttributes.gender.toLowerCase();
        if(Gender == "male"){
            Gender = "M";
        }
        else if(Gender == "female"){
            Gender = "F";
        }
        dataLayer.push({"gender": Gender})
        if(this.userAttributes.first_deposit_date != undefined && this.userAttributes.first_deposit_date != null){
            var ftdDate = new Date(this.userAttributes.first_deposit_date);
            dataLayer.push({'firstDepositDate': ftdDate});
        }
        dataLayer.push({'EmailVerificationStatus': this.userAttributes.verified});
        dataLayer.push({'MobileVerificationStatus':this.userAttributes.mobileverified || this.userAttributes.manual_mobile_verified});
        dataLayer.push({'KYC_STATUS': this.userAttributes.kycverified});
        if(this.userAttributes.last_login != undefined && this.userAttributes.last_login != null){
            dataLayer.push({'LastLoginDate': new Date(this.userAttributes.last_login) });
        }
        dataLayer.push({'RegistrationDate': new Date(this.userAttributes.registeredon)});
        if(this.userAttributes.last_deposit_at != undefined && this.userAttributes.last_deposit_at != null){
            dataLayer.push({'LastDepositDate':new Date(this.userAttributes.last_deposit_at) } );
        }
        if(this.userAttributes.first_withdrawal_at != undefined && this.userAttributes.first_withdrawal_at != null){
            dataLayer.push({'FirstWithdrawalDate': new Date(this.userAttributes.first_withdrawal_at)});
        }
        if(this.userAttributes.last_withdrawal_at != undefined && this.userAttributes.last_withdrawal_at != null){
            dataLayer.push({'LastWithdrawalDate': new Date(this.userAttributes.last_withdrawal_at)});
        }
        dataLayer.push({'totalDeposits' : parseFloat(this.userAttributes.sumdeposit)});
        dataLayer.push({'totalWithdrawals':parseFloat(this.userAttributes.sumwithdrawl)});
        dataLayer.push({'totalNumberOfDeposits': parseFloat(this.userAttributes.deposits)});
        dataLayer.push({'totalNumberOfWithdrawals': parseFloat(this.userAttributes.withdrawls)});

    }

    triggerEvent(event_name, data){
        dataLayer.push(data);
    }
}


class FacebookDataTracker{
    setService(serviceObj){
        this.eventServiceObj = serviceObj;
        this.userId = serviceObj.user_id;
        this.userAttributes = serviceObj.user_data;
    }

    updateUserAttribute(attrName, attrValue){
    }

    registerEvent(){
        var regData = {"userID" : this.userId,
                        'userEmailHash': this.userAttributes.email_hash,
                        'userMobileHash': this.userAttributes.mobile_hash, "Type": "Form",
            "event": "registrationSuccess"}
        if(this.userAttributes != undefined && this.userAttributes.reg_type != undefined && this.userAttributes.reg_type !=null){
            regData['Type'] = this.userAttributes.reg_type;
        }
        if(this.userAttributes != undefined && this.userAttributes.referrer != undefined && this.userAttributes.referrer !=null){
            regData['referrer'] = this.userAttributes.referrer;
        }
        fbq('trackSingle', '2338019006486919', 'CompleteRegistration', {}, { "eventID": this.userId });
        fbq('trackSingle', '563296474568716', 'CompleteRegistration', {}, { "eventID": this.userId });
    }
    loginEvent(){

        fbq('trackSingleCustom', '563296474568716', 'loginSuccess', {}, { "eventID": this.userId });
        fbq('trackSingleCustom', '2338019006486919', 'loginSuccess', {}, { "eventID": this.userId });

    }

    triggerEvent(event_name, data){

        if(event_name.toLowerCase() == "ftdsuccess"){
            fbq('trackSingle', '563296474568716', 'Purchase', {
					value: parseFloat(data.Amount),
					currency: 'INR',
				}, { "eventID": data.transaction_id });
            fbq('trackSingle', '2338019006486919', 'Purchase', {
					value: parseFloat(data.Amount),
					currency: 'INR',
				}, { "eventID": data.transaction_id });
        }
        else if(event_name.toLowerCase() == "repeatdepositsuccess"){
            fbq('trackSingleCustom', '563296474568716', 'Repeat_Purchase', {
					value: parseFloat(data.Amount), //Dynamic Value
					currency: 'INR',
				}, { "eventID": data.transaction_id });
            fbq('trackSingleCustom', '2338019006486919', 'Repeat_Purchase', {
					value: parseFloat(data.Amount), //Dynamic Value
					currency: 'INR',
				}, { "eventID": data.transaction_id });
        }
        else if(event_name.toLowerCase() == "kycuploaded"){
            fbq('trackSingleCustom', '563296474568716', 'kycCompleted');
            fbq('trackSingleCustom', '2338019006486919', 'kycCompleted');
        }

        else if(event_name.toLowerCase() == "paymentinitiate" ){

            var playerdepositcount = data.depositNumber;
            if (playerdepositcount != undefined && playerdepositcount.toString() == "1") {
                // fbq('track', 'InitiateCheckout',{currency:"INR", value:parseInt(a), payment_method:s,bonus_code:r});
                fbq('trackSingle', '563296474568716 ', 'AddToCart', {
                    value: parseFloat(data.Amount), //Dynamic Value
                    currency: 'INR',
                });
                fbq('trackSingle', '2338019006486919 ', 'AddToCart', {
                    value: parseFloat(data.Amount), //Dynamic Value
                    currency: 'INR',
                });
                //fbq('track', 'AddPaymentInfo',{paymentType:s, value:parseInt(a)});

						}
            else {
                // fbq('track', 'InitiateCheckout',{currency:"INR", value:parseInt(a), payment_method:s,bonus_code:r});
                fbq('trackSingleCustom', '563296474568716 ', 'AddToCartRepeatDeposit', {
                    value: parseFloat(data.Amount), //Dynamic Value
                    currency: 'INR',
                });
                fbq('trackSingleCustom', '2338019006486919 ', 'AddToCartRepeatDeposit', {
                    value: parseFloat(data.Amount), //Dynamic Value
                    currency: 'INR',
                });
            }
        }
        else if(event_name.toLowerCase() == "initiatewithdrawal" ){
            fbq('trackSingleCustom', '563296474568716', 'withdrawRequested', {
                  value: parseFloat(data.Amount), //Dynamic Value
                  currency: 'INR',
                });
                fbq('trackSingleCustom', '2338019006486919', 'withdrawRequested', {
                  value: parseFloat(data.Amount), //Dynamic Value
                  currency: 'INR',
                });
        }
        else{
            fbq('trackSingleCustom', '563296474568716', event_name);
            fbq('trackSingleCustom', '2338019006486919', event_name);
        }
    }
}
