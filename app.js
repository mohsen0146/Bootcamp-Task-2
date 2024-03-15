const notesList = [
    {
      id: 1,
      title: "Coding JavaScript",
      createdAt: "2021-03-13T20:43:34.067Z",
      completed: false,
    },
    {
      id: 2,
      title: "Study physics",
      createdAt: "2024-02-13T20:43:34.067Z",
      completed: true,
    },
    {
      id: 3,
      title: "React.js intervew",
      createdAt: "2023-01-13T20:43:34.067Z",
      completed: true,
    },
    {
      id: 4,
      title: "Cooking",
      createdAt: "2020-04-13T20:43:34.067Z",
      completed: false,
    },
  ];
let filterValue = "all";
let sortValue = "earliest";



// ? Selecting
const noteList = document.querySelector(".noteList");
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");
const selectFilters = document.querySelector(".filter-notes")
const selectSort = document.querySelector(".sort-by-data");
const refreshBtn = document.querySelector(".refresh");



// ? Events

searchForm.addEventListener("submit", filterData )
selectFilters.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterByStatus();
} )
selectSort.addEventListener("change", (e) => {
  sortValue = e.target.value;
  filterByStatus();
} )
document.addEventListener("DOMContentLoaded", (e) =>{
  displayNotes(notesList)
});
refreshBtn.addEventListener("click", () => {
  displayNotes(notesList)
})



// ? Functions

function displayNotes (List){
    let result = [];
    List.forEach((note) => {
        result += ` <li class="note">
        <p class="note__title">${note.title}</p>
        <div class="notelist__details">
        <span class="note__createdAt">${new Date(note.createdAt).toLocaleDateString("fa-IR")}</span>
        
        </div></li>`
    })
    noteList.innerHTML = result;
    searchInput.value = "";
}



function filterData(e){
    e.preventDefault();
    let notes = notesList;
    const filteredNote = notes.filter((note) => note.title.toLowerCase().includes(searchInput.value.toLowerCase()))
    displayNotes(filteredNote);
}

function filterByStatus (event){
    let notes = notesList;
    switch (filterValue){
        case "all":{
          displayNotes(notesList);
          break;
        }
        case "completed": {
          notes = notesList.filter((note) => note.completed);
          displayNotes(notes);
          break;
        };
        case "uncompleted": {
          notes =  notesList.filter((note) => !note.completed);
          displayNotes(notes);
          break;
        };
        default:{
          displayNotes(notes)
        }  
    }
    sortByDate(notes);

}

function sortByDate(list){
  let sortedList = [];
  if (sortValue === "latest"){
    sortedList = list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  }
  else if (sortValue === "earliest"){
    sortedList = list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  };
  displayNotes(list);
}



    