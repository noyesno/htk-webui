

window.AppForm = window.AppForm || {};

AppForm.populate = function(form, values){
  // $('input,select,textarea,button',form)
  var items = form.elements;
  for(var i=0, ni=items.length; i<ni; i++){
    var self = items[i];
    var oldValue = self.value;
    var name = self.name, tagName=self.tagName, type=self.type;

    if(self.hasAttribute('data-noset')) continue;
    name=name.replace(/[\[\]]/g,'');
    if(!values.hasOwnProperty(name)) continue; 

    var value = values[name];
    if(tagName == "INPUT"){
      if(type == "radio"){
        console.log(value);
        value == self.value ?
          self.setAttribute('checked','checked')
         :self.removeAttribute('checked');
      }else if(type == "checkbox"){
        value.indexOf(self.value)>=0 ?
            self.setAttribute('checked','checked')
          : self.removeAttribute('checked');
      }else{
        console.log(value);
        self.value = value;
      }
    }else if(tagName == "SELECT"){
      var options = self.options,
          multiple= self.hasAttribute('multiple');
      for(var j=0, nj=options.length; j<nj; j++){ 
        if(multiple){
          value.indexOf(options[j].value)>=0 ?
             options[j].setAttribute("selected","selected")
            :options[j].removeAttribute("selected");
        }else{
          value == options[j].value ?
             options[j].setAttribute("selected","selected")
            :options[j].removeAttribute("selected");
        }
      }
    }else if(tagName == "BUTTON"){
      // ignore
    }else{
      self.value = value;
    }
  } //end for
};
