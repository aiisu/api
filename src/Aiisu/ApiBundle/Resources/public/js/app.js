/**
 * Created by kabocha on 2016/11/15.
 */

var myModule = angular.module('hatsuwa',['ngMaterial'])
    .controller('BaseCtrl',['$rootScope','$http','$httpParamSerializerJQLike',BaseCtrl]);

myModule.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

function BaseCtrl($rootScope, $http, $httpParamSerializerJQLike) {

    $rootScope.clickedrecognitions = [];
    $rootScope.newrecognitions = [];
    $rootScope.oldrecognitions = [];
    $rootScope.datarecognitions = [];
    $rootScope.searchresults=[];
    var isRunHttp = false;
    var isMainShowed = false;
    var isFirst = true;
    var resultArray = [];

    $rootScope.mic_click=function () {
        var word = document.getElementById("buttonword");
        if ((!isRunHttp) && isFirst){
            var mic = document.getElementById("mic");
            word.innerHTML='Please Speak Something';
            mic.innerHTML='mic';
            toggleRecording( true );
            isRunHttp = true;
            return;
        }
        if(!isRunHttp){
            toggleRecording( true );
            isRunHttp = true;
            word.innerHTML = "Stop";
        }else{
            toggleRecording( false );
            isRunHttp = false;
            word.innerHTML = "Start";
        }


    };
    function showMain() {
        var startButton = document.getElementById("buttonstart");
        var word = document.getElementById("buttonword");
        var mic = document.getElementById("mic");
        var leftPain = document.getElementById("leftpain");
        var rightPain = document.getElementById("rightpain");
        startButton.style.bottom = "3%";
        startButton.style.right = "3%";
        startButton.style.width = "100px";
        startButton.style.backgroundColor = "#3F51B5";
        word.innerHTML = "Stop";
        word.style.color = "#FFFFFF";
        mic.style.display= "none";
        startButton.ngClick = false;
        leftPain.style.display = "block";
        rightPain.style.display = "block";
        isMainShowed = true;
    }
    function updataResult(data) {
        $rootScope.datarecognitions.push({node:data,flag:'new'});
        sortResult();
    }
    function sortResult() {
        var i = $rootScope.datarecognitions.length;
        var j = i-5;
        var arrayNew = [];
        var arrayOld = [];
        while (i--){
            if (i > j){
                $rootScope.datarecognitions[i].flag = "new";
                arrayNew.push({best:$rootScope.datarecognitions[i].node.best[0].result,results:$rootScope.datarecognitions[i].node.result,bestnode:$rootScope.datarecognitions[i].node.best[0]});
            }else {
                $rootScope.datarecognitions[i].flag = "old";
                arrayOld.push({best:$rootScope.datarecognitions[i].node.best[0].result,results:$rootScope.datarecognitions[i].node.result,bestnode:$rootScope.datarecognitions[i].node.best[0]});
            }
        }
        $rootScope.newrecognitions = arrayNew;
        $rootScope.oldrecognitions = arrayOld;
    }
    $rootScope.resultOnclick = function (resultin) {
        if($rootScope.clickedrecognitions.length > 5){
            $rootScope.clickedrecognitions.shift();
            $rootScope.clickedrecognitions.push(resultin);
        }else {
            $rootScope.clickedrecognitions.push(resultin);
        }
        document.getElementById("test").innerHTML= searchOnclick(resultin);
    };
     function searchOnclick(resultin) {
         $rootScope.searchresults=[];
         var phone = resultin.phone;
         var sentence = resultin.seq;
         var arrPhone = phone.split(" | ");
         var arrSent = sentence.split(" ");
         console.log(sentence[3]);
         arrPhone.pop();
         arrPhone.shift();
         arrSent.pop();
         arrSent.shift();

         for (var x= 0;x < arrSent.length;x++){
             arrSent[x] = arrSent[x].substring(0,arrSent[x].indexOf('+'));
         }
         var i = arrPhone.length;

         while (i--){
            if (arrPhone[i]!=="sp"){

                var toChange = arrPhone[i].replace(new RegExp(" ","gm"),"");
                var changArr = h2n(toChange);
                var showWord = r2h_low(toChange);
                for (var n=0;n<changArr.length;n++){
                    $rootScope.searchresults.push({before:arrSent[i+1],after:changArr[n]});

                }
            }
         }
    }
    function googleSearch(searchin) {
        var url = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyBXtn5z_QHVY3BLK1M2-IwfXSNXeJpXHGY&cx=016220916461730586706:g0juptilduy&callback=hndlr&q=';

        var req = {
            method:'GET',
            url: url+ searchin
        };
        $http(req)
            .success(function (data, status, headers, config){
                $rootScope.searchresults.push(data.items[0].title);
            })
            .error(function (data, status, headers, config){
                console.log(status);
            });
    }
    function http_loop() {
        if(postData.length<1){
            return false;
        }
        if (isRunHttp){
            var req = {
                method:'POST',
                url:'api/?key=1234&number=3&np=true',
                data: postData.shift(),
                headers:{
                    'Content-Type': 'audio/wav'
                }
            };
            $http(req)
                .success(function (data, status, headers, config) {
                    resultArray.push(data.result);
                    if (!isMainShowed){
                        showMain();
                        updataResult(data);
                    }else {
                        updataResult(data);
                    }
                }).error(function (data, status, headers, config) {
                console.log(status);
            });
        }
    }
    setInterval(http_loop,1000);

}