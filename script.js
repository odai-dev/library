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
}

function displayBooks() {
    const tableBody = document.querySelector(".books-table-body")
    tableBody.innerHTML = ""
    myLibrary.forEach(book => {
        const row = document.createElement("tr")
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.readStatus ? 'Read' : 'Not Read'}</td> 
        <td><button class="btn remove-book-btn" data-book-id="${book.id}">Remove</button></td>
        `;
        tableBody.append(row)
    })
}

function removeBook(id) {
    
    const initalLength = myLibrary.length;
    myLibrary = myLibrary.filter(book => book.id !== id);

        if (myLibrary.length < initialLength) {
        console.log(`Book with ID '${id}' removed.`);
    } else {
        console.log(`Book with ID '${id}' not found.`);
    }
    // Re-displayBooks after removal
    displayBooks();
    
}

// Function to attach listeners to remove buttons
function attachRemoveButtonListeners() {
    document.querySelectorAll(".remove-book-btn").forEach(button => {
        button.onclick = null;
        button.addEventListener('click', () => {
            const bookId = button.dataset.bookId;
            removeBook(bookId)
        })
    }) 
}

document.addEventListener('DOMContentLoaded', () => {
    displayBooks();

    const dialog = document.querySelector("dialog");
    const newBookBtn = document.querySelector("#newBookBtn");
    const newBookForm = document.querySelector("dialog form");


    // New book button opens the dialog modally
    newBookBtn.addEventListener("click", () => {
        newBookForm.reset(); // Clear form fields when opening
        dialog.showModal();
    })
    
    // Save button saves the input and close the dialog 
    newBookForm.addEventListener("submit", event => {
        event.preventDefault();

        // Get input fom the form
        const title = document.querySelector(".title-input").value;
        const author = document.querySelector(".author-input").value;
        const pages = parseInt(document.querySelector(".pages-input").value);
        let readStatus = false;
        document.querySelectorAll("input[name='read_status']").forEach(radio => {
            if (radio.checked) {
                // Convert string "true"/"false" to boolean true/false
                readStatus = (radio.value === "true");
            }
        })

        // Basic validation 
        if (!title || !author || isNaN(pages) || pages <= 0) {
            alert("Please fill in all fields correctly (Pages must be a positive number).");
            return; // Stop the function if validation fails
        }

        // Save the book to the library
        addBookToLibrary(title, author, pages, readStatus);

        // close the dialog and displayBooks
        dialog.close();
        displayBooks();
    })

    
})
