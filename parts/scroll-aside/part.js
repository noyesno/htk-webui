/////////////////////////////////////////////
(function($){
  var pluginName = 'scrollfloat';

  var defaults = {
    latency:200,
    top:36
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
    var arg_latency = options.latency,
        arg_top     = options.top;
    var $parent = $that.offsetParent();
    if($that.attr('data-top')){
      options_top = parseInt($that.attr('data-top'), 10);
    }
    
    function onscroll(){
      var doc_top = $(this).scrollTop();
      var top = doc_top + arg_top - $parent.offset().top;
      $that.animate({'top': [top, 'px'].join('')});
    }
    
    $(document).scroll(debounce(arg_latency, onscroll));
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
