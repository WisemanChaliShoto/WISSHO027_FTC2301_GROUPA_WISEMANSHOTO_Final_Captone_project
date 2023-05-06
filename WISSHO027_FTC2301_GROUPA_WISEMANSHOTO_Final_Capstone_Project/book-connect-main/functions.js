import {extracted}from './scripts.js'
import { authors } from './data.js'

export const createPreview =( props) =>{
     for (const { author, image, title, id }of extracted) {
        const { author: authorId, id, image, title } = props

        let element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)

        element.innerHTML = /* html */ `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${author[authorId]}</div>
            </div>
        `

        return element
    }

}
// // 5
export const createPreviewsFragment  = (array , start, end) => {
    
    const extracted = array.slice(start, end);

    let previewFragment = document.createDocumentFragment();

    for (let book of extracted){

        let { author, image, title, id } = book;
        author = authors[author];
    
        const preview = {
            author,
            id,
            image,
            title,
        };
        previewFragment.appendChild(createPreview(preview));
    };
    return previewFragment;
};