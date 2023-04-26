import Notiflix from "notiflix";
import Axios from "axios";
import SimpleLightbox from "simplelightbox";

const input = document.querySelector(".input");
const form = document.querySelector(".search-form");
const button = document.querySelector(".button");
const divImg = document.querySelector(".photo-card");
const URL = "https://pixabay.com/api/?key=35794671-989ac978d0f5c3155771be810";

form.addEventListener("input",searcImage);

function searcImage(evt) {
    const value = evt.target.value;
    fetch(`${URL}&q=${value}`).then(resp =>{
        if(!resp.ok){
            Notiflix.Notify.failure(resp.statusText);
        }
        return resp.json();
        

    }).then((data) =>{
        divImg.innerHTML = "";    
        data.forEach((img) => {
            const images = document.createElement("img");
            images.src = img.imageURL;
        })
        
    }) .catch(error => {
        // Обробка помилок
        Notiflix.Notify.failure('Помилка отримання даних:', error);
    });
    
}



/* <img src="" alt="" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
        </p>
        <p class="info-item">
          <b>Views</b>
        </p>
        <p class="info-item">
          <b>Comments</b>
        </p>
        <p class="info-item">
          <b>Downloads</b>
        </p> */