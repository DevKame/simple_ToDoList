"use strict";
let input = document.getElementById("new-item-input");
let button = document.getElementById("new-item-button");
let open = document.getElementById("open-container");
let done = document.getElementById("done-container");


//Delivers a feedback of wether you can safe that item already while typing:
input.addEventListener("input", e => {
  e.target.value.trim() === "" ?
  button.classList.remove("valid") :
  button.classList.add("valid");
});

//Much better user experience if the user just pressed ENTER for saving an item
input.addEventListener("keypress", e => {
  if(e.key === "Enter")
    {
      if(e.target.value.trim() !== "")
        {
          open.append(create_item(e.target.value.trim()));
        }
    }
});

//Only saves the item, when button is actually clickable:
button.addEventListener("click", e => {
  switch(e.target.classList.contains("valid"))
    {
      case true:
        open.append(create_item(input.value.trim()));
        input.value = "";
        e.target.classList.remove("valid");
        break;
      default:
        break;
    }
});

function delete_item(btn) {
  btn.parentElement.parentElement.remove();
}

//Shifts your items dependent on what button you pressed:
function mark_as_done(btn) {
  if(!btn.classList.contains("disabled"))
    {
      let item = btn.parentElement.parentElement;
      done.append(item);
      let undoBtn = btn.nextElementSibling;
      undoBtn.classList.remove("disabled");
      btn.classList.add("disabled");
    }
}
//Shifts your items dependent on what button you pressed:
function mark_as_open(btn) {
  if(!btn.classList.contains("disabled"))
    {
      let item = btn.parentElement.parentElement;
      open.append(item);
      let doneBtn = btn.previousElementSibling;
      doneBtn.classList.remove("disabled");
      btn.classList.add("disabled");
    }
}

//Creates a new Item, applies Listeners to its buttons and applies them to the "Open" Container:
function create_item(string) {
  let item = document.createElement("div");
  item.setAttribute("class", "item");

    let e_con = document.createElement("div");
    e_con.setAttribute("class", "entry-container");

    let entry = document.createElement("p");
    entry.innerText = string;

    e_con.append(entry);
  item.append(e_con);
    
    let b_con = document.createElement("div");
    b_con.setAttribute("class", "button-container");

      let doneBtn = document.createElement("button");
      doneBtn.setAttribute("class", "done");
      doneBtn.innerText = "Done";
      doneBtn.addEventListener("click", e => {
        mark_as_done(doneBtn);
      });

      let undoBtn = document.createElement("button");
      undoBtn.setAttribute("class", "undo disabled");
      undoBtn.innerText = "Undo";
      undoBtn.addEventListener("click", e => {
        mark_as_open(undoBtn);
      });

      let deleteBtn = document.createElement("button");
      deleteBtn.setAttribute("class", "delete");
      deleteBtn.innerText = "Delete";
      deleteBtn.addEventListener("click", e => {
        delete_item(deleteBtn);
      });

    b_con.append(doneBtn);
    b_con.append(undoBtn);
    b_con.append(deleteBtn);
  item.append(b_con);
  
  input.value = "";
  button.classList.remove("valid");
  return item;
}