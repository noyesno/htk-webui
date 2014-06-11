/////////////////////////////////////////////
(function($){

  var pluginName = 'rollup';

  function next($owner, N) {
    var items = $owner.children();
    //items.eq(0).hide('slow').appendTo($owner); 
    if(N<items.length){
      items.eq(N).show();
          items.eq(0).slideUp('slow', function(){
            $(this).appendTo($owner);
          }); 
    }else{ 
      items.eq(0).slideUp('slow', function(){
        $(this).appendTo($owner).show();
      }); 
    }
  }

  $.fn.rollup = function(setting){
    var setting = $.extend({speed:2,size:2},setting);
    $(this).each(function(){
      var $owner = $(this);
      var speed = setting.speed;
      var size  = setting.size;
      $owner.css('overflow','hidden').height($owner.height());
      $owner.children().show();
      var timer = setInterval(function(){next($owner,size)}, speed*1000);
      $owner.data('timer',timer);
    });
  }

})(jQuery);
/////////////////////////////////////////////
