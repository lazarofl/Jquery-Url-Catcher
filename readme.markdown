#Jquery Url Catcher
###Jquery Plugin to capture first url entered in a text field

##Simple usage
```javascript
$("#elementid").UrlCatcher({
    callback: function(url){
        ...
    },
    cancel: "#cancel_elementid"
});
```

##Use cancel callback
```javascript
$("#elementid").UrlCatcher({
    callback: function(url){
        ...
    },
    cancel: "#cancel_elementid",
    cancelCallback: function(){
        ...
    }
});
```

Get the [sample](index.html "Sample html") page.