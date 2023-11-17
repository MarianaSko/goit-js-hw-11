export function createGalleryCardsTemplate(images) {
  return images.map(image => {


    return `
    <div class="photo-card gallery-item">
      <div class="lightbox">
        <a href="${image.largeImageURL}">
           <img  class="gallery-img" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" /></a>
      </div>
                <div class="info">
                  <p class="info-item">
                    <span>Likes: </span>${image.likes}
                  </p>
                  <p class="info-item">
                    <span>Views: </span>${image.views}
                  </p>
                  <p class="info-item">
                    <span>Comments: </span>${image.comments}
                  </p>
                  <p class="info-item">
                    <span>Downloads: </span>${image.downloads}
                  </p>
                </div>
                
                </div>`
  }).join('');
}