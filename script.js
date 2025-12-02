let myLibrary = []

class Book {

    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
    };

    toggleRead() {
    if (this.read === "Read") {
        this.read = "Not Read";
    } else {
        this.read = "Read";
    }
};
};

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read)
    myLibrary.push(book)
    return book
}

function displayBook(array) {
    const tableBody = document.querySelector("tbody")
    tableBody.innerHTML = ""
    
    array.forEach(book => {
        const row = document.createElement("tr")
        row.dataset.bookId = book.id
        
        const title = document.createElement("th")
        const author = document.createElement("td")
        const pages = document.createElement("td")
        const status = document.createElement("td")
        const actions = document.createElement("td")
        
        const removeBtn = document.createElement("button")
        removeBtn.textContent = "Remove"
        removeBtn.className = "remove-btn"
        
        const toggleBtn = document.createElement("button")
        toggleBtn.textContent = "Toggle Read"
        toggleBtn.className = "toggle-btn"
        
        row.appendChild(title)
        row.appendChild(author)
        row.appendChild(pages)
        row.appendChild(status)
        row.appendChild(actions)
        
        actions.appendChild(toggleBtn)
        actions.appendChild(removeBtn)
        
        tableBody.appendChild(row)
        
        title.textContent = book.title
        author.textContent = book.author
        pages.textContent = book.pages
        status.textContent = book.read
    })
}

const dialog = document.querySelector("dialog")
const newBook = document.querySelector("#get-book")
const submit = document.querySelector("#submit-btn")

newBook.addEventListener("click", function() {
    dialog.showModal()
})

submit.addEventListener("click", function(event) {
    const title = document.querySelector("#book-title")
    const author = document.querySelector("#book-author")
    const pages = document.querySelector("#book-pages")
    const read = document.querySelector("#book-status")

    addBookToLibrary(title.value, author.value, pages.value, read.value)
    displayBook(myLibrary)
    event.preventDefault()
    dialog.close()
})


document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        const row = e.target.closest('tr')
        
        const bookId = row.dataset.bookId
        
        myLibrary = myLibrary.filter(book => book.id != bookId)

        console.log("After removal:", myLibrary.length)
        
        displayBook(myLibrary)
    }

    if (e.target.classList.contains('toggle-btn')) {
        const row = e.target.closest('tr')
        const bookId = row.dataset.bookId
        
        const book = myLibrary.find(book => book.id == bookId)
        
        book.toggleRead()
        
        displayBook(myLibrary)
    }
})