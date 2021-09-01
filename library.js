const addButton = document.querySelector(".add-book");
const tableBooks = document.querySelector(".books");
const bookTitle = document.querySelector(".book-title");
const bookAuthor = document.querySelector(".book-author");
const bookPages = document.querySelector(".book-pages");
const bookStatus = document.querySelector("#read");

const validationBook = document.querySelector(".validationBook");
const validationAuthor = document.querySelector(".validationAuthor");
const validationPages = document.querySelector(".validationPages");

const titleID = document.querySelector("#title");
const authorID = document.querySelector("#author");
const pagesID = document.querySelector("#pages");

const readBooks = document.querySelector(".read-books");
const unreadBooks = document.querySelector(".unread-books");
const allBooks = document.querySelector(".all-books");

let myLibrary = [];
let myLibraryAll = [];

let totalBook = 2;
let hasRead = 0;
let unRead = 2;

document.addEventListener("DOMContentLoaded", getBooks); // run getBooks if everything loads up
addButton.addEventListener("click", addBookToLibrary);
tableBooks.addEventListener("click", bookSetting);

showCase();

// function Book() {
// the constructor...
// }

function addBookToLibrary(event) {
  event.preventDefault();
  checkValidation();
  if (
    bookTitle.value === "" ||
    bookAuthor.value === "" ||
    bookPages.value === "" ||
    bookPages.value <= 0
  ) {
    return;
  } else {
    myLibrary.push(bookTitle.value, bookAuthor.value, bookPages.value);
    console.log(myLibrary);
    myLibraryAll.push(bookTitle.value, bookAuthor.value, bookPages.value);
    saveLocalBooks(myLibrary);
    console.log(myLibraryAll);

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
    if (bookStatus.checked) {
      newTd = document.createElement("td");
      const completedButton = document.createElement("button");
      completedButton.setAttribute("class", "fas fa-check completed-btn");
      completedButton.setAttribute("id", "completed-btn");
      newTd.appendChild(completedButton);
      newTr.appendChild(newTd);
      hasRead++;
      totalBook++;
      showCase();
    } else {
      newTd = document.createElement("td");
      const completedButton = document.createElement("button");
      completedButton.setAttribute("class", "fas fa-times complete-btn");
      //completedButton.setAttribute("id", "complete-btn");
      newTd.appendChild(completedButton);
      newTr.appendChild(newTd);
      unRead++;
      totalBook++;
      console.log(totalBook);
      showCase();
    }

    //Create Delete Button
    newTd = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "fas fa-trash trash-btn");
    //deleteButton.setAttribute("id", "trash-btn");
    newTd.appendChild(deleteButton);
    newTr.appendChild(newTd);

    myLibrary = [];
  }
  showCase();
}

function checkValidation() {
  // if input's value is empty then show required warning
  if (bookTitle.value === "") {
    validationBook.setAttribute("id", "title-text");
  }
  if (bookAuthor.value === "") {
    validationAuthor.setAttribute("id", "author-text");
  }
  if (
    bookPages.value === "" ||
    bookPages.value.match(/[^1-9]/) ||
    bookPages.value <= 0
  ) {
    validationPages.setAttribute("id", "pages-text");
  }

  // if input's value is not empty then do not show required warning
  if (bookTitle.value !== "") {
    validationBook.setAttribute("id", "author-text-checked");
  }
  if (bookAuthor.value !== "") {
    validationAuthor.setAttribute("id", "pages-text-checked");
  }
  if (bookPages.value !== "") {
    validationPages.setAttribute("id", "title-text-checked");
  }
}

function bookSetting(event) {
  const item = event.target;
  console.log(item.classList[2]);
  // if trash button is pressed then delete the book's info
  if (item.classList[2] === "trash-btn") {
    const book = item.parentNode.parentNode;
    book.remove();
    removeLocalBooks(book);
    const bookChild = book.children[3].childNodes[0];
    console.log(bookChild);

    // check if book hasnt been read then decrease unRead
    if (bookChild.className === "fas fa-times complete-btn") {
      unRead--;
    } else if (bookChild.className === "fas fa-check completed-btn") {
      hasRead--;
    }

    totalBook--;
    showCase();
  }
  // if check button is pressed then change book's status to read
  if (item.classList[2] === "complete-btn") {
    const book = item.parentNode;
    console.log(book);

    const bookChild = book.children[0];
    console.log(bookChild);

    setTimeout(() => {
      bookChild.setAttribute("class", "fas fa-check completed-btn");
    }, 50);
    hasRead++;
    unRead--;
    showCase();
  }

  // if checked button is pressed then change book's status to havent completed read
  if (item.classList[2] === "completed-btn") {
    const book = item.parentNode;
    const bookChild = book.children[0];
    bookChild.setAttribute("class", "fas fa-times complete-btn");
    bookChild.setAttribute("id", "complete-btn");
    hasRead--;
    unRead++;
    showCase();
  }
}

function showCase() {
  readBooks.innerHTML = "Books read: " + hasRead;
  unreadBooks.innerHTML = "Books unread: " + unRead;
  allBooks.innerHTML = "Total Book: " + totalBook;
  //console.log(totalBook);
}

function saveLocalBooks(book) {
  console.log("localStorage: " + book);
  let books;
  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
}

function getBooks() {
  let books;
  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    // assumes the local storage isnt empty, take the data back and then parse into an array
    books = JSON.parse(localStorage.getItem("books"));
  }
  books.forEach(function (book) {
    // create new tr
    const newTr = document.createElement("tr");
    newTr.classList.add("books-info");
    tableBooks.appendChild(newTr);

    // create new td, complete button, and delete button
    let newTd;
    for (let i = 0; i < book.length; i++) {
      newTd = document.createElement("td");
      newTd.innerText = book[i];
      newTr.appendChild(newTd);
    }

    // Create mark button
    if (bookStatus.checked) {
      newTd = document.createElement("td");
      const completedButton = document.createElement("button");
      completedButton.setAttribute("class", "fas fa-check completed-btn");
      completedButton.setAttribute("id", "completed-btn");
      newTd.appendChild(completedButton);
      newTr.appendChild(newTd);
      hasRead++;
      totalBook++;
      showCase();
    } else {
      newTd = document.createElement("td");
      const completedButton = document.createElement("button");
      completedButton.setAttribute("class", "fas fa-times complete-btn");
      //completedButton.setAttribute("id", "complete-btn");
      newTd.appendChild(completedButton);
      newTr.appendChild(newTd);
      unRead++;
      totalBook++;
      showCase();
    }

    //Create Delete Button
    newTd = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "fas fa-trash trash-btn");
    //deleteButton.setAttribute("id", "trash-btn");
    newTd.appendChild(deleteButton);
    newTr.appendChild(newTd);
  });
}

function removeLocalBooks(book) {
  let books;

  // if the local storage is null then an empty array will be created
  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    // assumes the local storage isnt empty, take the data back and then parse into an array
    books = JSON.parse(localStorage.getItem("books"));
  }
  const bookIndex = book.children[0].innerText; // todo.children[0] is the ul inside the div
  books.splice(books.indexOf(bookIndex), 1);
  console.log(book.children);
  localStorage.setItem("books", JSON.stringify(books));
}
