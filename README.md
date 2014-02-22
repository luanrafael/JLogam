JLogam
======

JLogam - JavaScript Library for Open Gestures Acessibility Mobile

JLogam is a HTML 5 project to provide gesture based interfaces for mobile applications.


Using JLogam:
=====================

|  Gesture        | on                                      | off                  |
|-----------------|-----------------------------------------|----------------------|
| *cheers*        | JLogam.on("cheers",function(){}))       | JLogam.off("cheers") |
| *yes*           | JLogam.on("yes",function(){}))          | JLogam.off("yes")    |              
| *no*            | JLogam.on("no",function(){}))           | JLogam.off("no")     |
| *victory*       | JLogam.on("victory",function(){}))      | JLogam.off("victory")|
| *front*         | JLogam.on("front",function(){}))        | JLogam.off("front")  |
| *back*          | JLogam.on("back",function(){}))         | JLogam.off("back")   |
| *left*          | JLogam.on("left",function(){}))         | JLogam.off("left")   |
| *right*         | JLogam.on("right",function(){}))        | JLogam.off("right")  |



First use de function JLogam.setup() to configure JLogam. This function returns true when the library is supported by the browser.

Later you can set the listener for a gesture using the function as the example below:
  
 
 

    JLogam.on(
        "cheers",
        function(){
            alert("I'm using the JLogam");
        }
    );


-----------------------------------------------------


Page:
-----
  * http://luanrafael.github.io/JLogam/


Jsfiddle - demo:
---------------
  * http://jsfiddle.net/luanrafael/tMqLk/
