function saveData(){
    var name = document.getElementById("userName").value;//alert(name);
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    //save to local storage
    localStorage.setItem("userName", name);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    // Retrieve
    document.getElementById("displayName").innerHTML = localStorage.getItem("userName");
    document.getElementById("displayEmail").innerHTML = localStorage.getItem("email");
    document.getElementById("displayPassword").innerHTML = localStorage.getItem("password");

    // clear entry fields after submission
    document.getElementById("userName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

}

