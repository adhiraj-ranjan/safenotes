
function createUser(){
    uname = document.getElementById("uname").value;
    passwd = document.getElementById("passwd").value;
    if (!uname || !passwd){
       alert("fill out the fields!");
       return
    }

    document.getElementById("butText").innerHTML = "Signing up";
    document.getElementById("uText").innerHTML = "Username";

    fetch("/api/signup", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({"username": uname, "password": passwd})
    }).then((response) => {
        return response.json()
    }).then((responseJson) => {
        if (responseJson['created'] == false){
            document.getElementById("uText").innerHTML = "Username already taken! Try another";
            document.getElementById("butText").innerHTML = "Sign Up";
        }else{
            document.getElementById("pageHeading").innerHTML = "Sign Up Successfully";
            document.getElementById("butText").innerHTML = "redirecting...";
            document.location.href = '../';
        }
    });
}