/**
 * Project Name: API Mileston Project using Open Library Api.
 * Author: Tushar Ahmmed
 */

// handle
const formBtn = document.getElementById('form-btn');
const totalData = document.getElementById('total-data');
const listContainer = document.getElementById('book-container');
const bookStatue = document.getElementById('status');


/**
 * functions
 */

// show no data found
const noDataFound = () => {
    let noDataTitle = document.createElement('h1');
    noDataTitle.classList = 'text-3xl text-center mt-10';
    noDataTitle.innerText = '!No Data Found...';
    noDataTitle.setAttribute("id", "no-data")

    // set error message 
    bookStatue.appendChild(noDataTitle);
}

// toggle preloader
const preloader = (display) => {
    const preloader = document.getElementById('preloader');
    preloader.style.display = display;
}

// show results
const showSearchResults = data => {

    // forEach loop
    data.docs.forEach(item => {
        // extract valuse
        let { author_name, cover_i, title, first_publish_year } = item;
        // if have year
        if (first_publish_year) {
            publishDate = first_publish_year;
        } else {
            publishDate = 'Unknown';
        }
        // if have publisher
        let publisher = item.publisher;

        // create item
        let div = document.createElement('div');
        div.classList = 'books-item mx-auto  pb-4 rounded w-full bg-black cursor-pointer mb-6 sm:mb-0 sm:mx-0';
        // inner html
        div.innerHTML = `<a class="book-thumbnail block relative h-auto overflow-hidden">
                        <img alt="book" class="object-cover object-center w-full h-full block"
                            src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg">
                    </a>
                    <div class="book-info mt-4 mb-4">
                        <p class="book-title text-white text-center font-medium text-lg title-font mb-1">${title}</p>
                        <p class="text-white text-center font-medium text-lg title-font mb-1">Author: ${author_name}</p>
                        <p class="text-white text-center font-medium text-lg title-font mb-1">Published: ${publishDate}</p>
                        <p class="text-white text-center font-medium text-lg title-font mb-1">Publisher: ${publisher ? publisher[0] : 'Unknown'}</p>
                    </div>`;

        listContainer.appendChild(div);
    });

}


// get search data
const getSearchData = searchText => {
    let url = `HTTPS://openlibrary.org/search.json?q=${searchText}&limit=20`;
    // show preloader
    preloader('flex');
    // call api
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.num_found === 0) {
                totalData.innerText = '00';
                // hide preloader
                preloader('none');
                noDataFound();
            } else {
                totalData.innerText = data.numFound.toLocaleString();
                // hide preloader
                preloader('none');
                showSearchResults(data);
            }
        });
}


/**
 * events
 */

formBtn.addEventListener('click', (event) => {
    event.preventDefault();

    // remove prev data
    bookStatue.innerHTML = '';
    listContainer.textContent = '';

    let searchField = document.getElementById('input-value');
    let searchText = searchField.value.toLowerCase();
    // statement
    if (searchText !== '') {
        // call the function
        getSearchData(searchText);
        searchField.value = '';
    }
})