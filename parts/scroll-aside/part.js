/////////////////////////////////////////////
(function($){
  var pluginName = 'scrollfloat';

  var defaults = {
    latency:200,
    top:36,
    effect: 'scroll', // sticky
    sticky:'sticky',
    callback:null,
  };

  function Plugin(element, options){
    this.$that = $(element);
    this.options = $.extend({}, defaults, options);
    this.init();
  }
  
  function debounce(latency, callback){
    var timer;
    return function(){
      if(timer) clearTimeout(timer);
      timer = setTimeout(callback.bind(this), latency); 
    };
  }

  Plugin.prototype.init = function(){
    var self=this, $that = this.$that, options=this.options;
    this.options.offsetTop = $that.offset().top;
    var arg_latency = options.latency,
        arg_top     = options.top,
        effect      = options.effect,
        offsetTop   = options.offsetTop;
    var $parent = $that.offsetParent();

    if($that.attr('data-top')){
      options_top = parseInt($that.attr('data-top'), 10);
    }
    
    function onscroll(){
      var doc_top = $(this).scrollTop();

      if(effect=="scroll"){
        var top = doc_top + arg_top - $parent.offset().top;
        $that.animate({'top': [top, 'px'].join('')});
        return;
      }
      if(effect=="sticky"){
        if(doc_top > (offsetTop + arg_top)){
          $that.addClass(options.sticky);
        }else{
          $that.removeClass(options.sticky);
        }
      }
    }
    
    var action = options.callback?options.callback:onscroll; 
    $(document).scroll(debounce(arg_latency, action));
  };
  

  

  $.fn[pluginName]= function(options){
    this.each(function(){
      if(!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  };
  return $.fn[pluginName];
})(jQuery);
/////////////////////////////////////////////
