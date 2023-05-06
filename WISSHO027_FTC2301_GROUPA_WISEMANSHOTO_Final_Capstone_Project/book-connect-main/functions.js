import { books, genres, authors, BOOKS_PER_PAGE } from "./data.js";

import { SHOW_MORE_BTN, lightToggleDialog, data, FRAGMENT } from "./scripts.js";


//Home Display

//This function updates the number of books left and then prints that number on the button used to show more books.

export const updateBooksLeft = () => {
    /* fetch the books that are already on the page then count them and
use the number of books left in the books object to add more books so the button
can stop adding more books when all the books in the object have been added*/
const booksOnPage = data.home.bookCards;
const booksOnPageCount = booksOnPage.length;
//subtract books on page from total books in object
const booksLeft = books.length - booksOnPageCount;
//add the text to the button element
return booksLeft
   }




//This function loads the home page of the website with the books shown in a list of 36 at a time.
 
export const appendBooks = (books) => {

   
    for (let i = 0; i < BOOKS_PER_PAGE; i++) {
        //get the books from index 0 in the books object
        const book = books[i];

        const button = document.createElement('button');

          //create a class and call it preview
          button.classList.add('preview');

               // Set the button's data-preview attribute to the book's id.
           button.dataset.preview = book.id;

      // Set the button's inner HTML to the book's title and author.
      button.innerHTML =/* HTML markup for the book cards */
      `
       <img class="preview__image" src="${book.image}" />
       <div class="preview__info">
         <h3 class="preview__title">${book.title}</h3>
         <div class="preview__author">${authors[book.author]}</div>
       </div>
     `;
     
    // Append the button to the FRAGMENT.
    FRAGMENT.appendChild(button);
}

     // Append the fragment to the data-list-items div.
     data.home.main.appendChild(FRAGMENT);

data.home.SHOW_MORE_BTN.innerHTML = `Show more <span class = "list__remaining">(${updateBooksLeft() - BOOKS_PER_PAGE})</span>`
    }


    //This function will add more books to the page and update
     
export const showMoreAction = (event) => {
        event.preventDefault()
            /* fetch the books that are already on the page then count them and
        use the number of books left in the books object to add more books so the button
        can stop adding more books when all the books in the object have been added*/
        const booksOnPage = document.querySelectorAll('.preview');
        const booksOnPageCount = booksOnPage.length;
        //subtract books on page from total books in object
        const booksLeft = books.length - booksOnPageCount;
        //add the text to the button element
        
        //check if there are still books left in the books object
        if(booksLeft > 0) {
            //add 36 more books to the page using the appendBooks function
            
            appendBooks(books.slice(booksOnPageCount, booksOnPageCount + 36))
        }   
            data.home.SHOW_MORE_BTN.innerHTML = `Show more <span class="list__remaining">(${booksLeft - BOOKS_PER_PAGE})</span>`
    
            // make the summary overlay show when a book is clicked
    
     const bookList = document.querySelectorAll('.preview')
     for (let z = booksOnPageCount; z < books.length; z++ ) {
        bookList[z].addEventListener("click", descriptionOverlay )
     }
        };

        
//Show book summary on click. 



export const descriptionOverlay = (event) => {
    event.preventDefault()

    
    const bookSummary = document.querySelector('[data-list-active]')

    //get the book that is clicked
    const book = event.target.closest('.preview');
    //get a book id to use to fetch book information
    const bookId = book.getAttribute('data-preview');

    //for loop to iterate over the book object lloking for matchind ids
    for (let i = 0; i < books.length; i++) {
        //check if the id in the books object matches that of the clicked book
        if (books[i].id === bookId) {
        //The book summary overlay html
        bookSummary.innerHTML = /*html*/
        `<div class="overlay__preview">
        <img class="overlay__blur" data-list-blur="" src="${books[i].image}">
        <img class="overlay__image" data-list-image="" src="${books[i].image}">
        </div>
        <div class="overlay__content">
        <h3 class="overlay__title" data-list-title="">${books[i].title} (${new Date(books[i].published).getFullYear()})</h3>
        <div class="overlay__data" data-list-subtitle="">${authors[books[i].author]}</div>
        <p class="overlay__data overlay__data_secondary" data-list-description="">${books[i].description}</p>
        </div>
        <div class="overlay__row">
        <button class="overlay__button overlay__button_primary" data-list-close="">Close</button>
        </div>`
        }
    }

        //show the book summary overlay when its done being created
        bookSummary.showModal()

        //when the close button is clicked, the overlay should be removed
        document.querySelector('[data-list-close]').addEventListener("click", () => {
            bookSummary.close()
        })
}

//Search

export const searchBooks = (event) => {
    event.preventDefault();

    const searchText = document.querySelector('[data-search-title]').value.toLowerCase().trim();
    const selectedGenre = document.querySelector('[data-search-genres]').value;
    const selectedAuthor = document.querySelector('[data-search-authors]').value;
  
  
    if (!booksFound) {
       // Clear the book list on the homepage
           document.querySelector('[data-list-items]').innerHTML = "";
       //print this to the page
          document.querySelector('[data-list-items]').innerHTML = `<div class = "list__message list__message_show" data-list-message = "">
                                                              <p>No results found.
                                                              Your filters may be too narrow, try again</p>
                                                          </div>`;

 
    }

    // Clear the book list on the homepage
    document.querySelector('[data-list-items]').innerHTML = "";

     
   // Append the filtered books to the book list, used BOOKs_perpage to show only 36 books per page
   filteredBooks.slice(0, BOOKS_PER_PAGE).forEach(book => {
    const button = document.createElement('button');
    button.classList.add('preview');
    button.dataset.preview = book.id;
    button.innerHTML = `
      <img class="preview__image" src="${book.image}" />
      <div class="preview__info">
        <h3 class="preview__title">${book.title}</h3>
        <div class="preview__author">${authors[book.author]}</div>
      </div>
    `;
    FRAGMENT.appendChild(button);
  });
  document.querySelector('[data-list-items]').appendChild(FRAGMENT);

  // disable the show more button for the results page
  SHOW_MORE_BTN.disabled = true;

  
const searchResultList = document.querySelector('[data-list-items]')
const searchResultBook = searchResultList.querySelectorAll('button')
for (const singleResult of searchResultBook ) {
  singleResult.addEventListener("click", descriptionOverlay);
};

 
 if (!searchText && (selectedAuthor === "All Authors") && (selectedGenre === "All Genres")){
  // Clear the book list on the homepage
  document.querySelector('[data-list-items]').innerHTML = "";
  //print this to the page
 document.querySelector('[data-list-items]').innerHTML = `<div class = "list__message list__message_show" data-list-message = "">
                                                              <p>No results found.
                                                              Your filters may be too narrow, try again</p>
                                                          </div>`;
}
  };

//DARK MODE 

export const changeTheme = (event) => {
    event.preventDefault();
  
    const day = {
      dark: '10, 10, 20',
      light: '255, 255, 255',
    };
    
    const night = {
      dark: '255, 255, 255',
      light: '10, 10, 20',
    };
  
   
}
  