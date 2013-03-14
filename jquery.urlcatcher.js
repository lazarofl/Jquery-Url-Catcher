/*
 *  Project: Jquery Url Catcher
 *  Description: Capture first url entered in a text field
 *  Author: Lazaro Lima - www.lazarolima.com.br
 *  License: MIT License - http://opensource.org/licenses/MIT
 */

;(function ( $, window, document, undefined ) {

    var pluginName = "UrlCatcher",
        defaults = {
            urlRegex: /(https?:\/\/)?([\dA-Za-z\._-]+)\.([A-Za-z\.]{2,6})([\/\w\._\-=\?]*)*\/?/,
            cancel: undefined,
            callback: undefined,
            cancelCallback: undefined
        };

    var url = '';
    var lockurl = false;

    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;

        if(this.options.callback === undefined)
            throw "callback is undefined";

        this.init();
    }

    Plugin.prototype = {

        init: function() {
            Plugin.prototype.addKeyupHandler(this.element, this.options);
            Plugin.prototype.addClearHandler(this.options);
        },

        addKeyupHandler: function(element, options) {
            $(element).keyup(function(){
                Plugin.prototype.verifyClearText($(element).val());
                Plugin.prototype.verifyNewUrl($(element).val(), options.urlRegex, options.callback );
            });
        },

        addClearHandler: function(options) {
            if(options.cancel !== undefined)
            {
                $(options.cancel).click(function(){
                    url = '';
                    if(options.cancelCallback !== undefined && options.cancelCallback != null)
                    {
                        options.cancelCallback();
                    }
                });
            }
        },

        verifyClearText: function(value){
            if(value=='' && lockurl === true)
                lockurl = false;
        },

        verifyNewUrl: function(value, pattern, callback) {
            //https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/match
            var _urls = value.match(pattern);
            if(_urls !== undefined && _urls != null && _urls.length > 0 && url == '' && lockurl === false)
            {
                var index = value.indexOf(_urls[0]);
                if(value.length > (index + _urls[0].length))
                {
                    url = _urls[0];
                    lockurl = true;
                    callback(url);
                }   
            }
        },

    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );