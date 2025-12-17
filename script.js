class Book {
            constructor(title, author, pages, read = "Not Read") {
                this.title = title;
                this.author = author;
                this.pages = pages;
                this.read = read;
                this.id = crypto.randomUUID();
            }
            
            info() {
                return `${this.title} by ${this.author}, has ${this.pages} pages, ${this.read}`;
            }
            
            toggleRead() {
                this.read = this.read === "Read" ? "Not Read" : "Read";
            }
        }

class Library {
    constructor() {
        this.books = [];
    }
    
    addBook(title, author, pages) {
        const book = new Book(title, author, pages);
        this.books.push(book);
        return book;
    }
    
    removeBook(bookId) {
        this.books = this.books.filter(book => book.id !== bookId);
    }
    
    findBook(bookId) {
        return this.books.find(book => book.id === bookId);
    }
    
    displayBooks() {
        const tableBody = document.querySelector("tbody");
        tableBody.innerHTML = "";
        
        this.books.forEach(book => {
            const row = document.createElement("tr");
            row.dataset.bookId = book.id;
            
            const title = document.createElement("th");
            const author = document.createElement("td");
            const pages = document.createElement("td");
            const status = document.createElement("td");
            const actions = document.createElement("td");
            
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.className = "remove-btn";
            
            const toggleBtn = document.createElement("button");
            toggleBtn.textContent = "Toggle Read";
            toggleBtn.className = "toggle-btn";
            
            title.textContent = book.title;
            author.textContent = book.author;
            pages.textContent = book.pages;
            status.textContent = book.read;
            
            actions.appendChild(toggleBtn);
            actions.appendChild(removeBtn);
            
            row.appendChild(title);
            row.appendChild(author);
            row.appendChild(pages);
            row.appendChild(status);
            row.appendChild(actions);
            
            tableBody.appendChild(row);
        });
    }
}

const myLibrary = new Library();
const dialog = document.querySelector("dialog");
const newBookBtn = document.querySelector("#get-book");
const submitBtn = document.querySelector("#submit-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const form = document.querySelector("form");
const title = document.querySelector("#book-title");
const author = document.querySelector("#book-author");
const pages = document.querySelector("#book-pages");

newBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    dialog.close();
});

form.addEventListener("submit", (event) => {

    if (!form.checkValidity()) {
        event.preventDefault();
        form.reportValidity();
        return;
    }

    event.preventDefault();

    myLibrary.addBook(title.value, author.value, pages.value);
    myLibrary.displayBooks();
    
    form.reset();
    dialog.close();
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
        const row = e.target.closest("tr");
        const bookId = row.dataset.bookId;
        
        myLibrary.removeBook(bookId);
        myLibrary.displayBooks();
    }

    if (e.target.classList.contains("toggle-btn")) {
        const row = e.target.closest("tr");
        const bookId = row.dataset.bookId;
        
        const book = myLibrary.findBook(bookId);
        book.toggleRead();
        
        myLibrary.displayBooks();
    }
});

title.addEventListener ("invalid", () => {
    if (title.validity.valueMissing) {
        title.setCustomValidity("Please input a book title.");
    } else {
        title.setCustomValidity("");
    }
})

author.addEventListener ("invalid", () => {
    if (author.validity.valueMissing) {
        author.setCustomValidity("Please input the author of the book.");
    } else {
        author.setCustomValidity("");
    }
})

pages.addEventListener ("invalid", () => {
    if (pages.validity.valueMissing) {
        pages.setCustomValidity("Please input number of pages.");
    } else {
        pages.setCustomValidity("");
    }
})