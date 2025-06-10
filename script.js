const myLibrary = [];

function Book(title, author, pages, readStatus) {
    // the constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus === undefined ? false : readStatus;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, readStatus) {
    // takes params, create a book then store it in the addBookToLibrary
    const book1 = new Book(title, author, pages,  readStatus)
    myLibrary.push(book1)
    console.log(myLibrary)
}

function displayBooks() {
    const tabel = document.querySelector(".books-table")
    myLibrary.forEach(book => {
        const row = document.createElement("tr")
        tabel.append(row)
        const titleCol = document.createElement("td")
        titleCol.innerText = book.title
        row.append(titleCol)
        const authorCol = document.createElement("td")
        authorCol.innerText = book.author
        row.append(authorCol)
        const pagesCol = document.createElement("td")
        pagesCol.innerText = book.pages
        row.append(pagesCol)
        const readStatusCol = document.createElement("td")
        readStatusCol.innerText = book.readStatus
        row.append(readStatusCol)
    })
}


document.addEventListener('DOMContentLoaded', () => {
    displayBooks();

    const dialog = document.querySelector("dialog");
    const newBookBtn = document.querySelector("#newBookBtn");
    const newBookForm = document.querySelector("dialog form");


    // New book button opens the dialog modally
    newBookBtn.addEventListener("click", () => {
        dialog.showModal();
    })
    
    // Save button saves the input and close the dialog 
    newBookForm.addEventListener("submit", event => {
        event.preventDefault();

        // Get input fom the form
        const title = document.querySelector(".title-input").value.split();
        const author = document.querySelector(".author-input").value.split();
        const pages = document.querySelector(".pages-input").value.split();
        let readStatus = false;
        document.querySelectorAll("input[name='read_status']").forEach(radio => {
            if (radio.checked) {
                readStatus = radio.value;
            }
        })
        // Save the book to the library
        addBookToLibrary(title, author, pages, readStatus);

        // close the dialog and displayBooks
        dialog.close();
        displayBooks();
    })
    
    
})
