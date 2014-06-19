

window.AppForm = window.AppForm || {};

AppForm.populate = function(form, values){
  // $('input,select,textarea,button',form)
  var items = form.elements;
  for(var i=0, item; item=items[i]; i++){
    var name = item.name, tagName=item.tagName, type=item.type;

    if(item.hasAttribute('data-noset')) continue;
    name=name.replace(/[\[\]]/g,'');
    if(!values.hasOwnProperty(name)) continue; 

    var value = values[name];
    if(tagName == "INPUT"){
      if(type == "radio"){
        console.debug(value);
        value == item.value ?
        item.setAttribute('checked','checked') :
        item.removeAttribute('checked');
      }else if(type == "checkbox"){
        value.indexOf(item.value)>=0 ?
        item.setAttribute('checked','checked') :
        item.removeAttribute('checked');
      }else{
        console.debug(value);
        item.value = value;
      }
    }else if(tagName == "SELECT"){
      var options = item.options,
          multiple= item.hasAttribute('multiple');
      for(var j=0, nj=options.length; j<nj; j++){ 
        if(multiple){
          value.indexOf(options[j].value)>=0 ?
          options[j].setAttribute("selected","selected") :
          options[j].removeAttribute("selected");
        }else{
          value == options[j].value ?
          options[j].setAttribute("selected","selected") :
          options[j].removeAttribute("selected");
        }
      }
    }else if(tagName == "BUTTON"){
      // ignore
    }else{
      item.value = value;
    }
  } //end for
};
