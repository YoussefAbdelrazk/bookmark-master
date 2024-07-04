var sideBarMove = document.getElementById("sideBarMove");
var translateSideBar = document.getElementById("translateSideBar");
var title = document.getElementById("title");
var searchBar = document.getElementById("searchBar");
var dashboard = document.getElementById("dashboard");
var newBook = document.getElementById("newBook");
var categories = document.getElementById("categories");
var darkMood = document.getElementById("darkMood");
var lightMood = document.getElementById("lightMood");
var sectionContainer = document.getElementById("sectionContainer");
var inputBookMark = document.getElementById("inputBookMark");
var inputUrl = document.getElementById("inputUrl");
var resultBooks = document.getElementById("resultBooks");
var inboxBooks = document.getElementById("inboxBooks");
var NumberOfBooks = document.getElementById("NumberOfBooks");
var submitBtn = document.getElementById("submitBtn");
var updateBtn = document.getElementById("updateBtn");
var btnGroup = document.getElementById("btnGroup");

var booksContainer;
function moveBack() {
    if (translateSideBar.className === "btn-arrow-left active") {


        sideBarMove.style.width = '250px';
        title.style.display = 'block';
        searchBar.style.display = 'block';
        dashboard.style.display = 'block';
        newBook.style.display = 'block';
        categories.style.display = 'block';
        darkMood.style.display = 'block';
        lightMood.style.display = 'block';
        NumberOfBooks.style.display = 'block';
        sectionContainer.style.marginRight = '11.25rem'
        translateSideBar.classList.remove('active');

    } else {
        sideBarMove.style.width = '100px';
        title.style.display = 'none';
        searchBar.style.display = 'none';
        dashboard.style.display = 'none';
        newBook.style.display = 'none';
        categories.style.display = 'none';
        darkMood.style.display = 'none';
        lightMood.style.display = 'none';
        sectionContainer.style.marginRight = '16rem';
        NumberOfBooks.style.display = 'none';
        translateSideBar.classList.add("active");

        console.log(translateSideBar.className);

    }
}
function moveForword() {

}
//_______________add book ________________//
if (localStorage.getItem('myBooks')) {
    booksContainer = JSON.parse(localStorage.getItem('myBooks'))
    displayBooks(booksContainer);
} else {
    booksContainer = [];
}
var reg;
function addBook() {
    var book = {
        bookName: inputBookMark.value,
        bookUrl: inputUrl.value,
    }
    if (reg.test(inputUrl.value)) {
        booksContainer.push(book);
        localStorage.setItem('myBooks', JSON.stringify(booksContainer));
        clearForm()
        displayBooks(booksContainer)
        validateBookName(book.bookName)
        validateBookUrl(book.bookUrl)
    } else {
        var overlay = document.getElementById('overlay');
        var popup = document.getElementById('popup');
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';
        popup.classList.add('open');
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) {
                overlay.style.opacity = '0';
                overlay.style.visibility = 'hidden';
                popup.classList.remove('open');
            }
        });
    }

}

//_______________clear form ________________//

function clearForm() {
    inputBookMark.value = '';
    inputUrl.value = '';
}

//_______________display books ________________//


function displayBooks(array) {
    var booksBox = ``;
    for (var i = 0; i < array.length; i++) {
        booksBox += `
        <div class="col-md-4">
        <div class="card-books py-5 border-1 border rounded-2 text-center">
            <div class="number mb-3" id="number">
                <span class="fs-3 rounded-circle">${i + 1}</span>
            </div>
            <div class="nameOfTheBook" id="nameOfTheBook">
                <h6>${array[i].bookName}</h6>
            </div>
            <div class="btns mt-4">
                <button class="btn btn-primary"><a href="${array[i].bookUrl}" target="_blank"><i class="fa-solid fa-eye"></i></a></button>
                <button onclick="updateData(${i})" class="btn btn-warning"><i class="fa-solid fa-pen-nib"></i></button>
                <button onclick="deleteBooks(${i}) " class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    </div>
`

    }
    inboxBooks.innerHTML = i;
    resultBooks.innerHTML = booksBox;
}

//_______________search for books ________________//

function searchBooks(searchTerm) {
    var searchBookByName = [];
    for (var i = 0; i < booksContainer.length; i++) {
        if (booksContainer[i].bookName.toLowerCase().includes(searchTerm.toLowerCase())) {
            searchBookByName.push(booksContainer[i])
        }
    }
    displayBooks(searchBookByName)
}

//_______________delete books ________________//
var btn = document.createElement('button');
var btnContent = document.createTextNode('Undo');
btn.setAttribute('class', 'btn btn-secondary text-white ms-2 py-2 px-3 border-0 rounded-5');
btn.setAttribute('onclick', 'undo()');
btn.appendChild(btnContent);
var hasDeletedIndex;
var hasDeletedElement;
function deleteBooks(deleteIndex) {
    hasDeletedIndex = deleteIndex;
    hasDeletedElement = booksContainer.splice(deleteIndex, 1);
    localStorage.setItem('myBooks', JSON.stringify(booksContainer));
    displayBooks(booksContainer);
    console.log(deleteIndex);
    btnGroup.appendChild(btn);
}
//_______________undo from removing books ________________//

function undo() {
    booksContainer.splice(hasDeletedIndex, 1, hasDeletedElement[0]);
    localStorage.setItem('myBooks', JSON.stringify(booksContainer));
    displayBooks(booksContainer);
    btn.style.display = 'none';

}



//_______________update books ________________//

var update;
function updateData(updateIndex) {
    update = updateIndex;
    inputBookMark.value = booksContainer[updateIndex].bookName;
    inputUrl.value = booksContainer[updateIndex].bookUrl;
    submitBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
    inputBookMark.focus()
}

function updateBook() {
    var book = {
        bookName: inputBookMark.value,
        bookUrl: inputUrl.value,
    }
    booksContainer.splice(update, 1, book);
    localStorage.setItem('myBooks', JSON.stringify(booksContainer));
    updateBtn.classList.add('d-none');
    submitBtn.classList.remove('d-none');
    clearForm()
    displayBooks(booksContainer)
}

function validateBookName() {
    var regex = /^[A-Z]{1}[a-z]{3,10}\s?\S{0,}$/;
    if (regex.test(inputBookMark.value)) {
        inputBookMark.classList.replace('is-invalid', 'is-valid')
        console.log("true");

    } else {
        inputBookMark.classList.add('is-invalid')
        console.log("fales");
    }
}
function validateBookUrl() {
    var regex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;;
    reg = regex;
    if (regex.test(inputUrl.value)) {
        inputUrl.classList.replace('is-invalid', 'is-valid')
        console.log("true");
    } else {
        inputUrl.classList.add('is-invalid')
        console.log("fales");
    }
}

