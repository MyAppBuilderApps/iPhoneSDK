
document.addEventListener("deviceready", onDeviceReady, false);
var akey ;
function goOnline(){
    akey=$.ajax({url: "key.txt",async: false}).responseText;
    Check($.trim(akey.toLowerCase()));
}
function offline(){
  $('#login').activity({segments: 8, width: 5, space: 12, length:15, color: 'black', speed: 2});
   navigator.notification.alert("Please Connect Your 3G or Wifi Connection");
  $('#login').activity(false);
}
function onConnectionCheck() {
    var networkState = navigator.network.connection.type;
    var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';
        if (states[networkState] == 'No network connection') {
          offline();
        }else{
          goOnline();
        }
  }
function onDeviceReady() {
    onConnectionCheck();
    $(document).on('pageshow', '#icons', function(event) {
        iconsFunction();
    });
    $(document).on('pageshow', '#information', function(event) {
        informationFun();
    });

    $(document).on('pageshow', '#rss', function(event) {
        rss_contentFun();

    });
    $(document).on('pageshow', '#rsscontentPage', function(event) {
        rss_contentPageFun();
    });

    $(document).on('pageshow', '#video', function(event) {
        videoFunc();
    });
    $(document).on('pageshow', '#audio', function(event) {
        audioFunc();
    });
    $(document).on('pageshow', '#text', function(event) {
        textFunc();
    });

    $(document).on('pageshow', '#textcontent', function(event) {
        
        text1Func();
    });


    $(document).on('pageshow', '#contact_form', function(event) {
       contact_formFunc();
    });

    $(document).on('pageshow', '#web_page', function(event) {
       web_pageFunc();
    });

    $(document).on('pagehide', '#icons', function(event, ui){
        //$(event.target).refresh();
        $('#linksList').empty();
        $('#clear img').empty();
        $('#info img').empty();
        $('#clear img').off('click');
        $('#info img').off('click');
        $('#linksList img').off('click');
    });

    $(document).on('pagehide', '#information', function(event, ui){
        $('#back img').empty();
        $('#back img').off('click');
    });

    $(document).on('pagehide', '#rss', function(event, data){
        $('#rssback img').empty();
        $('#rssback img').off('click');
        $('.rsscontentLink').empty();
        $('.rsscontentLink').off('click');
    });
    $(document).on('pagehide', '#rsscontentPage', function(event,data) {
        $('#rsscontentPageback img').empty();
        $('#rsscontentPageback img').off('click');
        $('#rssentryText').empty();
    });

    $(document).on('pagehide', '#video', function(event,data) {
        $('#videoback img').empty();
        $('#videoback img').off("click");
        $('#videoppt').empty();
        $('#videoppt div').off('click');
    });

    $(document).on('pagehide', '#audio', function(event,data) {
        $('#audioback img').empty();
        $('#audioback img').off("click");
        $('#audioppt').empty();
        $('#audioppt div').off('click');
    });
    
    $(document).on('pagehide', '#text', function(event,data) {
        $('#textback img').empty();
        $('#textback img').off("click");
        $('#textListview').empty();
        $('#textListview li').off('click');
    });

    $(document).on('pagehide', '#textcontent', function(event,data) {
        $('#textcontentback img').empty();
        $('#textcontentback img').off("click");
        $('#textcontentnext').off("click");
        $('#textcontentpre').off("click");
        $('#textcontentnext').val("");
        $('#textcontentpre').off("");
        $('#contentNext').empty();
        $('#contentPre').empty();
        $('#contentNext').off('click');
        $('#contentPre').off('click');
        $('#textcontentheading').empty();
        $('#textcontentTitle').empty();
        $('#textcontentText').empty();
        $('#textcontentPrice').empty();
    });

    $(document).on('pagehide', '#contact_form', function(event,data) {
        $('#contactback img').empty();
        $('#contactback img').off("click");
        $('#contactsubject').val("");
        $('#contactbody').val("");
        $('#sendMail').off('click');
    });   

    $(document).on('pagehide', '#web_page', function(event,data) {
       $('#web_pageback img').empty();
        $('#web_pageback img').off("click");
    }); 





    $('#map').on('pageshow', function() {
        document.getElementById("mapheading").innerHTML=results.title;
        document.getElementById("mapaddress").value=mapAddress;
        $('#mapback img').click(function(){
            $.mobile.changePage( "#icons",{transition: "slide",reverse: true});
        });
        
        $('#mapButton').click(function(){
            codeAddress();
        });             
                
                
                function codeAddress() {
                    var address = document.getElementById('mapaddress').value;
                    geocoder.geocode( { 'address': address}, function(results, status) {
                                     if (status == google.maps.GeocoderStatus.OK) {
                                     map.setCenter(results[0].geometry.location);
                                     var marker = new google.maps.Marker({
                                                                         map: map,
                                                                         position: results[0].geometry.location
                                                                         });
                                     } else {
                                     alert('Geocode was not successful for the following reason: ' + status);
                                     }
                                     });
                }
                
     });

    $(document).on('pagehide', '#map', function(event,data) {
        $('#mapback img').empty();
        $('#mapback img').off("click");
        $('#mapButton').off("click");
    }); 

}

var contentText;
var results;
var buttons;
var bg;
var filepath;
var frame= "img/frame.png";
var idvalue
var geocoder;
var map;
var mobileDemo = { 'center': '57.7973333,12.0502107', 'zoom': 10 };
/*function generalsearchgo(){

    akey = document.getElementById("appkey").value.toLowerCase();
    if(localStorage.appkey1==""){
        localStorage.appkey1= 0;
        navigator.notification.alert("Enter App Key");
    }
    else if(localStorage.appkey1== undefined){
        navigator.notification.alert("Undefined App Key");
    }
    else{
        Check(akey);
    }
}*/

function Check(val){
    $('#login').activity({segments: 8, width: 5, space: 12, length:15, color: 'black', speed: 2});
     $('#icons').activity({segments: 8, width: 5, space: 12, length:15, color: 'black', speed: 2});
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
        function (fs)
        {   
            filepath=fs.root.fullPath;
            var url = "http://build.myappbuilder.com/api/apps/"+val;
            var a = "/Data.json";
            var Path = fs.root.fullPath +a;
            contentText = $.ajax({url: Path,async: false}).responseText;
           //if(contentText == '') {
                var fileTransfer1 = new FileTransfer();

                fileTransfer1.download(url, Path,
                    function (entry)
                    {
                        contentText = $.ajax({url: entry.fullPath,async: false}).responseText;
                        results = $.parseJSON(contentText);
                        buttons = results.buttons;
                        
                        $.each( buttons, function (index, value){
                              var icurl = value["image"];
                              var icPath = fs.root.fullPath+"/MyAppBuilder/"+value["position"]+".png";
                              var fileTrans1 = new FileTransfer();

                              fileTrans1.download(icurl, icPath, function (entry) {
                                  console.log("success"+buttons.length);
                                  
                                },
                                function (error) {
                                  console.log("Some error");
                                }
                              );
                        });

                        timeOut=setTimeout(function() {
                              $('#login').activity(false);
                              $('#icons').activity(false);
                              $.mobile.changePage( "#icons",{transition: "fade",reverse: false});
                        }, 5000);
                        
                    },
                    function (error) 
                    {
                        console.log("download error source " + error.source);
                        console.log("download error target " + error.target);
                        console.log("upload error code" + error.code);
                        console.log("http_status = " + error.http_status);
                        $('#login').activity(false);
                        localStorage.clear();
                        navigator.notification.alert("Invalid Key");
                    }
                );
          /* }else{
                results = $.parseJSON(contentText);
                buttons = results.buttons;
                if(buttons.length >= 0){
                    $('#login').activity(false);
                    $.mobile.changePage( "#icons",{transition: "slide",reverse: false});
                }else{
                    $('#login').activity(false);
                    $.mobile.changePage( "#icons",{transition: "slide",reverse: false});
                }
           }*/
        }
    );
}

function iconsFunction()
{

    $('.bg').css('background-image','url("img/bg.png")'); 
    $('.hd').css('background-image','url("img/nav_bar.png")');
    $('.hd').css('background-size','100%','100%');
    $('.hd').css('background-repeat','repeat-x');
    $('.hd').css('height','55px') ;
    $('.hd').css('text-align','center');
    $('.hd').css('color','#51C4D4');
    $('.img').css('width','100%');
    
    
    document.getElementById("title").innerHTML=results.title;
    function confirm(button1){
        if(button1==1){
            contentText="";
            onConnectionCheck();
            //$.mobile.changePage( "#login",{transition: "slide",reverse: true});
        }
        else{
            $.mobile.changePage( "#icons",{transition: "slide",reverse: false});
        }
    }

    $('#clear img').click(function(){
        navigator.notification.confirm("This will clear your Current App Key.Do you want to continue?",confirm,"Please Confirm",["Yes","No"]);
    });
                                      
    $('#info img').click(function(){
        $.mobile.changePage( "#information",{transition: "slide",reverse: false});
    });
                                      
    $.each( buttons, function (index, value){
          imagescr =filepath+'/MyAppBuilder/'+value["position"]+'.png';
          if((value["position"]%2)!=0){
                                         
              $('#linksList').append('<div class="ui-block-a" align="center" style="height: 80px; text-align:center; background-image: url(' + frame + ');background-position: center; background-size: contain; background-repeat: no-repeat; margin: 1% 0% 20% 0%"><img id='+value["position"]+' src='+imagescr+'  style="height: 35px; width: 35px; margin-top:15px; margin-left:14px"/><br><br><br><b id='+value["position"]+' style="margin-top:12px; margin-left:16px">'+value["title"]+'</b></div>');
                                         
          }
          else{
              $('#linksList').append('<div class="ui-block-b" align="center" style="height: 80px; text-align:center; background-image: url(' + frame + ');background-position: center; background-size: contain; background-repeat: no-repeat; margin: 1% 0% 20% 0%"><img id='+value["position"]+' src='+imagescr+'  style="height: 35px; width: 35px; margin-top:15px; margin-left:14px"/><br><br><br><b id='+value["position"]+' style="margin-top:12px; margin-left:16px">'+value["title"]+'</b></div>');
                                         
          }
                                         
    });
    

    $('#linksList img').click(function(){
                    var i = (this.id-1);
                    txtContent=buttons[i].elements[0].content_type;
                    
                    if(txtContent=="rss_feed"){

                        rssUrl=buttons[i].elements[0].rss_url;
                        rssTitle=buttons[i].elements[0].title;
                        entries = [];
                        $.mobile.changePage( "#rss",{transition: "slide",reverse: false});
                    }
                    else if(txtContent=="video"){
                        videoTitle=buttons[i].elements[0].title;
                        videoText=buttons[i].elements[0].text;
                        videoUrl=buttons[i].elements[0].video.url;
                        videoThumbnail=buttons[i].elements[0].video.thumbnail;
                        checkIfFileExists(filepath+"/MyAppBuilder/"+videoTitle+".png");
                    }
                    else if(txtContent == "audio"){
                        audioTitle=buttons[i].elements[0].title;
                        audioText=buttons[i].elements[0].text;
                        audioUrl=buttons[i].elements[0].audio.url;
                        audioThumbnail=buttons[i].elements[0].audio.thumbnail;
                        checkIfFileExists(filepath+"/MyAppBuilder/"+audioTitle+".png");
                    }
                    else if(txtContent=="contact_form"){
                        contact_formTitle=buttons[i].elements[0].title;
                        contact_formEmail=buttons[i].elements[0].email;
                        $.mobile.changePage( "#contact_form",{transition: "slide",reverse: false});
                    }
                    else if(txtContent=="web_page"){
                        web_pageTitle=buttons[i].elements[0].title;
                        web_pageText=buttons[i].elements[0].text;
                        web_pageUrl=buttons[i].elements[0].live_url;
                        $.mobile.changePage( "#web_page",{transition: "slide",reverse: false});
                    }
                    else if(txtContent=="map"){
                        mapAddress=buttons[i].elements[0].addresses[0].address;
                        $.mobile.changePage( "#map",{transition: "slide",reverse: false});
                        //document.location.href="map.html"
                    }
                    else{

                        textTitle=buttons[i].title;
                        textPage = buttons[i].elements.length;
                        
                        textElement = buttons[i].elements;
                        if(textPage > 1){
                            $.mobile.changePage( "#text",{transition: "slide",reverse: false});
                        }
                        else{
                            textTitle1=buttons[i].elements[0].title;
                            textText1=buttons[i].elements[0].text;
                            textPrice1=buttons[i].elements[0].price
                            $.mobile.changePage( "#textcontent",{transition: "slide",reverse: false});
                        }
                    }
    });

}

function checkIfFileExists(path){ 
  
   $.ajax({url: path,success: function(data){
        if(txtContent=="video"){
            $.mobile.changePage( "#video",{transition: "slide",reverse: false});
        }
        else{
            $.mobile.changePage( "#audio",{transition: "slide",reverse: false});
        }
      },error:function(data){
          if(txtContent=="video"){
              window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                    imagePath = fs.root.fullPath +"/MyAppBuilder/"+videoTitle+".png";
                    var fileTransfer2 = new FileTransfer();
                    fileTransfer2.download(videoThumbnail, imagePath, function (entry) {
                            videofullpath=fs.root.fullPath;
                            videopath=entry.fullPath;
                            $.mobile.changePage( "#video",{transition: "slide",reverse: false});
                      }, 
                      function (error) { 
                        console.log("Some error");                                                                                         
                      }
                    );
              });
          }
          else{
              window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                    imagePath = fs.root.fullPath +"/MyAppBuilder/"+audioTitle+".png";
                    var fileTransfer3 = new FileTransfer();
                    fileTransfer3.download(audioThumbnail, imagePath, function (entry) {
                            audiofullpath=fs.root.fullPath;
                            audiopath=entry.fullPath;
                            $.mobile.changePage( "#audio",{transition: "slide",reverse: false});
                      }, 
                      function (error) { 
                        console.log("Some error");                                                                                         
                      }
                    );
              });
          }
        }
    });


}

function informationFun(){
  
  $('#back img').click(function(){
    $.mobile.changePage( "#icons",{transition: "slide",reverse: true});
  });
  document.getElementById("heading").innerHTML=results.title;
  document.getElementById("description").innerHTML=results.description;
  document.getElementById("author").innerHTML=results.author;
  document.getElementById("about_author").innerHTML=results.about_author;
  document.getElementById("copyright").innerHTML=results.copyright;
  document.getElementById("price").innerHTML=results.price;
}

function renderEntries(entries) {

                    var s = '';
                    $.each(entries, function(i, v) {
                           s += '<li><a href="#rsscontentPage" class="rsscontentLink" data-entryid="'+i+'">' + v.title + '</a></li>';
                           });
                    $("#rsslistview").html(s);
                    $("#rsslistview").listview("refresh");
                    $('#rss').activity(false);
                    $(".rsscontentLink").click(function() {
                        selectedEntry = $(this).data("entryid");
                        
                    });
 }
entries = [];
function rss_contentFun(){
      document.getElementById("rssheading").innerHTML=results.title;
      document.getElementById("rsstitle").innerHTML=rssTitle;

      $('#rssback img').click(function(){
          $.mobile.changePage( "#icons",{transition: "slide",reverse: true});
      });

      
      if(entries.length <=0){
          $('#rss').activity({segments: 8, width: 5, space: 6, length:7, color: 'black', speed: 2});
          $.ajax({url:rssUrl,success:function(res,code) {
                      entries = [];
                      var xml = $(res);
                      var items = xml.find("item");
                      $.each(items, function(i, v) {
                          entry = {
                                    title:$(v).find("title").text(),
                                    link:$(v).find("link").text(),
                                    description:$.trim($(v).find("description").text())
                                  };
                          entries.push(entry);
                      });
                      renderEntries(entries);
                },
                error:function(jqXHR,status,error) {
                      
                      if(entries) {
                                $("#rssstatus").html("Using cached version...");
                                $('#rss').activity({segments: 8, width: 5, space: 6, length:7, color: 'black', speed: 2});
                                renderEntries(entries);
                      } else {
                                $("#rssstatus").html("Sorry, we are unable to get the RSS and there is no cache.");
                      }
                }
          });
      }else{
        $('#rss').activity({segments: 8, width: 5, space: 6, length:7, color: 'black', speed: 2});
        renderEntries(entries);
      }

}

function rss_contentPageFun(){
    document.getElementById("rsscontentPageheading").innerHTML=results.title;
    $('#rsscontentPageback img').click(function(){
          $.mobile.changePage( "#rss",{transition: "slide",reverse: true});
    });

    
                
   document.getElementById("rsscontentPageHeading1").innerHTML=entries[selectedEntry].title;
    var contentHTML = "";
    contentHTML +='<p>'+entries[selectedEntry].description+'</p>';
    contentHTML += '<p/><div id="rssurl"><a id="'+entries[selectedEntry].link + '" href="#">Read Entry on Site</a></div>';
    $("#rssentryText").html(contentHTML);
    function iabLoadStart(event) {
        //$('#rsscontentPage').activity({segments: 8, width: 5, space: 6, length:7, color: 'black', speed: 2});
        console.log(event.type + ' - ' + event.url);
    }
            
    function iabLoadStop(event) {
        console.log(event.type + ' - ' + event.url);
    }
            
    function iabLoadError(event) {
        console.log(event.type + ' - ' + event.message);
    }
    function iabClose(event) {
        
    }
    $('#rssurl a').click(function(){
            iabRef = window.open(this.id, '_blank', 'location=no');
            iabRef.addEventListener('loadstart', iabLoadStart);
            iabRef.addEventListener('loadstop', iabLoadStop);
            iabRef.removeEventListener('loaderror', iabLoadError);
            iabRef.addEventListener('exit', iabClose);
    });
                
    
}

function videoplay(video1){
  $('#video').activity(false);
  portrait="NO";
  CDVVideo.play(video1, portrait);
}
function checkIfVideoFileExists(path){
  $.ajax({url: path,success: function(data){
    videoplay(filepath+"/MyAppBuilder/"+videoTitle+".mp4");
    },
    error: function(data){
   
      $('#video').activity({segments: 8, width: 5, space: 12, length:15, color: 'black', speed: 2});
                              var url = videoUrl;
                              var imagePath;
                              
                              window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                                imagePath = fs.root.fullPath +"/MyAppBuilder/"+videoTitle+".mp4";
                                var fileTransfer4 = new FileTransfer();
                                fileTransfer4.download(url, imagePath, function (entry) {
                                    videoplay(entry.fullPath);
                                }, function (error) {
                                console.log("Some error");
                                });
                                                       
                                })
  },
})
}

function videoFunc(){

        document.getElementById("videoheading").innerHTML=results.title;
        document.getElementById("videoTitle").innerHTML=videoTitle;
        document.getElementById("videoText").innerHTML=videoText;
        $('#videoback img').click(function(){
                 $.mobile.changePage( "#icons",{transition: "slide",reverse: true});
        });
        var videofilepath =filepath+"/MyAppBuilder/"+videoTitle+".png";
        $('#videoppt').append('<div><img src="'+videofilepath+'" style="height: 100px; width: 100px; align:center;"/><div>');

        $('#videoppt div').click(function(){
            checkIfVideoFileExists(filepath+"/MyAppBuilder/"+videoTitle+".mp4");
        });
}


function audioplay(audio){
  $('#audio').activity(false);
    portrait="NO";
    CDVVideo.play(audio, portrait)
}
function checkIfAudioFileExists(path){
  $.ajax({url: path,success: function(data){
    audioplay(filepath+"/MyAppBuilder/"+audioTitle+".mp3");
    },
    error: function(data){
   
      $('#audio').activity({segments: 8, width: 5, space: 12, length:15, color: 'black', speed: 2});
                              var url = audioUrl;
                              var imagePath;
                              
                              window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                                imagePath = fs.root.fullPath +"/MyAppBuilder/"+audioTitle+".mp3";
                                var fileTransfer5 = new FileTransfer();
                                fileTransfer5.download(url, imagePath, function (entry) {
                                    audioplay(entry.fullPath);
                                }, function (error) {
                                console.log("Some error");
                                });
                                                       
                                })
  },
})
}
function audioFunc(){

        document.getElementById("audioheading").innerHTML=results.title;
        document.getElementById("audioTitle").innerHTML=audioTitle;
        document.getElementById("audioText").innerHTML=audioText;
        $('#audioback img').click(function(){
                 $.mobile.changePage( "#icons",{transition: "slide",reverse: true});
        });
        var audiofilepath =filepath+"/MyAppBuilder/"+audioTitle+".png";
        $('#audioppt').append('<div><img src="'+audiofilepath+'" style="height: 100px; width: 100px; align:center;"/><div>');

       $('#audioppt div').click(function(){
                      checkIfAudioFileExists(filepath+"/MyAppBuilder/"+audioTitle+".mp3");
        });
}

function textFunc(){
        document.getElementById("textheading").innerHTML=results.title;
        document.getElementById("textTitle").innerHTML=textTitle;
       
        $('#textback img').click(function(){
                 $.mobile.changePage( "#icons",{transition: "slide",reverse: true});
        });

        $.each(textElement, function (index, value){
              $('#textListview').append('<li id="'+value["position"]+'"><a>' + value["title"] + '</a></li>');
        });
        $("#textListview").listview("refresh");

        $("#textListview li").click(function(){
                idvalue = (this.id-1);

                textTitle1=textElement[idvalue].title;
                textText1=textElement[idvalue].text;
                textPrice1=textElement[idvalue].price;
                $.mobile.changePage( "#textcontent",{transition: "slide",reverse: false});
        });
                                                          
}

function text1Func(){
        document.getElementById("textcontentheading").innerHTML=results.title;
        document.getElementById("textcontentTitle").innerHTML=textTitle1;
        document.getElementById("textcontentText").innerHTML=textText1;
        document.getElementById("textcontentPrice").innerHTML="Price :"+textPrice1;
        $('#contentPre').html('<div><button id="textcontentpre">PREV</button></div>').trigger("create");
        $('#contentNext').html('<div><button id="textcontentnext">NEXT</button></div>').trigger("create");

        $('audio,video').bind('play', function() {
          activated = this;

          $('audio,video').each(function() {
            if(this != activated) this.pause();
          });
        });


        
        $('#textcontentback img').click(function(){
                 $.mobile.changePage( "#icons",{transition: "slide",reverse: true});
        });

        if(textPage==1){
          $('#contentPre').hide();
          $('#contentNext').hide();
        }
        else{
              if(idvalue==0){
                  $('#contentPre').hide();
                  
              }
              else{
                  $('#contentPre').show();
              }
              if(idvalue==textPage-1){
                  $('#contentNext').hide();
              }
               else{
                  $('#contentNext').show();
              }
        }

        $('#textcontentnext').click(function(){
                
                idvalue=idvalue+1;
                document.getElementById("textcontentTitle").innerHTML=textElement[idvalue].title;
                document.getElementById("textcontentText").innerHTML=textElement[idvalue].text;
                document.getElementById("textcontentPrice").innerHTML="Price :"+textElement[idvalue].price;
                
                
                if(textPage==1){

                  $('#contentNext').hide();
                  $('#contentPre').hide();
                }
                else{
                      if(idvalue==0){
                          $('#contentPre').hide();
                          
                      }
                      else{
                          $('#contentPre').show();
                      }
                      if(idvalue==textPage-1){
                          $('#contentNext').hide();
                      }
                       else{
                          $('#contentNext').show();
                      }
                }
               
        });
        $('#textcontentpre').click(function(){
          
                idvalue=idvalue-1;
                document.getElementById("textcontentTitle").innerHTML=textElement[idvalue].title;
                document.getElementById("textcontentText").innerHTML=textElement[idvalue].text;
                document.getElementById("textcontentPrice").innerHTML="Price : "+textElement[idvalue].price;
                
                if(textPage==1){
                  $('#contentNext').hide();
                  $('#contentPre').hide();
                }
                else{
                      if(idvalue==0){
                          $('#contentPre').hide();
                          
                      }
                      else{
                          $('#contentPre').show();
                      }
                      if(idvalue==textPage-1){
                          $('#contentNext').hide();
                      }
                       else{
                          $('#contentNext').show();
                      }
                }
                
        });                                    
        
}



function contact_formFunc(){
        document.getElementById("contactheading").innerHTML=results.title;
        document.getElementById("contactTitle").innerHTML=contact_formTitle;
       
        $('#contactback img').click(function(){
                 $.mobile.changePage( "#icons",{transition: "slide",reverse: true});
        });
       $('#sendMail').click(function(){
            var subject=document.getElementById("contactsubject").value;
            var emailTextBody = document.getElementById("contactbody").value;
            var mail = contact_formEmail;
            //window.plugins.emailComposer.showEmailComposerWithCallback(function(result){alert(result);},[],subject,emailTextBody,[mail],[],[],true,[]);
            window.plugins.emailComposer.showEmailComposerWithCallback(function(result){if(result == 2){navigator.notification.alert("Mail has been send");}else if(result == 1){navigator.notification.alert("Please Connect Your 3G or Wifi Connection");}},subject,emailTextBody,[mail],[],[],true,[]);
        
                                  
        });
}


function web_pageFunc(){
        document.getElementById("web_pageheading").innerHTML=results.title;
        document.getElementById("web_pageTitle").innerHTML=web_pageTitle;
        document.getElementById("web_pageText").innerHTML=web_pageText;
        document.getElementById("web_pageurl").innerHTML=web_pageUrl;
        $('#web_pageback img').click(function(){
                 $.mobile.changePage( "#icons",{transition: "slide",reverse: true});
        });

    function iabLoadStart1(event) {
        console.log(event.type + ' - ' + event.url);
        
    }
    function iabLoadStop1(event) {
        console.log(event.type + ' - ' + event.url);
    }
            
    function iabLoadError1(event) {
        console.log(event.type + ' - ' + event.message);
    }
    function iabClose1(event) {
        
    }

    $('#web_pageurl').click(function(){
            iabRef1 = window.open(web_pageUrl, '_blank', 'location=no');
            iabRef1.addEventListener('loadstart', iabLoadStart1);
            iabRef1.addEventListener('loadstop', iabLoadStop1);
            iabRef1.removeEventListener('loaderror', iabLoadError1);
            iabRef1.addEventListener('exit', iabClose1);
    });
}
