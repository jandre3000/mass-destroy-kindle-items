function mdki(){
	var div;
	var input;
	var button;
	var v; 
	var a = document.getElementsByClassName('rowBodyCollapsed');
	var b = document.getElementsByClassName('headerTitle');
	var c = [];
	var count = 0; 

	function make_mdki_dom(){
		div = document.createElement('div');
		div.id='mdki_container';
		h1 = document.createElement('h1');
		h1.innerHTML='Mass Delete Kindle Items';
		hr=document.createElement('hr');
		label=document.createElement('label');
		label.for='mdki_input';
		label.innerHTML='enter the title of the items you wish to delete';
		
		input=document.createElement('input');
		input.type='text';
		input.name='mdki_input';
		input.id='mdki_input';
		input.value='';
    input.addEventListener('keyup', mdki_keyup);
		
		button=document.createElement('button');
		button.id='mdki_button';
		button.innerHTML='delete these items';
		button.addEventListener('click',mdki_click)
			
		close_div=document.createElement('div');
		close_div.id="close_div";
		close_div.innerHTML= '&#10006';		
		close_div.addEventListener('click', close);
    
		div.appendChild(h1);
		div.appendChild(hr);
		div.appendChild(label);
		div.appendChild(input);
		div.appendChild(button);
		div.appendChild(close_div);
		document.body.appendChild(div);
	}	
	
	function mdki_click(event){
		button=event.target
		v=input.value;
		button.setAttribute('disabled','disabled'); 
		delete_items();
	}
  
  function mdki_keyup(event){
    v=input.value;
		for(var i = 0; i<b.length; i++) {
      b[i].className = b[i].className.replace(/mdki_highlight/g,'');        
      if (b[i].textContent.match(v)){
        b[i].className += " mdki_highlight";  
      }
    }
  }

	function close(event){
		div.className = '';
		input.value = '';
		for(var i = 0; i<b.length; i++) {  
      b[i].className = b[i].className.replace(/mdki_highlight/g,'');        
    }
	}

	make_mdki_dom();
	input.focus();
	div.className = 'show';
  
	function delete_items(){
		if (a.length == b.length){
			for(var i = 0; i<b.length; i++) {
				if (b[i].textContent.match(v)) {
					c.push([i]);
					count +=1;
				}
			};
			
			if (count == 0){
				alert("There are no items with the title '"+v+"' on this page")
				button.removeAttribute('disabled');
				v.value = "";  
			} else {
			
			  var conf = confirm(count+" items with the title:'"+v+"' will be deleted");			
				
    	  if (conf){
				  for (i in c){
					  Fion.deleteItem('deleteItem_'+a[c[i]].getAttribute('asin'));				
				  }
        }
        else {
				  c = [];
				  count = 0; 
				  button.removeAttribute('disabled');
          return false;  
        }
		  }
	  }
  }
}
mdki();
