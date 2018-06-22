
/*
$widget.lut = {
  path1: [dom1, dom2, dom3],
  path2: [dom1, dom4, dom5]
}
*/

// var $widget = {lut:{}};
// $widget.$data = data;
// 
// htk.compile($widget, dom);
// console.log($widget);
// htk.bind(data, $widget);
// htk.xtpl($template, $data);
// htk.link($data.msg, $dom);


// MutationObserver

function HTk(dom, data){
  var $widget = {
     lut:{}, 
     dom:dom, 
     data:data
  };
  HTk.$bind($widget, data);
  HTk.$compile($widget, dom)
  console.log($widget);

  return $widget;
}


HTk.$compile = function($widget, dom){
  var self = this;

  var html = dom.outerHTML;

  var nodes = dom.childNodes;
  for(var n = nodes.length - 1; n>=0; n--){
    var node = nodes[n];
    if(node.nodeType == node.TEXT_NODE){
      var text = node.nodeValue;
      var idx  = text.indexOf("${")
      if(idx<0) continue;
      var idx2 = text.indexOf("}", idx);
      var path = text.substring(idx+2,idx2); 
      if(!$widget.lut.hasOwnProperty(path)) $widget.lut[path] = [];
      $widget.lut[path].push(node)
      var body = "var text=''; try { text = '" + text.replace(/[\r\n]/g,'\\n').replace(/\$\{(.+)\}/g, function(match, path, offset){
        // return eval("$data."+path);
        //return htk.getvalue($data, path);
        return "'+$data."+path+"+'";
      }) + "'} catch (e) {text = 'Error:'; throw e } return text";
      console.log($widget.data.time);
      node.$render = new Function("$data", body);
      self.$render($widget, node);
    }else{
      self.$compile($widget, node);
    }
  }
}

HTk.$getvalue = function($data, path){
  var toks = path.split(".");
  var value = $data;
  for(var i=0, n=toks.length; i<n; i++){
    value = value?value[toks[i]]:undefined;
  }
  return value;
}

HTk.$render = function($widget, node){
  if(node.nodeType==node.TEXT_NODE){
    //-- var text = node.nodeValue;
    //-- text = text.replace(/\$\{(.+)\}/g, function(match, path, offset){
    //--   // return eval("$data."+path);
    //--   return htk.getvalue($data, path);
    //-- });
    //-- console.log(text);

    // TODO: use a async queue
    var text = node.$render($widget.data);
    if(text != undefined){
      node.nodeValue = text;
    }
  }
}

HTk.$onchange = function($widget, path){
  var self = this;
  var elements = $widget.lut[path];

  if(!elements) return;

  for(var n = elements.length-1; n>=0; n--){
    var node = elements[n];
    // console.debug("onchange", path, node);
    self.$render($widget, node, $widget);
  }
}

/* Start from ES5 */

HTk.$getsetter = function($widget, path, value){
  var self = this;

  return {
        configurable:true, 
        enumerable:true,
        get: function(){return value},
        set: function(newValue){
          value = newValue;
          self.$onchange($widget, path); 
          return;
        }
  };
}

HTk.$bind = function($widget, $data, prefix){
  var self = this;

  for(k in $data){
    var path = prefix?[prefix,k].join("."):k; 

    var v = $data[k];
    if(Array.isArray(v)){
      for(var i=0, n=v.length; i<n; i++){
         HTk.$bind($widget, v[i], path+'['+i+']');
      }
    }else if(typeof v === "object"){
      HTk.$bind($widget, v, path);
    }else{ 
      console.debug("bind", path);
      Object.defineProperty($data, k, self.$getsetter($widget, path, v));
    }
  }
}

