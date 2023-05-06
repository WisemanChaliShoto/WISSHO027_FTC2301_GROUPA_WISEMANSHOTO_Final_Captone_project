import {
  BOOKS_PER_PAGE,
  authors,
  genres,
  books
} from './data.js'

 import { createPreview , createPreviewsFragment} from './functions.js';

 const range = [0,36];
 const matches = books
 let page = 1;

 if (!books || !Array.isArray(books)) throw new Error('Source required') 
 if (!range || range.length < 2) throw new Error('Range must be an array with two numbers')

const css = {
  day: {
    dark: '10, 10, 20',
    light: '255, 255, 255',
  },
  night: {
    dark: '255, 255, 255',
    light: '10, 10, 20',
  },
};

const fragment = document.createDocumentFragment()
export const extracted = books.slice(0, 36)


for (const { author, image, title, id } of extracted) {
  const preview = createPreview({
      author,
      id,
      image,
      title
  })

  fragment.appendChild(preview)
}
document.querySelector(`[data-list-items]`).appendChild(fragment)

/**search button** adding function on the search button... add more **/
document.querySelector(`[data-header-search]`).addEventListener('click',()=>{
  document.querySelector(`[data-search-overlay]`).open = true ;
  document.querySelector(`[data-search-title]`).focus();
})


document.querySelector(`[data-settings-cancel]`).addEventListener('click',()=>{
  document.querySelector(`[data-settings-overlay]`).open = false 
 })

 



// 2
document.querySelector(`[data-search-cancel]`).addEventListener('click',()=>{ 
  document.querySelector(`[data-search-overlay]`).open = false 
})

// 3
document.querySelector("[data-header-settings]").addEventListener('click', (event) => {
  document.querySelector("[data-settings-overlay]").open = true;
})

// 4
document.querySelector(`[data-list-button]`).innerHTML = /* html */ `
  <span>Show more</span>
  <span class="list__remaining"> (${matches.length - (page * BOOKS_PER_PAGE) > 0 ? matches.length - (page * BOOKS_PER_PAGE) : 0})</span>
`

// 6
document.querySelector(`[data-list-button]`).addEventListener('click', () => {
  document.querySelector("[data-list-items]").appendChild(createPreviewsFragment(matches, (page * BOOKS_PER_PAGE), (page + 1) * BOOKS_PER_PAGE))
  
  const initial = matches.length - (page * BOOKS_PER_PAGE)
  const hasRemaining = initial > BOOKS_PER_PAGE
  const remaining = hasRemaining ? initial : 0
  document.querySelector(`[data-list-button]`).disabled = initial > 0

  document.querySelector(`[data-list-button]`).innerHTML = /* html */ `
      <span>Show more</span>
      <span class="list__remaining"> (${remaining})</span>
  `

  document.querySelector(`[data-search-overlay]`).open = false

})



// 7
document.querySelector(`[data-settings-theme]`).value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
let theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' : 'day';

// 8
document.querySelector(`[data-settings-form]`).addEventListener('submit',(event)=>{
  event.preventDefault();

  const formData = new FormData(event.target);

  const selected = Object.fromEntries(formData);

  if (selected.theme === 'night') {
      document.documentElement.style.setProperty('--color-dark', css[selected.theme].dark);
document.documentElement.style.setProperty('--color-light', css[selected.theme].light);       
  } else if (selected.theme === 'day') {
      document.documentElement.style.setProperty('--color-dark', css[selected.theme].dark);
document.documentElement.style.setProperty('--color-light', css[selected.theme].light);
  };

  document.querySelector('[data-settings-overlay]').close();
  }) 

document.querySelector(`[data-list-close]`).addEventListener('click',()=>{ 
  document.querySelector(`[data-list-active]`).open = false }
  
  ) 

// /*****genre******/

let genreSection = document.createDocumentFragment()
let element = document.createElement('option')
element.value = 'any'
element.textContent = 'All Genres'
genreSection.appendChild(element)

for (const [id, name] of Object.entries(genres)) {
  document.createElement('option')
  element.value = id
  element.innerText = name
  genreSection.appendChild(element)
}

document.querySelector(`[data-search-genres]`).appendChild(genreSection)


/*****authors *****/
let authorSection = document.createDocumentFragment()
element = document.createElement('option')
element.value = 'any'
element.innerText = 'All Authors'
authorSection.appendChild(element)

for (const [id, name]of Object.entries(authors)) {
  document.createElement('option')
  element.value = id
  element.innerText = name
  authorSection.appendChild(element)
}

document.querySelector(`[data-search-authors]`).appendChild(authorSection);



//added event listener changed click to submit
//document.querySelector(`[data-search-form]`).addEventListener('submit',(event)=>{
//   event.preventDefault();
//   const formData = new FormData(event.target)
//   const filters = Object.fromEntries(formData)
//   result = []


//   for (let i =0 ;i < books.length; i++) {
//       let titleMatch = filters.title.trim() === '' || books[i].title.toLowerCase().includes(filters.title.toLowerCase())
//       let authorMatch = filters.author === 'any' || books[i].author === filters.author
//       let genreMatch = filters.genre === 'any' || books[i].genres.includes(filters.genre); // check if the book's genres include the selected genre


//       if(titleMatch && authorMatch && genreMatch){
//           result.push(books)
//       }
//   };

//      if (display.length < 1){
//           document.querySelector(`[data-list-message]`).classList.add('list__message_show')
//       }
//       else {
//           document.querySelector(`[data-list-message`).classList.remove('list__message_show')
          
//       }
      
  
// }) 
// /******************************************************************/
// document.querySelector(`[data-settings-overlay]`).addEventListener('submit', (event)=>
// {
//   preventDefault()
//   const formData = new FormData(event.target)
//   const result = Object.fromEntries(formData)
//   document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
//   document.documentElement.style.setProperty('--color-light', css[result.theme].light);
//   document.querySelector(`[data-settings-overlay]`).open === false
// })

// document.querySelector(`[data-list-items]`).addEventListener('click',(event)=>{
//   let pathArray = Array.from(event.path || event.composedPath())
//   active;

//   for (node of pathArray) {
//       if (active) break;
//       const previewId = node?.dataset?.preview
  
//       for (const singleBook of books) {
//           if (singleBook.id === id) active = singleBook
//       } 
//   }
  
//   if (!active) return
//   document.querySelector(`[data-list-active]`).open = true
//   document.querySelector(`[data-list-blur]`) + document.querySelector(`[data-list-image]`) === active.image
//   document.querySelector(`[data-list-title]`) === active.title
  
//   document.querySelector(`[data-list-subtitle]`) === `${authors[active.author]} (${Date(active.published).year})`
//   document.querySelector(`[data-list-description]`) === active.description
// }) 


// showPreview()
// import { books,
//          genres, 
//          authors,
//         BOOKS_PER_PAGE } from "./data.js";

// const matches = books
// let page = 1;

// // if (!books && !Array.isArray(books)) throw new Error('Source required') 
// // if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')

// const day = {
//     dark: '10, 10, 20',
//     light: '255, 255, 255',
// }

// const night = {
//     dark: '255, 255, 255',
//     light: '10, 10, 20',
// }

// const fragment = document.createDocumentFragment()
// const extracted = books.slice(0, 36)

// const more_Btn = document.querySelector('[data-list]')

// more_Btn.setAttribute("style", "color: rgba(255, 255, 255, 0.6)");



// //@returns { number }

// function updateBooksLeft() {


//   const booksOnPage = document.querySelectorAll('preview');

//   const booksOnPageCount = booksOnPage.length;

//   const booksLeft = books.length - booksOnPageCount;

//   return booksLeft;
// }
// for ({ author, image, title, id }; extracted; i++) {
//     const preview = createPreview({
//         author,
//         id,
//         image,
//         title
//     })

//     fragment.appendChild(preview)
// }

// data-list-items.appendChild(fragment)

// genres = document.createDocumentFragment()
// element = document.createElement('option')
// element.value = 'any'
// element = 'All Genres'
// genres.appendChild(element)

// for ([id, name]; Object.entries(genres); i++) {
//     document.createElement('option')
//     element.value = value
//     element.innerText = text
//     genres.appendChild(element)
// }

// data-search-genres.appendChild(genres)

// authors = document.createDocumentFragment()
// element = document.createElement('option')
// element.value = 'any'
// element.innerText = 'All Authors'
// authors.appendChild(element)

// for ([id, name];Object.entries(authors); id++) {
//     document.createElement('option')
//     element.value = value
//     element = text
//     authors.appendChild(element)
// }

// data-search-authors.appendChild(authors)

// data-settings-theme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
// v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' | 'day'

// documentElement.style.setProperty('--color-dark', css[v].dark);
// documentElement.style.setProperty('--color-light', css[v].light);
// data-list-button = "Show more (books.length - BOOKS_PER_PAGE)"

// data-list-button.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)

// data-list-button.innerHTML = /* html */ [
//     '<span>Show more</span>',
//     '<span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>',
// ]

// data-search-cancel.click() { data-search-overlay.open === false }
// data-settings-cancel.click() { querySelect(data-settings-overlay).open === false }
// data-settings-form.submit() { actions.settings.submit }
// data-list-close.click() { data-list-active.open === false }

// data-list-button.click() {
//     document.querySelector([data-list-items]).appendChild(createPreviewsFragment(matches, page x BOOKS_PER_PAGE, {page + 1} x BOOKS_PER_PAGE]))
//     actions.list.updateRemaining()
//     page = page + 1
// }

// data-header-search.click() {
//     data-search-overlay.open === true ;
//     data-search-title.focus();
// }

// data-search-form.click(filters) {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const filters = Object.fromEntries(formData)
//     result = []

//     for (book; booksList; i++) {
//         titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
//         authorMatch = filters.author = 'any' || book.author === filters.author

//         {
//             genreMatch = filters.genre = 'any'
//             for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
//         }

//         if titleMatch && authorMatch && genreMatch => result.push(book)
//     }

//     if display.length < 1 
//     data-list-message.class.add('list__message_show')
//     else data-list-message.class.remove('list__message_show')
    

//     data-list-items.innerHTML = ''
//     const fragment = document.createDocumentFragment()
//     const extracted = source.slice(range[0], range[1])

//     for ({ author, image, title, id }; extracted; i++) {
//         const { author: authorId, id, image, title } = props

//         element = document.createElement('button')
//         element.classList = 'preview'
//         element.setAttribute('data-preview', id)

//         element.innerHTML = /* html */ `
//             <img
//                 class="preview__image"
//                 src="${image}"
//             />
            
//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[authorId]}</div>
//             </div>
//         `

//         fragment.appendChild(element)
//     }
    
//     data-list-items.appendChild(fragments)
//     initial === matches.length - [page * BOOKS_PER_PAGE]
//     remaining === hasRemaining ? initial : 0
//     data-list-button.disabled = initial > 0

//     data-list-button.innerHTML = /* html */ `
//         <span>Show more</span>
//         <span class="list__remaining"> (${remaining})</span>
//     `

//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     data-search-overlay.open = false
// }

// data-settings-overlay.submit; {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const result = Object.fromEntries(formData)
//     document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
//     document.documentElement.style.setProperty('--color-light', css[result.theme].light);
//     data-settings-overlay).open === false
// }

// data-list-items.click() {
//     pathArray = Array.from(event.path || event.composedPath())
//     active;

//     for (node; pathArray; i++) {
//         if active break;
//         const previewId = node?.dataset?.preview
    
//         for (const singleBook of books) {
//             if (singleBook.id === id) active = singleBook
//         } 
//     }
    
//     if !active return
//     data-list-active.open === true
//     data-list-blur + data-list-image === active.image
//     data-list-title === active.title
    
//     data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
//     data-list-description === active.description
// }
