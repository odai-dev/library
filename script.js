const myLibrary = [];

function Book(title, author, pages, readStatus) {
    // the constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus === undefined ? false : readStatus;
    this.id = crypto.randomUUID();
}

function addBookToLibrary() {
    // takes params, create a book then store it in the addBookToLibrary
    const book1 = new Book("Rich dad poor dad", "James ahmed", 5)
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
    addBookToLibrary();
    displayBooks();
})
