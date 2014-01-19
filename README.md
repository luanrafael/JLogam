JLogam
======

JLogam - JavaScript Libary for Open Gestures Acessibility Mobile

JLogam is a HTML 5 project to provide gesture based interfaces for mobile applications.


Page:
-----
  * http://luanrafael.github.io/JLogam/


Jsfiddle - demo:
---------------
  * http://jsfiddle.net/luanrafael/tMqLk/


Using cheers gesture:
=====================

First use de function JLogam.setup() to configure JLogam. This function returns true when the library is supported by the browser.

Later you can set the listener for a gesture using the function as the example below:
  
 
 

    JLogam.on(
        "cheers",
        function(){
            alert("I'm using the JLogam");
        }
    );
