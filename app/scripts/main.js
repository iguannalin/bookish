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

    request.onload = () => {
        request.response['bookItems'].forEach((bookObject) => {
            const book = {
                'title': bookObject['title'],
                'author': bookObject['author'],
                'pages': bookObject['pages'],
                'size': getSizeOfBook(bookObject['pages'])
            };
            renderBooks(book);
        });
    };
    request.send();
}

function renderBooks(item) {
    const element = document.createElement('span');
    const titleElement = document.createElement('span');
    const authorElement = document.createElement('span');
    titleElement.innerHTML = item.title;
    authorElement.innerHTML = item.author;
    element.appendChild(titleElement);
    element.appendChild(authorElement);
    element.style.fontSize = (item.pages / 12).toString() + 'px';
    document.getElementById('canvas').appendChild(element);
}

function init() {
    getAndRenderBooks();
}

init();
