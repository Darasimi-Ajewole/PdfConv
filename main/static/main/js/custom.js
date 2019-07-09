"use strict"

function stateSwitcher (state) {
  var button = document.querySelector('.btn');

  try {
    main.removeChild(button);
  }
  catch(error){
    console.log(error.message)
  }

  if (state) {
    docFormWrapper.style.opacity = 0.5;   //makes the form opaque to signify no uploading
    docFormFieldset.setAttribute("disabled","true") //disables the form
    var loadingText = state.text;

    var newButton = document.createElement("button");
    main.appendChild(newButton);
    newButton.setAttribute('class','btn btn-primary btn-lg');
    newButton.setAttribute('id','load');
    newButton.setAttribute("data-loading-text",spinner + loadingText);
    newButton.style.backgroundColor = state.color;
    $(".btn").button('reset');
    $(".btn").button('loading');
    
  }

  else {
    docFormWrapper.style.opacity = 1;
    docFormFieldset.removeAttribute("disabled")

  }
}

function submission() {
    var FD = new FormData(docForm);
    FD.append("doc",file.files[0]);
    axios({
      method: 'post',
      url:winURL,
      data:FD,
      config: {headers: {'Content-Type': 'multipart/form-data' }}
     })
     .then((response) => afterSub(response))

     stateSwitcher(uploading);
}

function afterSub(response) {
    if (response.data.message === "upload_successful") {
      taskUpdate()
    }

    //There's an error during submission
    else{
      var errors = ""
      for (error of response.data.message) {
        var tmp = `${error} \n\n`
        errors += tmp;
      }
      alert(errors);

    }
}

function taskUpdate() {
    stateSwitcher(converting);
    var taskURL = winURL + "converting";
    axios({
      method: 'get',
      url:taskURL,
     })
     .then((response) => afterConv(response))
     .catch((error) => {console.log(error.config)})
}

function afterConv(response) {
  if (response.data.status !== "reset" ){
    console.log(response);
    stateSwitcher();

    var newButton = document.createElement("button");
    main.appendChild(newButton);
    newButton.setAttribute('class','btn btn-primary btn-lg');

    newButton.textContent = "Download";
    newButton.style.backgroundColor = '#51ce32';

    newButton.onclick = () => {
      var win = window.open(`${winURL}\download`,'_blank');
      win.focus();
    }
    
  }

  else {
    stateSwitcher()
  }
}

function fileUpdate(event) {
  event.preventDefault()
  file.files = event.originalEvent.dataTransfer.files
}


var file = document.querySelector('.file-upload-input');
var spinner = "<i class='fa fa-spinner fa-spin '></i>";
var docForm = document.querySelector(".image-upload-wrap form");
var docFormWrapper = document.querySelector(".image-upload-wrap");
var docFormFieldset = document.querySelector(".image-upload-wrap form fieldset");
var main =  document.querySelector(".wrapper.wow.fadeInUp")
var winURL = window.location.href
var dropContainer = $('.image-upload-wrap');
//drag and drop event
dropContainer.on('dragenter dragover',(event)=>{event.preventDefault()})
dropContainer.on('drop',fileUpdate)



file.onchange = (event) => {
  submission()
}

//states
var uploading = {
  'color': '#3297ce',
  'text': "uploading",
}

var converting = {
  'color': 'yellow',
  'text': "converting",
}

var download = {
  'color': '#51ce32',
  'text': "download",
}