var check = false;
let values = {
  text: JSON.parse(localStorage.getItem("data")) || [],
};
var ctr = values.text.length;

function addContents(){
  var inputText = $("#text").val();
  values.text.push(inputText);
  var con = $('<div class="addContainer"></div>').addClass("" + ctr);
  var addText = $('<p id="textInput"></p>').text(inputText).addClass("" + ctr);
  var btnHolder = $('<div class="btnContainer"></div>').addClass("" + ctr);
  var editBtn = $('<button id="editButton"> <img src="pen.png" class="editIcon"></button>').addClass("" + ctr);
  var delBtn = $('<button id="delButton" ><img src="remove.png" class="delIcon"></img></button>').addClass("" + ctr);
  var editInput = $('<textarea id="editInput"></textarea>').addClass("hide").addClass("" + ctr);
  var saveBtn = $('<button id="saveButton"><img src="checked.png" class="saveIcon"></button>').addClass("hide").addClass("" + ctr);
  $(".notes").append(con);
  con.append(addText);
  con.append(btnHolder);
  btnHolder.append(editBtn);
  btnHolder.append(delBtn);
  con.append(editInput);
  con.append(saveBtn);
}

function start(){
  for (let i = 0; i < values.text.length; i++) {
    var con = $('<div class="addContainer"></div>').addClass("" + i);
    var prevText = $('<p id="textInput"></p>').text(values.text[i]).addClass("" + i);
    var editBtn = $('<button id="editButton"> <img src="pen.png" class="editIcon"></button>').addClass("" + i);
    var delBtn = $('<button id="delButton" ><img src="remove.png" class="delIcon"></img></button>').addClass("" + i);
    var btnHolder = $('<div class="btnContainer"></div>').addClass("" + i);;
    var editInput = $('<textarea id="editInput"></textarea>').addClass("hide").addClass("" + i);
    var saveBtn = $('<button id="saveButton"><img src="checked.png" class="saveIcon"></button>').addClass("hide").addClass("" + i);
    $(".notes").append(con);
    con.append(prevText);
    con.append(btnHolder);
    btnHolder.append(editBtn);
    btnHolder.append(delBtn);
    con.append(editInput);
    con.append(saveBtn);
  }  
}

function addNote() {
  $(".add").on("click", function () {
    setTimeout(addContents(), 100);
    localStorage.setItem("data", JSON.stringify(values.text));
    ctr++;
    $(".inputText").val("");
  });
}

function deleteAll() {
  $(".deleteAll").on("click", function () {
    values.text = [];
    $(".notes").text("");
    localStorage.setItem("data", JSON.stringify(values.text));
  });
}

function deleteNote(){
  $(document).on("click", "#delButton", function () {
    var n = $(this).attr("class");
    values.text.splice(n, 1);
    localStorage.setItem("data", JSON.stringify(values.text));
    alert("This action cannot be undone.");
    $("." + n).remove();
  });
}

function editNote(){
  $(document).on("click", "#editButton", function () {
    var n = $(this).attr("class");
    $("#textInput."+n).addClass("hide");
    $("#editButton."+n).addClass("hide");
    $("#delButton."+n).addClass("hide");
    $("#editInput."+n).removeClass("hide").text($("p."+n).text());
    $("#saveButton."+n).removeClass("hide");
  });
}

function saveNote(){
  $(document).on("click", "#saveButton", function () {
    var n = $(this).attr("class");
    var l = Number(n);
    $("#textInput."+n).removeClass("hide");
    $("#editButton."+n).removeClass("hide");
    $("#delButton."+n).removeClass("hide");
    $("#editInput."+n).addClass("hide");
    $("#saveButton."+n).addClass("hide");
    var edited = $("#editInput."+l).val();
    values.text[l] = edited;
    $("#textInput."+l).text(edited);
    localStorage.setItem("data", JSON.stringify(values.text));
  });
}

// function enterKey(){
//   $(document).on("keypress", function(e){
//     if(e.which == 13){
//       addNote();
//     }
//   });
// }

// enterKey();


window.onload = function () {
  document.body.style.pointerEvents = "auto"; 
};

document.body.style.pointerEvents = "none";


start();
addNote();
deleteAll();
deleteNote();
editNote();
saveNote();