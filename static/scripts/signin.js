function setCookie(cName, cValue, expDays) {
  let date = new Date();
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

function validateUser(){
    uname = document.getElementById("uname").value;
    passwd = document.getElementById("passwd").value;
    if (!uname || !passwd){
        alert("fill out the fields!");
        return
     }
    document.getElementById("butText").innerHTML = "Validating...";
    document.getElementById("uText").innerHTML = "Username";

    fetch("/api/signin", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({"username": uname, "password": passwd})
    }).then((response) => {
        return response.json()
    }).then((responseJson) => {
        if (responseJson["authenticated"] == true){
            document.getElementById("butText").innerHTML = "Signed In";
            setCookie("authtoken", responseJson["authtoken"], 365)
            document.location.href = '/index';
        }else{
            document.getElementById("butText").innerHTML = "Sign In";
            document.getElementById("uText").innerHTML = "Username or Password is incorrect!";
        }
    });
}

var input = document.getElementById("passwd");

input.addEventListener("keypress", function(event) {
  if (event.key == "Enter") {
    event.preventDefault();
    document.getElementById("butText").click();
  }
});

var input = document.getElementById("uname");

input.addEventListener("keypress", function(event) {
  if (event.key == "Enter") {
    event.preventDefault();
    document.getElementById("passwd").focus();
  }
});