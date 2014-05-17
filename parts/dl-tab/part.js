

/////////////////////////////////////////////
(function($){
  var pluginName = 'dltab';

  var defaults = {
    latency:200,
    top:36
  };

  function Plugin(element, options){
    this.$that = $(element);
    this.options = $.extend({}, defaults, options);
    this.init();
  }

  Plugin.prototype.init = function(){
    var self=this, $that = this.$that;
    $that.addClass('ui-dltab');
    $that.children('dd').appendTo($that);
    
    $that.children('dt').click(function(){
      $that.children('dt').removeClass('active');
      var idx = $(this).addClass('active').index();
      $that.children('dd').hide().eq(idx).show();
    });
    
    $that.children('dt').eq(0).click();
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
