let myLibrary = [];

function Book(title, author, pages, readStatus) {
    // the constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus === undefined ? false : readStatus;
    this.id = crypto.randomUUID();
}

Book.prototype.toggleReadStatus = function() {
    this.readStatus = !this.readStatus; // Toggles between true and false
}


function addBookToLibrary(title, author, pages, readStatus) {
    // takes params, create a book then store it in the addBookToLibrary
    const newBook = new Book(title, author, pages,  readStatus)
    myLibrary.push(newBook)
}

function displayBooks() {
    const tableBody = document.querySelector(".books-table-body");
    tableBody.innerHTML = "";
    myLibrary.forEach(book => {
        const row = document.createElement("tr")
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.readStatus ? 'Read' : 'Not Read'}</td> 
        <td>
            <button class="btn toggle-read-btn" data-book-id="${book.id}">Toggle Read</button> 
            <button class="btn remove-book-btn" data-book-id="${book.id}">Remove</button>
        </td>
        `;
        tableBody.append(row)
    })

    attachButtonListeners();
}

// Function to remove a book from the library by its ID
function removeBook(id) {
    // Filter out the book with the matching ID and re-assign myLibrary
    myLibrary = myLibrary.filter(book => book.id !== id);

    // Re-display books to update the UI
    displayBooks();
}


function attachButtonListeners() { 
    // Attach listeners for "Remove" buttons
    document.querySelectorAll(".remove-book-btn").forEach(button => {
        button.onclick = null; // Clear previous listeners
        button.addEventListener('click', () => {
            const bookId = button.dataset.bookId;
            removeBook(bookId);
        });
    });

    // Attach listeners for "Toggle Read" buttons
    document.querySelectorAll(".toggle-read-btn").forEach(button => {
        button.onclick = null;
        button.addEventListener('click', () => {
            const bookId = button.dataset.bookId;
            const bookToToggle = myLibrary.find(book => book.id === bookId);

            if(bookToToggle) {
                bookToToggle.toggleReadStatus(); // Call the prototype methode to toggle status
                displayBooks();
            } else {
                console.warn(`Book with ID '${bookId}' not found for toggling read status.`);
            }
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    // Add some initial books for testing purposes
    addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
    addBookToLibrary("1984", "George Orwell", 328, false);
    addBookToLibrary("Pride and Prejudice", "Jane Austen", 432, true);

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
