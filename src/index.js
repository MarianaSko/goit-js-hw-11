import { PixabayAPI } from "./partials/pixabay-api";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { createGalleryCardsTemplate } from "./partials/gallery-cards";

const refs = {
    formEL: document.querySelector('.search-form'),
    galleryContainerEl: document.querySelector('.gallery'),
    loadMoreBtnEl: document.querySelector('.load-more')
}

const { formEL, galleryContainerEl, loadMoreBtnEl } = refs;

formEL.addEventListener('submit', onFormElSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

const pixabayAPI = new PixabayAPI();

async function onFormElSubmit(event) {
    event.preventDefault();

    const { target: searchFormEl } = event;

    pixabayAPI.query = searchFormEl.elements.searchQuery.value;
    pixabayAPI.page = 1;

    try {
        const { data } = await pixabayAPI.fetchImagesByQuery();

        if (data.hits.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            searchFormEl.reset();
            return;
        }

        if (data.totalHits <= 40) {
            loadMoreBtnEl.classList.add('is-hidden');
            galleryContainerEl.innerHTML = createGalleryCardsTemplate(data.hits);
            return;
        }

        loadMoreBtnEl.classList.remove('is-hidden');
        galleryContainerEl.innerHTML = createGalleryCardsTemplate(data.hits);
        lightbox.refresh();
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
    }

    catch (err) {
        Notiflix.Notify.failure(err.message);
    };

}
async function onLoadMoreBtnClick(event) {

    pixabayAPI.page += 1;

    try {
        const { data } = await pixabayAPI.fetchImagesByQuery();
        galleryContainerEl.insertAdjacentHTML('beforeend', createGalleryCardsTemplate(data.hits));
        lightbox.refresh();

        if (data.hits.length === 0) {
            loadMoreBtnEl.classList.add('is-hidden');
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
        }

    } catch (err) {
        Notiflix.Notify.failure(err.message);
    }
}

var lightbox = new SimpleLightbox('.lightbox a');
