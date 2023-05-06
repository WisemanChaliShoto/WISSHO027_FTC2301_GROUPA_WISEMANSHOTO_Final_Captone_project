import { books,
         genres, 
         authors } from "./data.js";

         import {
          appendBooks,
          showMoreAction,
          descriptionOverlay,
          searchBooks,
          changeTheme
        } from './functions.js'
        

//This is the fragment used to create the book button lists html
 
export const FRAGMENT = document.createDocumentFragment()

export const data = {
    'home': {
        bookCards: document.querySelectorAll('preview'),
        main: document.querySelector('[data-list-items]'),
        'SHOW_MORE_BTN': document.querySelector('[data-list-button]'),
        root: document.documentElement,
        logoText: document.querySelector('.header__text'),
        search: document.querySelector('[data-header-search]'),
        theme: document.querySelector('[data-header-settings]')
    },
	'summary': {
		overlay: document.querySelector('[data-list-active]'),
		close: document.querySelector('[data-list-close]'),
	},
    'search': {
        overlay: document.querySelector('[data-search-overlay]'),
        title: document.querySelector('[data-search-title]'),
    },
    'theme': {
        overlay: document.querySelector('[data-settings-overlay]'),

    }
}

export const SHOW_MORE_BTN = document.querySelector('[data-list-button]');



const root = document.documentElement;
root.addEventListener("load", appendBooks(books))

//use event listener to make button load more books with the showMoreAction function
SHOW_MORE_BTN.addEventListener("click", showMoreAction)

/* this event listener return to home button when you click on the book connect
text and logo */
const logo = data.home.logoText
logo.addEventListener("click", (event) => {
	event.preventDefault()

	// Clear the book list on the homepage
	document.querySelector('[data-list-items]').innerHTML = "";
	//call this function to load the page again
	appendBooks(books)
})

/* make the summary overlay show when a book is clicked
 Used a for loop to iterate over all the book buttons so that
 each one can be clicked on*/
 const bookList = document.querySelectorAll('.preview')
 for (const singleBook of bookList) {
	 singleBook.addEventListener("click", descriptionOverlay);
 };
 


/*-------------------------------------------------------------SEARCH------------------------------------------------------- */

/**
 * This is an array of the values of the genres object.
 */
const genreArray = Object.values(genres);
genreArray.unshift("All Genres");

/**
 * This is an array of the values of the authors object.
 */
const authorArray = Object.values(authors);
authorArray.unshift("All Authors")

/**
 * This is the dialog box for the search overlay html
 */
const searchDialog = data.search.overlay

searchDialog.innerHTML = /*html*/
	`<div class="overlay__content">
    <form class="overlay__form" data-search-form="" id="search">
      <label class="overlay__field">
        <div class="overlay__label">Title</div>
        <input class="overlay__input" data-search-title="" name="title" placeholder="Any">
      </label>

      <label class="overlay__field">
        <div class="overlay__label">Genre</div>
        <select class="overlay__input overlay__input_select" data-search-genres="" name="genre">${genreArray.map(genreArray => `<option value="${genreArray}">${genreArray}</option>`)}</select>
      </label>

      <label class="overlay__field">
        <div class="overlay__label">Author</div>
        <select class="overlay__input overlay__input_select" data-search-authors="" name="author">${authorArray.map(authorArray => `<option value="${authorArray}">${authorArray}</option>`)}</select>
      </label>
    </form>

    <div class="overlay__row">
      <button class="overlay__button" data-search-cancel="">Cancel</button>
      <button class="overlay__button overlay__button_primary" type="submit" form="search">Search</button>
    </div>
  </div>`

// Darkmode

export const lightToggleDialog = data.theme.overlay;

lightToggleDialog.innerHTML = /*html*/
	`<div class="overlay__content">
                          <form class="overlay__form" data-settings-form="" id="settings">
                          <label class="overlay__field">
                            <div class="overlay__label">Theme</div>

                            <select class="overlay__input overlay__input_select" data-settings-theme="" name="theme">
                              <option value="day">Day</option>
                              <option value="night">Night</option>
                            </select>
                          </label>
                          </form>

                          <div class="overlay__row">
                          <button class="overlay__button" data-settings-cancel="">Cancel</button>
                          <button class="overlay__button overlay__button_primary" type="submit" form="settings">Save</button>
                          </div>
                          </div>`

// This is the icon on the top left of the homepage, when clicked, it will show the light/dark toggle overlay

const lightToggleBtn = data.home.theme
//This is the event listener that shows the light/dark toggle overlay
lightToggleBtn.addEventListener("click", (event) => {
	event.preventDefault();
	lightToggleDialog.showModal();
})


//save and cancel buttons for the light/toggle overlay
const toggleCancelBtn = lightToggleDialog.querySelectorAll('button')[0]
const toggleSaveBtn = lightToggleDialog.querySelectorAll('button')[1];

//event listener for the save button in the light/dark toggle dialog 
toggleSaveBtn.addEventListener("click", changeTheme)

// event listener for cancel button to reomve overlay 
toggleCancelBtn.addEventListener("click", (event) => {
	event.preventDefault();

	lightToggleDialog.close();

})




