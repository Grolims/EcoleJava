import JsonStorage from lib/JsonStorage;


export default class {

    constructor()
    {
        this.categories = new JsonStorage({name: "bookmar_categ", enventName: "categ-changed"}); 
    
        this.categories = new JsonStorage({name: "bookmar_fav", enventName: "fav-changed"}); 
    }

addCateg(name){
    this.categories.setItem(name,name);
}

}