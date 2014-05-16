/////////////////////////////////////////////
(function($){
  var pluginName = 'waterfall';

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
    $that.addClass('ui-waterfall'); 
    //$wall.css('position','relative');

    var boxes = [];
    $that.children().each(function(){
      var $this = $(this);
      boxes.push([$this, $this.width(), $this.height()]);
    });
    this.boxes = boxes;
    
    this.place();    

  };
  
  function calculate_cols($wall, boxes){
    // caculate cols
    var cols = [];
    for(var i=0, n=boxes.length; i<n; i++){
      var $box = boxes[i][0];
      if(cols.length===0){
        $box.prependTo($wall);
      }else{
        $box.insertAfter(cols[cols.length-1]);
      }
      cols.push($box);

      if($box.position().top > cols[0].position().top) {
        cols.pop();
        break;
      }
    }
    return cols;
  }
  
  function place_to_cols(cols, boxes){
    // place to lowest col
    for(var i=cols.length, n=boxes.length; i<n; i++){
      var $box = boxes[i][0];
      var urx, ury;
         
      var col_min, col_idx;
      for(var j=0, jn=cols.length; j<jn; j++){
            var bottom = cols[j].position().top + cols[j].height();
            if(j===0)            { col_idx=0; col_min = bottom;}
            else if(bottom<col_min) { col_idx=j; col_min = bottom;}
      }
      var col  = cols[col_idx];
          ury = col.position().top + col.outerHeight()+13;
      var left = col.position().left;
      $box.css({display:'block',position:'absolute', top:ury, left:left});
      cols[col_idx] = $box;
    }
  }
  
  
  Plugin.prototype.place = function(){
    var $wall = this.$that,
        boxes = this.boxes;

    boxes.sort(function(a, b){
      return b[0].height() - a[0].height();
    });
    
    var cols = calculate_cols($wall, boxes);
    place_to_cols(cols, boxes);
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
