$('input').change(function(evt){
	var selector = this.form.selector.value;
	var css_name = this.name;
	var css_value = this.value;
	if(this.type == "color"){
		css_value = this.value;
	}else if(this.type == "number"){
		css_value = [this.value,'mm'].join('');
	}
  $(selector).css(css_name, css_value);
});

$('select').change(function(evt){
	var selector = this.form.selector.value;
	var css_name = this.name;
	var css_value = this.value;
	if(this.type == "color"){
		css_value = this.value;
	}else if(this.type == "number"){
		css_value = [this.value,'mm'].join('');
	}
  $(selector).css(css_name, css_value);
});

