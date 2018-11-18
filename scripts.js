class NoteComponent {
    
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
    
    filterList(notelist, query) {
        var tmpList = [];

        for(let i=0; i < notelist.length; i++) {
            if(notelist[i].name === query) {
                tmpList.push({name: notelist[i].name, description: notelist[i].description});
            }
        }

        return tmpList;
    };
};

let btnAdd = document.getElementById('btn-Add');
let btnDelete = document.getElementById('btn-Delete');
let btnSearch = document.getElementById('btn-Search');

let myList = document.getElementById('note-list');

var noteList = [];
// var testnote = [
//     {name: "noteList[i].name", description: "noteList[i].description"},
//     {name: "asd", description: "123"},
//     {name: "zxc", description: "456"},
//     {name: "qwe", description: "666"},
// ];

// let newcom = new NoteComponent();
// console.log(newcom.filterList(testnote, "asd"));

function insertInnerHTML(title, description){
    let li = document.createElement('li');

    let div = document.createElement('div');
    div.setAttribute("class", "noteElement");
    
    let innerTitle = document.createElement('div');
    innerTitle.innerHTML = title;
    innerTitle.setAttribute("id", "noteElementTitle");

    let innerDescription = document.createElement('div');
    innerDescription.innerHTML = description;
    innerDescription.setAttribute("id", "noteElementDescription");
 
    let button = document.createElement('button');
    button.setAttribute("class", "btn btn-outline-dark btn-xs float-right-forButton ");

    button.innerHTML = "Show";

    button.addEventListener('click', e => {

        let clickedShow = e.target.closest('.noteElement').children;

        //let clickedShowTitle = document.getElementById("noteElementTitle");
        //let clickedShowDescription = document.getElementById("noteElementDescription");

        let name = document.getElementById('note-title');
        let description = document.getElementById('note-body');
        
        name.value = clickedShow[0].innerHTML;
        description.value = clickedShow[1].innerHTML; 
    });

    div.appendChild(innerTitle);
    div.appendChild(innerDescription);

    div.appendChild(button);

    li.appendChild(div);

    return li;
}


function newLi(name, description) {
    let li = document.createElement('li');
    
    let noteComponent = new NoteComponent(name, description);
    noteList.push(noteComponent);

    li = insertInnerHTML(noteComponent.name, noteComponent.description);

    return li;
}

btnAdd.addEventListener('click', function(e) {
    let name = document.getElementById('note-title');
    let description = document.getElementById('note-body');
    if(name.value != "" || description.value != ""){
    let element = newLi(name.value, description.value);
    
    myList.appendChild(element);
    
    name.value = "";
    description.value = "";
    }else {
        alert("write something in the note!")
    }
});

btnSearch.addEventListener('click', function(e) {
    let search = document.getElementById('search-text');
    myList.innerHTML = "";
    if (search.value === "") {
        for(let i=0; i<noteList.length; i++) {
            // if(noteList[i].name === search.value) {
                myList.appendChild(insertInnerHTML( noteList[i].name, noteList[i].description));
            // }
        }
    }
    else {
        for(let i=0; i<noteList.length; i++) {
            if(noteList[i].name === search.value) {
                myList.appendChild(insertInnerHTML( noteList[i].name, noteList[i].description));
            }
        }
    }
});
    
btnDelete.addEventListener('click', function(e) {
    let title = document.getElementById('note-title');
    let description = document.getElementById('note-body');

    for(let i=0; i<noteList.length; i++){
        if(title.value === noteList[i].name) {
            noteList.splice(i, 1);
            myList.removeChild(myList.childNodes[i]); 
        } 
    }

    title.value = "";
    description.value = "";

});

