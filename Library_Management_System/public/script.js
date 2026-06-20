async function addBook() {
    const bookName = document.getElementById("bookName").value;
    const authorName = document.getElementById("authorName").value;
    const category = document.getElementById("category").value;
    const price = document.getElementById("price").value;
    const quantity = document.getElementById("quantity").value;

    if (
        bookName === "" ||
        authorName === "" ||
        category === "" ||
        price === "" ||
        quantity === ""
    ) {
        alert("Please fill all fields");
        return;
    }

    const bookData = {
        bookName,
        authorName,
        category,
        price,
        quantity
    };

    const response = await fetch("/add-book", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bookData)
    });

    const result = await response.json();
    alert(result.message);

    clearForm();
    displayBooks();
}

async function displayBooks() {
    const response = await fetch("/books");
    const books = await response.json();

    const table = document.getElementById("bookTable");
    table.innerHTML = "";

    books.forEach((book, index) => {
        table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${book.bookName}</td>
                <td>${book.authorName}</td>
                <td>${book.category}</td>
                <td>₹${book.price}</td>
                <td>${book.quantity}</td>
                <td>
                    <button class="delete-btn" onclick="deleteBook('${book._id}')">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

async function deleteBook(id) {
    const confirmDelete = confirm("Are you sure you want to delete this book?");

    if (confirmDelete) {
        const response = await fetch(`/delete-book/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();
        alert(result.message);

        displayBooks();
    }
}

function clearForm() {
    document.getElementById("bookName").value = "";
    document.getElementById("authorName").value = "";
    document.getElementById("category").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
}

displayBooks();
