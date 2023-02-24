//Array to store book objects
let myLibrary = [];

//Get instance of the button that adds a new book and opens up the modal
const addNewBookButton = document.querySelector(".new-book-button");

//instance to store the modal div
const modalDiv = document.querySelector(".book-form-container-modal");

//Instances to save button and cancel button on form
const saveBookButton = document.querySelector(".store-button");
const cancelBookButton = document.querySelector(".cancel-button");

//Instance to form that adds new book
const addBookForm = document.querySelector(".book-form");

//Variables to store values from new book inputs
let bookAuthor = document.querySelector("#author");
let bookTitle = document.querySelector("#title");
let bookPageNumbers = document.querySelector("#pages");
let bookIsRead = document.querySelector("#isread");

//variable to store the grid that holds the book cards
const libraryGrid = document.querySelector(".library-grid");




function Book(author, title, pages, isread) {
  // the constructor...
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.isread = isread;
}

function addBookToLibrary() {

  let newBook = new Book(bookAuthor.value, bookTitle.value, bookPageNumbers.value, bookIsRead.checked);

  myLibrary.push(newBook);


  renderBook();
}

function renderBook(){

  libraryGrid.innerHTML = "";
  myLibrary.forEach(element => {
    //create a new book card container
    let bookCardContainer = document.createElement("div");
    bookCardContainer.className = "book-card-container";

    //This section adds the book title to the card

    //create a wrapper for the book title
    let bookCardElementTitle = document.createElement("div");
    bookCardElementTitle.className = "book-card-element";

    //Create h3 title for book
    let titleHeading = document.createElement("h3");
    titleHeading.innerHTML = "TITLE";

    //create span to hold Book Title
    let bookCardTitle = document.createElement("span");
    bookCardTitle.innerHTML = element.title;
    bookCardTitle.className = "title-textholder";

    //add title heading and title value as children to the card container
    bookCardElementTitle.appendChild(titleHeading);
    bookCardElementTitle.appendChild(bookCardTitle);

    //This section adds the Author to the book card

    //create a wrapper for the book title
    let bookCardElementAuthor = document.createElement("div");
    bookCardElementAuthor.className = "book-card-element";

    //Create h3 title for book
    let authorHeading = document.createElement("h3");
    authorHeading.innerHTML = "AUTHOR";

    //create span to hold Book Author
    let bookCardAuthor = document.createElement("span");
    bookCardAuthor.innerHTML = element.author;
    bookCardAuthor.className = "author-textholder";

    //add author heading and author value as children to the card container
    bookCardElementAuthor.appendChild(authorHeading);
    bookCardElementAuthor.appendChild(bookCardAuthor);


    //This section adds the pages to the book card

    //create a wrapper for the book title
    let bookCardElementPages = document.createElement("div");
    bookCardElementPages.className = "book-card-element";

    //Create h3 title for book
    let pagesHeading = document.createElement("h3");
    pagesHeading.innerHTML = "PAGES";

    //create span to hold Book Title
    let bookCardPages = document.createElement("span");
    bookCardPages.innerHTML = element.pages;
    bookCardPages.className = "pages-textholder";

    //add pages heading and pages value as children to their parent container
    bookCardElementPages.appendChild(pagesHeading);
    bookCardElementPages.appendChild(bookCardPages);

    //This section adds the buttons to the book card

    //create a wrapper for the buttons
    let bookCardElementButtons = document.createElement("div");
    bookCardElementButtons.className = "book-card-buttons";

    //create read button
    let bookCardReadButton = document.createElement("button");
    bookCardReadButton.className = "toggle-read-state";

    //assign the library item index to the button id. This is used for removing the item from the library or changing read status
    bookCardReadButton.id = myLibrary.indexOf(element);

    //attach eventhandler to read button to toggle state
    bookCardReadButton.addEventListener("click",(event)=>{
      
      if(event.target.classList.contains("is-read")){

        //Change the css and button text
        event.target.classList.remove("is-read");
        event.target.classList.add("not-read");
        event.target.innerHTML = "Not Read";

        //change the value of isread in the library object
        myLibrary[event.target.id].toggleReadStatus();
      }else{

        //change the css and button text
        event.target.classList.remove("not-read");
        event.target.classList.add("is-read");
        event.target.innerHTML = "Read";

        //change the value of isread in the library object
        myLibrary[event.target.id].toggleReadStatus();
      }
    })
    

    //Initialize the isRead button style based on input from the form
    if(element.isread == true) {
      bookCardReadButton.innerHTML = "Read";
      bookCardReadButton.classList.add("is-read");
    }
    else{
      bookCardReadButton.innerHTML = "Not Read";
      bookCardReadButton.classList.add("not-read");
    }


    //create remove button
    let bookCardRemoveButton = document.createElement("button");
    bookCardRemoveButton.className = "remove-book-button";
    bookCardRemoveButton.innerHTML = "Remove";

    //add the book object's index as a dataset to the button
    bookCardRemoveButton.dataset.index = myLibrary.indexOf(element);

    //set event handler to remove book item when clicked
    bookCardRemoveButton.addEventListener("click", (event)=>{

      //remove the object from myLibrary
      deleteBookFromLibrary(myLibrary[event.target.dataset.index]);
      renderBook();
      
    })

    //add buttons to their parent container
    bookCardElementButtons.appendChild(bookCardReadButton);
    bookCardElementButtons.appendChild(bookCardRemoveButton);

    //Add the parent divs to the card container
    bookCardContainer.appendChild(bookCardElementTitle);
    bookCardContainer.appendChild(bookCardElementAuthor);
    bookCardContainer.appendChild(bookCardElementPages);
    bookCardContainer.appendChild(bookCardElementButtons);

    //add the card to the grid
    libraryGrid.appendChild(bookCardContainer);

  });
}

function deleteBookFromLibrary(book) {
  myLibrary.splice(myLibrary.indexOf(book), 1);
}

//button to show or hide modal
addNewBookButton.addEventListener("click", () => {
  modalDiv.classList.remove("hide-modal");
});

//when the cancel button is clicked on the form, the modal should be hidden and form cleared
cancelBookButton.addEventListener("click", ()=>{
  modalDiv.classList.add("hide-modal");
  addBookForm.reset();

})


//When the store button is clicked, the book should be stored and rendered on the page
saveBookButton.addEventListener("click", (event)=>{
  addBookToLibrary();
  event.preventDefault();
  modalDiv.classList.add("hide-modal");
  addBookForm.reset();
})

Book.prototype.toggleReadStatus = () => {
  if(this.isRead){
    this.isRead = false;
  }else{
    this.isRead = true;
  }
}