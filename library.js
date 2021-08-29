const addButton = document.querySelector(".add-book");
const tableBooks = document.querySelector(".books");
const bookTitle = document.querySelector(".book-title");
const bookAuthor = document.querySelector(".book-author");
const bookPages = document.querySelector(".book-pages");

addButton.addEventListener("click", addBookToLibrary);
let myLibrary = [];

function Book() {
  // the constructor...
}

function addBookToLibrary(event) {
  event.preventDefault();
  console.log("yay");
  myLibrary.push(bookTitle.value, bookAuthor.value, bookPages.value);
  console.log(myLibrary);
  // do stuff here

  // create new tr
  const newTr = document.createElement("tr");
  newTr.classList.add("books-info");
  tableBooks.appendChild(newTr);
  console.log("yay2");

  // create new td
  // let newTd;
  for (let i = 0; i < myLibrary.length; i++) {
    newTd = document.createElement("td");
    newTd.innerText = myLibrary[i];
    console.log(myLibrary[i]);
    newTr.appendChild(newTd);
  }

  myLibrary = [];
  // newTr.appendChild(newTd);
}
