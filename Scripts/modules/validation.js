//This function will check if the name is empty or not. Can be used for other fields as well if needed to check NotIsEmpty.
export function checkNotIsEmpty(name) {  
  if(name.trim() === "" || name == null) {//alert(name);
    document.getElementById("mandatoryName").style.display= '';
    document.getElementById("mandatoryName").innerHTML= '*'; 
    return false;    
  }else{
    document.getElementById("mandatoryName").style.display= 'none';
    document.getElementById("mandatoryName").innerHTML= '';    
  }
}

//This function will check if the email is valid or not.
export function validateEmail(email) {
  var pattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/; 
  var isValid = pattern.test(email);//alert(isValid);
  if(!isValid) {
    document.getElementById("mandatoryEmail").style.display= '';
    //document.getElementById("mandatoryEmail").style.display= 'block';
    document.getElementById("mandatoryEmail").innerHTML= 'invalid email address';
    return false;    
  }else{
    document.getElementById("mandatoryEmail").style.display= 'none';
    document.getElementById("mandatoryEmail").innerHTML= '';    
  }
}

//This function will check if the phone number is valid or not.
export function validateFlexiblePhone(phone) {
  var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  var isValid = regex.test(phone); 
  if (!isValid) {//alert("here" + isValid);
    document.getElementById("mandatoryPhone").style.display= '';
    //document.getElementById("mandatoryPhone").style.display= 'block';
    document.getElementById("mandatoryPhone").innerHTML= 'invalid phone number';
    return "error in phone number";
  }else
  {//alert(isValid);
    document.getElementById("mandatoryPhone").style.display= 'none';
    document.getElementById("mandatoryPhone").innerHTML= '';

    const formatted = phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'); // basic phone format as xxx-xxx-xxxx
    document.getElementById("phone").value = formatted;
  }
}