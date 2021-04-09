import "css/icomoon.css";
import "css/constants.css";
import "css/main.css";
import "css/nav.css";
import "css/print.css";
import "css/grid.css";
import "css/footer.css";
import "css/page.css";
import JsonStorage from 'lib/JsonStorage';


import tmpTask from 'templates/task.hbs';
import tmphello from 'templates/hello.hbs';
//import Bookmark from "model/bookmark";

navigator.serviceWorker.register('sw.js');

const changePage = (event) => {
  let anchor = document.location.hash;
  if (!anchor) anchor = "#todo";
 

  // Je cache toutes les pages
  // $(".page").hide();
  let pages = document.querySelectorAll(".page");
  for (let page of pages) page.classList.add('hidden');

  // afficher la page demandée
  // $(anchor).show();
  let currentPage = document.querySelector(anchor);
  currentPage.classList.remove('hidden');
}
//HTML api History
window.addEventListener("popstate", changePage);
//$(window).trigger("popstate");
changePage();



//$("#wrapper nav").on("click", evt => {});
document.querySelector("#wrapper nav").addEventListener("click", evt => {
  // detection de media queries pour la gestion du click du menu sur "mobile"
  if (!window.matchMedia("screen and (max-width: 32rem), screen and (max-device-width: 32rem)").matches) return;

  let menu = document.querySelector("#wrapper nav ul");
  console.log("test");
  //$("#wrapper nav ul").toggle();
  menu.toggleAttribute('show');
  // correct menu.classList.toggle('show');
});

/*
const tasks = [
  {label: "task 1", date: "2020.03.01"},
  {label: "task 2", date: "2020.03.02"}
];

//local test
localStorage.setItem('cle', JSON.stringify(tasks));
let data = JSON.parse(localStorage.getItem('cle'));
console.log(data.lenght);*/

/*
let configStorage = new JsonStorage({name: 'config'});configStorage.setItem('color', "blue");*/

	

//ajout task

let taskStorage = new JsonStorage({
  name: "tache",
  eventName: "tasks-changed"
});


let filterStorage = new JsonStorage({
  name: "tasks-filter",
  eventName: "tasks-changed"
});  


document.getElementById("sub")
  .addEventListener("click", function(event) {
    let tache = document.getElementById("taskform").value;
    let date = document.getElementById("date").value;
    console.log(tache);
    console.log(date);
    taskStorage.addItem({task: tache, date: date});    

    event.preventDefault();
  });



  document.getElementById("todo-list-test")
    .addEventListener("click", function(event)
    {
     console.log(event.currentTarget, event.target);
//vérifier boutton
      if(event.target.dataset.role != "delete")
      {
        return;
      }
     console.log("OK");

     taskStorage.removeItem(event.target.dataset.key);
      event.preventDefault();
    });

//en ligne hors ligne

document.getElementById('airplane')
.addEventListener("click", function (event)
  {
    document.getElementById('airplane').style.color = '#FF0000';
    console.log("click");
    window.navigator.offLine;
    
    event.preventDefault();
  });

console.log(window.navigator.onLine);



window.addEventListener('offline', (event) => {
  console.log("You are now disconnected to the network.");
  document.getElementById('airplane').style.color = '#FF0000';
});

window.addEventListener('online', (event) => {
  console.log("You are now connected to the network.");
  document.getElementById('airplane').style.color = '#00c9a7';
  
});


//taskStorage.addItem({task: "Finir le tp", date: "2021.03.08"});
//taskStorage.addItem({task: "Finir le tp ", date: "2021.06.08"});

//console.log(taskStorage);

let compareTask = (t1,t2) =>
{
 return t1.date.localeCompare(t2.date);
}

const updateDomTasks = () => {
 let dom = document.getElementById("todo-list-test");
 dom.textContent = "";

 let tabTask = taskStorage.toArray();
 console.log(tabTask);
 //FIltre new;
 let today = (new Date()).toISOString();
 let sortedTask = taskStorage.sort(compareTask); // old


let filter = filterStorage.getItem("filter");
 console.log(filterStorage.getItem("filter"));

 if (filter =="past"){
   sortedTask = sortedTask.filter(([key,task])=> task.date < today);

 }

for (let [key, task] of sortedTask) {
  //console.log(key);
  //console.log(task);
  dom.insertAdjacentHTML('beforeend', tmpTask({...task, key}));
}


};


//gestion filter todolist
document.querySelector('filters').addEventListener("click",  evt=>{

 // console.log(evt.currentTarget);
  //console.log(evt.target);
  //console.log(evt.target.closest('button'));

  let btn = evt.target;
  let filter = btn.dataset.filter;
//verifire si bien sur l'event
  if(!filter) return;
  filterStorage.setItem('filter', filter);

});

window.addEventListener("tasks-changed", updateDomTasks);

updateDomTasks();

/*
let html = tmpTask(tasks);
//let html =  tmplTasks(tasks);

document.querySelector("todo-list")
        .insertAdjacentHTML('beforeend', html);


let html2 = tmphello({label: "Yolo", date: "2020.03.02"});
console.log(html2);
document.querySelector("todo-list").insertAdjacentHTML('beforeend', html2);

console.log(localStorage);*/