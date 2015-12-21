var myApp = angular.module("app", ["firebase"]);

myApp.controller("mainController", function($scope, $firebaseArray){
    var ref = new Firebase("https://trove-test.firebaseio.com/");
    
    $scope.posts = $firebaseArray(ref);
    
    $scope.selected = "Sort By";
    $scope.search = null;
    $scope.order = function(strng) {
        if(strng == null){
            $scope.search = strng;
            $scope.selected = "Unordered";
        }
        else{
            $scope.selected = strng;
            $scope.search = $scope.selected;
        }
  };
   
    $scope.key = "";
    $scope.count = 1;
    $scope.date = new Date().toDateString();
    $scope.check = true;
    
    $scope.submit = function(name, com, num){
            
            ref.once("value", function(allMessage){
                allMessage.forEach(function(message){
                    if($scope.check){
                        //alert(message.key());
                        $scope.key = message.key();
                        //alert("This is the num " + num);
                        if($scope.count == 1 && num != 1){
                            
                        }
                        else if($scope.count == num){
                            $scope.check = false;
                        }
                        else{}
                        $scope.count++;
                    }
                });
            });
        
        $scope.commentRef = ref.child($scope.key).child('comments');
        $scope.commentRef.push({
            'cont':com,
            'pubDate': $scope.date,
            'user': name
        });
        
        $scope.check = true;
        $scope.count = 1;
        $scope.key = "";
        //alert("It works");
        
    };
    
})

myApp.controller("loginController", function($scope){
    
    $scope.test = 1+3;
    
    $scope.login = function(eml, pswd){
        if(eml === undefined || pswd === undefined){
            alert("Please enter a valid email or password");
        }
        else{
            if(angular.lowercase(eml) === "richard.scudellari@gmail.com" && pswd === "rich1234!"){
                window.location.replace("/admin.html");
            }
            else{
                alert("That is not a correct email or password");
            }
        }
        
    }
    
    
})