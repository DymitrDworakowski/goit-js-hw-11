import './css/styles.css';
import { PixabayImages } from './js/pixabay';
import { refs } from './js/getRefs';
import { LoadMoreBtn } from './js/load-more-btn';
import { makeImageMarkup } from './js/markupService';
import Notiflix  from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const pixabayImages = new PixabayImages();
const loadMoreBtn = new LoadMoreBtn({ selektor: '.load-more', hidden: true });
const lightbox = new SimpleLightbox('.gallery a', { captionDelay
    : 250,
});


function onSearch(e) {
    e.preventDefault();
    const currentWord = e.currentTarget.elements.searchQuery.value.trim();
    if (currentWord === '') {
        return Notiflix.Notify.info(`Enter a word to search for images.`);
    }
    pixabayImages.searchQuery = currentWord;
    loadMoreBtn.show();
    pixabayImages.resetPage();
    clearImageContainer();
    fetchImages();
}

function clearImageContainer() {
    refs.containerDiv.innerHTML = '';
}

async function fetchImages() {
    try {
    loadMoreBtn.disabled();
    const { data } = await pixabayImages.fetchImages();
    if (data.total === 0) {
    Notiflix.Notify.failure(`Sorry, there are no images matching your search query: ${pixabayImages.searchQuery}. Please try again.`);
    loadMoreBtn.hide();
    return;
    }
    appendImagesMarkup(data);
    onPageScrolling()
    lightbox.refresh();
    const { totalHits } = data;

    if (refs.containerDiv.children.length === totalHits ) {
      Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`);
      loadMoreBtn.hide();
    } else {
      loadMoreBtn.enable();
    //   Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }
    } catch (error) {
    handleError(error);
    }
    };

function handleError() {
    console.log('Error!');
}

function appendImagesMarkup(data) {
    refs.containerDiv.insertAdjacentHTML('beforeend', makeImageMarkup(data));
}

//  Плавная прокрутка страницы после запроса и отрисовки каждой следующей группы изображений
function onPageScrolling(){ 
    const { height: cardHeight } = refs.containerDiv
        .firstElementChild.getBoundingClientRect();
        window.scrollBy({
        top: cardHeight * 0,
        behavior: "smooth",
        });
}

refs.formSearch.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);