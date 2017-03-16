window.onload = function () { "use strict";
    
let op = document.getElementById("op");
let key = document.getElementById("getkeyButton");
let viewbtn = document.getElementById("viewbooksbtn");
let listofbooks = document.getElementById("listofbooks");
let addbtn = document.getElementById("addbtn")
let inputAuthor = document.getElementById("author");
let inputTitle = document.getElementById("title");
let error = document.getElementById("error");
let bookIdnr = document.getElementById("bookIdnr");
let statusbar = document.getElementById("statusbar")
let clicked = true;

/******************GET KEY****************************************/

key.addEventListener("click", function(event) {

        op.innerHTML = "PjCeA";
});

    
/*****************VIEW BOOKS**************************************/

let loadagain = function(){
    
let url = "https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=PjCeA";

let ajax = new XMLHttpRequest();
ajax.onreadystatechange = function(event) {
    
    console.log("readyState:" + ajax.readyState);
    console.log("status:" + ajax.status);
    console.log("responseText:" + ajax.responseText);
    
    
    if( ajax.readyState == 4 && ajax.status == 200 ){
        console.log("Success!")
        
        var data = JSON.parse(ajax.responseText);
        console.log(data);
        console.log(ajax.responseText);
       
        if(data.status === "error"){
            
            loadagain();
        }
        else{
            listofbooks.innerHTML = "";
            
    
        for (let i = 0; i < data.data.length; i++){
            var item = document.createElement("li");
            item.innerHTML += "<span>* Id: </span>" + data.data[i].id + " " + "<span>Title: </span>" + data.data[i].title + " " + "<span>Author: </span>" + data.data[i].author;
            listofbooks.appendChild(item);
            };
        }
    
    }
 
};

    
ajax.open("GET", url);
ajax.send();
};

viewbtn.addEventListener("click", loadagain);
 
viewbtn.addEventListener("click", function(event){
 if (clicked === false)
    {
            listofbooks.style.display = "none";
            viewbtn.innerHTML = "View books";
            clicked = true;

    }
    else if (clicked === true)

    {

            listofbooks.style.display = "block";
            viewbtn.innerHTML = "Hide books";
            clicked = false;

    }
});
    
    
/***********************ADD BOOK****************************************/
  
let pushbooks = function(){
    
let pushAuthor = inputAuthor.value;
let pushTitle = inputTitle.value;

let url = "https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=PjCeA&title=" + pushTitle + "&author=" + pushAuthor;

let ajax = new XMLHttpRequest();
ajax.onreadystatechange = function(event) {

    
    if( ajax.readyState == 4 && ajax.status == 200 ){
        console.log("Success!")
        
        var data = JSON.parse(ajax.responseText);
        console.log(data);
        console.log(ajax.responseText);
        
        //op.innerHTML = data.message;
        if(data.status === "error"){
            statusbar.innerHTML = "Error message: " + data.message + " - try again!";
            //pushbooks();
        }
        else {
            statusbar.innerHTML = "Success!";
        }
    }

 
};
    
ajax.open("post", url);
ajax.send();
    
inputAuthor.value = "";
inputTitle.value = "";
};
        
addbtn.addEventListener("click", pushbooks);    
    
}