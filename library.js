const addButton = document.querySelector(".add-book");
const tableBooks = document.querySelector(".books");
const bookTitle = document.querySelector(".book-title");
const bookAuthor = document.querySelector(".book-author");
const bookPages = document.querySelector(".book-pages");
const booksInfo = Array.from(document.querySelectorAll(".books-info"));
let myLibrary = [];

addButton.addEventListener("click", addBookToLibrary);
tableBooks.addEventListener("click", bookCheck);

function bookCheck(event) {
  const item = event.target;
  console.log(item.id);
  // if trash button is pressed then delete the book's info
  if (item.id === "trash-btn") {
    const book = item.parentNode.parentNode;
    book.remove();
    console.log(book);
  }
  // if check button is pressed then change book's status to read
  if (item.id === "complete-btn") {
    const book = item.parentNode;
    console.log(book);

    const bookChild = book.children[0];
    console.log(bookChild);

    setTimeout(() => {
      bookChild.setAttribute("class", "fas fa-check completed-btn");
      bookChild.setAttribute("id", "completed-btn");
    }, 50);
  }

  // if checked button is pressed then change book's status to havent completed read
  if (item.id === "completed-btn") {
    const book = item.parentNode;
    const bookChild = book.children[0];
    bookChild.setAttribute("class", "fas fa-times complete-btn");
    bookChild.setAttribute("id", "complete-btn");
  }
}

function Book() {
  // the constructor...
}

function addBookToLibrary(event) {
  event.preventDefault();
  myLibrary.push(bookTitle.value, bookAuthor.value, bookPages.value);
  console.log(myLibrary);

  // create new tr
  const newTr = document.createElement("tr");
  newTr.classList.add("books-info");
  tableBooks.appendChild(newTr);

  // create new td, complete button, and delete button
  let newTd;
  for (let i = 0; i < myLibrary.length; i++) {
    newTd = document.createElement("td");
    newTd.innerText = myLibrary[i];
    console.log(myLibrary[i]);
    newTr.appendChild(newTd);
  }

  // Create mark button
  newTd = document.createElement("td");
  const completedButton = document.createElement("button");
  completedButton.setAttribute("class", "fas fa-times complete-btn");
  completedButton.setAttribute("id", "complete-btn");
  newTd.appendChild(completedButton);
  newTr.appendChild(newTd);

  //Create Delete Button
  newTd = document.createElement("td");
  const deleteButton = document.createElement("i");
  deleteButton.setAttribute("class", "fas fa-trash trash-btn");
  deleteButton.setAttribute("id", "trash-btn");
  newTd.appendChild(deleteButton);
  newTr.appendChild(newTd);

  myLibrary = [];
}
