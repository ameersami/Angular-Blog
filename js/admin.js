var myApp = angular.module("app", ["firebase"]);

myApp.controller("mainController", function($scope, $firebaseArray){
    var ref = new Firebase("https://trove-test.firebaseio.com/");
    
    $scope.posts = $firebaseArray(ref);
    $scope.cat = 'Not Selected';
    $scope.selected = 'Select a category';
    
    $scope.order = function(strng){
        $scope.cat = strng;
        $scope.selected = strng;
    }
    
    $scope.date = new Date().toDateString();
    $scope.count = 0;
    
    $scope.submit = function(title,cat,text,imgSrc){
        
        ref.once("value", function(allMessage){
            allMessage.forEach(function(message){
                $scope.key = message.key();
                $scope.count++;
            });
        });
        
        $scope.count++;
        
        //alert(title + " " + $scope.cat + " " + text + " " + imgSrc);
        //alert($scope.date);
        ref.push({
            'num': $scope.count,
            'title': title,
            'text': text,
            'postCat': $scope.cat,
            'photo': imgSrc,
            'pubDate': $scope.date,
            'comments': [
                {
                'cont':'Test one two three',
                'pubDate': '2015-12-19',
                'user': 'Ameer'
                },
                {
                'cont':'Test one two three four',
                'pubDate': '2015-12-19',
                'user': 'Ameer'  
                }
            ]
        });
        
    };
    
});