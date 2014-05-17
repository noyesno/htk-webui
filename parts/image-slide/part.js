(function($){

  var defaults = {
    speed:3000
  };
  function Plugin(element, options){
          //this.element = element;
          this.$this = $(element);
          this.options = $.extend({}, defaults, options);

          this.init();
  }

  Plugin.prototype.toggle = function(idx){
        var $this = this.$this;
        var $images = $(".mask img", $this);
        var $img = $images.eq(idx);
        $images.removeClass("show"); $img.addClass('show');
        var href = $img.parent().attr('href');
        var src  = $img.attr('src');
        $(".bigImg", $this).parents("a").attr("href",href); // TODO: parents() => parent()
        $(".bigImg", $this).hide().attr("src",src).fadeIn("slow");
  };


  Plugin.prototype.rotate = function(){
        var $this = this.$this;
        var $images = $(".mask img", $this);
        var idx = $images.filter(".show").parent().index();
        if (idx >= $images.length-1)
          idx=0;
        else
          idx++;
        this.toggle(idx);
  };

  Plugin.prototype.init = function(){
    var self=this, $this = this.$this;
    var timer;
    var $images = $(".mask img", $this);

    $images.click(function(){
      var idx = $(this).parent().index();
      self.toggle(idx);
      return false;
    });

    var speed = this.options.speed;
    $this.hover(
      function(){clearInterval(timer);},
      function(){timer=setInterval(self.rotate.bind(self),speed);}
    );


    $this.find(".mask").animate({"bottom":"0"},700);

    $images.eq(0).click();
    timer = setInterval(self.rotate.bind(self),speed);
  };

  var pluginName = 'slide';
  $.fn[pluginName]= function(options){
          this.each(function(){
        if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
                }
          });
  };
})(jQuery);
