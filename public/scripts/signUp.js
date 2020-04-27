window.onload= function(){
    let button = document.getElementById('btnSubmit');
    let chekbox = document.getElementById('agrement');
    
    button.setAttribute('disabled',true)
    
    chekbox.addEventListener('change',function(e){
        
    if(this.checked){
       button.disabled = false
    }else{
        button.disabled = true
    }
    })



}