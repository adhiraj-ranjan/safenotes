$(document).ready(function () {
    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
       isClosed = false;
  
      trigger.click(function () {
        hamburger_cross();      
      });
  
      function hamburger_cross() {
  
        if (isClosed == true) {          
          overlay.hide();
          trigger.removeClass('is-open');
          trigger.addClass('is-closed');
          isClosed = false;
        } else {   
          overlay.show();
          trigger.removeClass('is-closed');
          trigger.addClass('is-open');
          isClosed = true;
        }
    }
    
    $('[data-toggle="offcanvas"]').click(function () {
          $('#wrapper').toggleClass('toggled');
    });  
  });

function newProject(){
    let createButton = document.getElementById("createButton");
    createButton.style = "display: none";
    let projectName = document.getElementById("projectName");
    projectName.style = "width: 80%;border-radius: 8px;display: unset";
    projectName.focus();
}

function reCreateButton(){
    let projectName = document.getElementById("projectName");
    projectName.style = "width: 80%;border-radius: 8px;display: none";
    let createButton = document.getElementById("createButton");
    createButton.style = "display: unset";
}

function createSpinnerElement(){
    const img = document.createElement("img");
    img.className = "spinner";
    img.src = "../static/images/icons/eclipse.svg";
    img.alt = "...";
    img.style = "display:none";
    return img
}

function createElement(Value){
    const div = document.createElement("div");
    div.className = "notDynamic";
    div.id = Value;
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${Value}`;
    a.innerHTML = Value + "&nbsp;&nbsp;";
    a.style.fontSize = "20px";
    a.appendChild(createSpinnerElement())
    li.appendChild(a);
    div.appendChild(li);
    div.addEventListener('click', loadData, false);
    return div
}

const load_spinner = document.getElementById("spinner");
var elements = document.getElementsByClassName("notDynamic");

var loadData = function() {
    var attribute = this.getAttribute("id");
    var spinner = this.getElementsByClassName("spinner")[0];
    spinner.style.display = 'inline'; // display loading svg
    fetch('/__get_data?name=' + attribute)
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            if (responseJson["status"]=="ok"){
                document.getElementById("data").value = responseJson['data'];
                document.getElementById("soletext").innerHTML = attribute;
                document.getElementById("data").name = attribute;
                spinner.style.display = 'none'; //stop loading svg
            }else{
                alert("INFO - UNABLE TO LOAD DATA");
                spinner.style.display = 'none'; //stop loading svg
            }
        })
    };

for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', loadData, false);
}

var projectName = document.getElementById('projectName');
projectName.addEventListener('keyup', (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
        var Value = projectName.value;
        if (!Value){
            return;
        }
        fetch('/__create_file?name=' + Value)
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            if (responseJson['created']){
                let projectList = document.getElementById("projectList");
                projectList.appendChild(createElement(Value));
                context.attach('.notDynamic', menu);              
                reCreateButton();
            }else{
                alert("INFO - " + responseJson["response"]);
            }

        });
            }
});


function logoutFunc(){
  fetch("/api/logout", {
    method: "POST",
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({"logout": 1})
}).then(() => {
    document.location.href = '/';
});
}
