console.log("test");
import JsonStorage from 'lib/JsonStorage';
import tmpPersonne from 'templates/persone.hbs';
import tmpPersonneListe from 'templates/personeListe.hbs';
import tmpPretListe from 'templates/pretListe.hbs';

navigator.serviceWorker.register('sw.js');

const changePage = (event) => {
  let anchor = document.location.hash;
  console.log(anchor);
  if (!anchor) anchor = "#persons";
 

  // Je cache toutes les pages
  // $(".page").hide();
  let pages = document.querySelectorAll(".page");
  console.log(pages);
  for (let page of pages) page.classList.add('hidden');

  // afficher la page demandée
  // $(anchor).show();
  let currentPage = document.querySelector(anchor);
  console.log(currentPage);
  currentPage.classList.remove('hidden');
}
//HTML api History
window.addEventListener("popstate", changePage);
//$(window).trigger("popstate");
changePage();


// gestion menu mobile
document.querySelector("#wrapper nav").addEventListener("click", evt => {
  // detection de media queries pour la gestion du click du menu sur "mobile"
  if (!window.matchMedia("screen and (max-width: 30rem), screen and (max-device-width: 30rem)").matches) return;
  console.log("click menu");
  let menu = document.querySelector("#wrapper nav ul");
  console.log("menu");
 
  
  menu.classList.toggle('show');
});


//ajout personnes dans le local storage

let taskStorage = new JsonStorage({
  name: "personne",
  eventName: "addPersonne"
});

let preStorage = new JsonStorage({
  name: "pret",
  eventName: "addPret"
});

//preStorage.clear();

document.getElementById("adperson")
  .addEventListener("click", function(event) {
    let personne = document.getElementById("person-input-name").value;
    //console.log(personne);
    taskStorage.addItem({personnes: personne});    
    // uniquement string pas d'objet une seul entité
    
    event.preventDefault();
    updateDomTasks();
  });

document.getElementById("addpret")
  .addEventListener("click", function(event) {
    let pret = document.getElementById("loan-input-thing").value;
    let key = document.getElementById("loan-input-person").value;

    console.log(key);
    //console.log(personne);
    console.log("click a jouter pre");
    
    let cle = preStorage.addItem(pret);  
    
    preStorage.setItem(key,pret);
    preStorage.removeItem(cle);
   // preStorage.setItem(key)  
    // uniquement string pas d'objet une seul entité
    
    event.preventDefault();
    updateDomTasks();
  });

  //ajout dans le local sotrage 

 //supression pret


 document.getElementById("loans-list")
 .addEventListener("click", function(event)
 {
  if(event.target.dataset.role != "delete"  )
  {
    return;
  }

  preStorage.removeItem(event.target.dataset.key);
  event.preventDefault();
  updateDomTasks();
  // suppression personnes
});
  document.getElementById("persons-list")
    .addEventListener("click", function(event)
    {
     console.log(event.currentTarget, event.target);
    
     
    let nomPersonne = event.target.dataset.personne;

    console.log(nomPersonne);

     let tabpre = preStorage.toArray();
     console.log(length);

     console.log();
     if (tabpre.length === 0)
     {
         taskStorage.removeItem(event.target.dataset.key);
          event.preventDefault();
          updateDomTasks();
          console.log("ooooo");
     } else
     {
      for (let [key1, pret] of tabpre) {
      
        if (nomPersonne == key1)
        {
          console.log("Ne peut être supprimé car un prêt est en cours");
          break;
          
        }
        else
        {
         
          if(event.target.dataset.role != "delete"  )
          {
            return;
          }
    
          console.log(event.target.dataset.key);
          taskStorage.removeItem(event.target.dataset.key);
          event.preventDefault();
          updateDomTasks();

        };
       
    };
     }


     
   
    });

      
  document.getElementById("persons-list")
  .addEventListener("click", function(event)
  {

   if(event.target.dataset.role != "modifie")
   {
     return;
   }
  console.log("OK modif");
  
    let fenetre = prompt('modifier le nom ');

    let key = event.target.dataset.key;

    let nomPersonne = event.target.dataset.personne;

    console.log(nomPersonne);

    console.log(key);

 
    taskStorage.setItem(key,{personnes: fenetre});
  
    let tabpre = preStorage.toArray();
    //modifier aussi dans prest
    for (let [key1, pret] of tabpre) {
     
      if (nomPersonne == key1)
      {
          console.log("pretModifie");
          preStorage.setItem(key1, fenetre);
  

      }
      updateDomTasks();
    };
   
  // document.location.reload();
    event.preventDefault();
  });

  let triePersonnes = (t1,t2) =>
  {
   return t1.personnes.localeCompare(t2.personnes);
  }
   
    const updateDomTasks = () => {

      let dom2 = document.getElementById("persons-list");
      let dom = document.getElementById("loan-input-person");
      let dom3 = document.getElementById("loans-list");
      dom.textContent = "";
      dom3.textContent ="";
      dom2.textContent="";


      
  
     
      let tabTask = taskStorage.toArray();
     let tabTrie = taskStorage.sort(triePersonnes);

      let tabPret = preStorage.toArray();


      
      //trie par odre alphabetique
     
    //  console.log(tabTask);
    
    
      for (let [key, personne] of tabTrie) {
        console.log("boucle");
       
        //console.log(personne);
        dom.insertAdjacentHTML('beforeend', tmpPersonne({personne:personne.personnes, key}));
        dom2.insertAdjacentHTML('beforeend', tmpPersonneListe({personne:personne.personnes, key}));
      }

      for (let [key, pret] of tabPret) {
        console.log("bpretajouter");
        console.log(pret);
        dom3.insertAdjacentHTML('beforeend', tmpPretListe({pret,key}));
        
      }
     
     
     };
     
     
     window.addEventListener("tasks-changed", updateDomTasks);
     
     
     updateDomTasks();

