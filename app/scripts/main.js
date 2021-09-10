function norm(x, y1, y2, toString) {
    let r = (x / y1) % y2;
    return toString ? (r.toString() + 'px') : r;
}

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
            if (bookObject.title) {
                const book = {
                    'title': bookObject['title'],
                    'author': bookObject['author'],
                    'pages': bookObject['pages'],
                    'size': getSizeOfBook(bookObject['pages'])
                };
                renderBooks(book);
            }
        });
    };
    request.send();
}

function renderBooks(item) {
    const canvas = document.getElementById('canvas');
    const canvasHeight = canvas.clientHeight;
    const element = document.createElement('div');
    const titleElement = document.createElement('p');
    const authorElement = document.createElement('span');
    titleElement.classList.add('title');
    authorElement.classList.add('author');
    titleElement.innerHTML = item.title;
    authorElement.innerHTML = item.author;
    element.appendChild(titleElement);
    element.appendChild(authorElement);
    element.style.fontSize = norm(item.pages, 25, canvasHeight, true);
    element.classList += ('book ' + item.size);
    canvas.appendChild(element);
}

function init() {
    getAndRenderBooks();
}

init();
