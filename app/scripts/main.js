function getSizeOfBook(pages) {
    switch (true) {
        case pages > 750:
            return 'epic';
        case pages > 500:
            return 'large';
        case pages > 250:
            return 'medium';
        default:
            return 'small';
    }
}

function getAndRenderBooks() {
    const requestURL = '../books.json';
    const request = new XMLHttpRequest();
    request.responseType = 'json';
    request.open('GET', requestURL);

    let bookList = [];
    request.onload = () => {
        request.response['bookItems'].forEach((bookObject) => {
            bookList.push({
                'title': bookObject['title'],
                'author': bookObject['author'],
                'pages': bookObject['pages'],
                'size': getSizeOfBook(bookObject['pages'])
            });
        });
        renderBooks(bookList);
    };
    request.send();
    return bookList;
}

function createBookElement(item) {
    const element = document.createElement('span');
    const titleElement = document.createElement('span');
    const authorElement = document.createElement('span');
    titleElement.innerHTML = item.title;
    authorElement.innerHTML = item.author;
    element.appendChild(titleElement);
    element.appendChild(authorElement);
    element.style.fontSize = (item.pages/12).toString() + 'px';
    return element;
}

function renderBooks(books) {
    console.log('book render', books, typeof books, books.length);
    books.forEach((book) => {
        document.getElementById('canvas').appendChild(createBookElement(book));
    });
}

function init() {
    getAndRenderBooks();
}

init();
