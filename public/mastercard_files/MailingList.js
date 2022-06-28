define('App/MailingList',function(){return MailingList={SelectedMailIDs:new Array(),ValidateSubscribe:function(){var isTextValid=true;var isValid=false;var hdnchkmail=$("input[id$=hdnchkmail]").val();if(hdnchkmail.length>0){MailingList.SelectedMailIDs.push(hdnchkmail);}
var tmpEmail=$("input[id$=txtEmail]").val();isTextValid=MailingList.CheckEmail(tmpEmail);if((isTextValid==true)&&(MailingList.SelectedMailIDs.length>0)){$('#divMsg').html('');isValid=true;}
else if((isTextValid==true)&&(MailingList.SelectedMailIDs.length==0)){$('#divMsg').html(MartJack.Assets.Resources.get("MailList-AtleastOneChecked"));}
else if((isTextValid==false)&&(MailingList.SelectedMailIDs.length>0)){$('#divMsg').html(MartJack.Assets.Resources.get("MailList-ValidateEmail"));}
else{$('#divMsg').html(MartJack.Assets.Resources.get("MailList-AtleastOneOption"));}
return isValid;},CheckValid:function(id,selval){if(document.getElementById(id).checked){MailingList.SelectedMailIDs.push(selval);}
else{MailingList.RemoveByElement(MailingList.SelectedMailIDs,selval);}},ValidateSubscribeEmailid:function(b){if(!Page_ClientValidate("Required")){return false;}
else{return true}},RemoveByElement:function(arrayName,arrayElement){for(var i=0;i<arrayName.length;i++){if(arrayName[i]==arrayElement)
arrayName.splice(i,1);}},SaveSubscribe:function(){if(MailingList.ValidateSubscribe()){var tmpEmail=$("input[id$=txtEmail]").val();$.ajax({type:"GET",url:MartJack.Config.HandlerPaths.get("MailingListHandler")+"?mail="+tmpEmail+"&mailitems="+MailingList.SelectedMailIDs.join(),async:false,dataType:"json",success:function(msg){try{if(typeof MartJack.Config.Analytics!="undefined"&&typeof MartJack.Config.Analytics.GaProfileId!="undefined"&&MartJack.Config.Analytics.GaProfileId!=""){require(['App/Widgets/GaWidget','Entities/Entities'],function(GaWidget){GaWidget();if($('body').data('ui-GaWidget')){$('body').GaWidget('RecordCustomEvent','Subscribe To List','','Submit',ControlCaption,MailingList.SelectedMailIDs.join());}});}}
catch(e){}
if(msg==1){jAlert(Mailinglist_Succmsg1);$("input[id$=txtEmail]").val("");var arrselectedmailitems;arrselectedmailitems=MailingList.SelectedMailIDs
for(var i=0;i<arrselectedmailitems.length;i++){$("#"+arrselectedmailitems[i]).removeAttr("checked");}
MailingList.SelectedMailIDs=new Array();}
else{jAlert(Mailinglist_Succmsg2);$("input[id$=txtEmail]").val("");var arrselectedmailitems=MailingList.SelectedMailIDs
for(var i=0;i<arrselectedmailitems.length;i++){$("#"+arrselectedmailitems[i]).removeAttr("checked");}
MailingList.SelectedMailIDs=new Array();}}});}
else{return false;}},CheckEmail:function(tmpEmail){var email=$("input[id$=txtEmail]");var filter=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;if(filter.test(tmpEmail)){email.focus;return true;}
else{return false;}},ResetLocalValue1:function(i){var txtmail=$("input[id$=txtEmail]").val();if(i.value==txtmail){i.value='';}},ResetValue1:function(i){var hdnmail=$("input[id$=hndText]").val();if(i.value==''){i.value=hdnmail;}}}});