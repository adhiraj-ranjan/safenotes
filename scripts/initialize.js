exampleMenuItemSource = function (selector) {
}

var dTextArea = document.getElementById("data");
var saveButton = document.getElementById("solesave");

window.onload = function() {
    fetch('/__get_logs?')
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            dTextArea.name = responseJson["last_viewed"];
            dTextArea.value = responseJson["value"];
            document.getElementById("soletext").innerHTML = responseJson["last_viewed"];
        });
  };


menu = [
    {
        icon: 'glyphicon-trash',
        text: 'Delete',
        action: function(e, selector) {
            let noteName = selector.attr("id");
            let res = confirm('NOTE [ ' + noteName + ' ] WILL BE DELETED!');
            
            const spinner = selector[0].getElementsByClassName("spinner")[0];
            if (res){
                spinner.style.display = 'inline'; // display loading svg
                fetch('/__delete_file?name=' + noteName)
                .then((response) => {
                    return response.json();
                })
                .then((responseJson) => {
                if (responseJson['deleted']){
                    let project = document.getElementById(noteName);
                    spinner.style.display = 'none'; //stop loading svg
                    project.remove();
                    if (dTextArea.name == noteName){
                        dTextArea.value = "";
                        dTextArea.name = "";
                        saveButton.innerHTML = "Save";
                        document.getElementById("soletext").innerHTML = "";
                    }
                }else{
                    alert("INFO - NOTE WAS NOT DELETED");
                    spinner.style.display = 'none'; //stop loading svg
                }

                });
            }
        }
    }
];



function saveFunc(){
    var fname = dTextArea.name;
    var data = dTextArea.value;

    if (!fname){
        alert("INFO - CREATE / SELECT A NOTE");
        return;
    }

    saveButton.innerHTML = "Saving...";
    fetch('/api/save_data', {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({"name": fname, "data": data})
    }).then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            if (responseJson["status"] != "ok"){
                alert("INFO - DATA NOT SAVED");
            }else{
                saveButton.innerHTML = "Saved";
            }
        })
}

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key === "s") {
      event.preventDefault();
      saveFunc();
    }
  });

var animateButton = function(e) {

    e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');
    
    e.target.classList.add('animate');
    setTimeout(function(){
      e.target.classList.remove('animate');
    },700);
  };
  
  var bubblyButtons = document.getElementsByClassName("bubbly-button");
  
  for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
  }

  document.getElementById('data').addEventListener('keydown', function(e) {
    saveButton.innerHTML = "Save";
    if (e.key == 'Tab') {
      e.preventDefault();
      var start = this.selectionStart;
      var end = this.selectionEnd;
  
      // set textarea value to: text before caret + tab + text after caret
      this.value = this.value.substring(0, start) +
        "\t" + this.value.substring(end);
  
      // put caret at right position again
      this.selectionStart =
        this.selectionEnd = start + 1;
    }
  });