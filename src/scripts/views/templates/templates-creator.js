import CONFIG from "../../globals/config";

const createRestoItemTemplate = (resto) => `
<div class="resto-item">
    <div class="resto-item_header">
    <img class="lazyload" id="resto-item_header_poster" alt="${resto.name}"
        data-src="${resto.pictureId ? CONFIG.BASE_IMAGE_URL + resto.pictureId : 'https://restaurant-api.dicoding.dev/images/small/${resto.pictureId}'}">
    </div>
    <div class="resto-item_name">
        <h2><a href="/#/detail/${resto.id}">${resto.name}</a></h2>
    </div>
    <div class="resto-item_header_rating"> 
        <p>⭐️<span class="resto-item_header_rating_score">${resto.rating}</span></p>
    </div>
    <div class="resto-item_city">
        <h3>${resto.city}</h3>
    </div>
    <div class="resto-item_description">
        <p>${resto.description}</p>
    </div>
</div>
`;

const createLikeRestoButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;
 
const createUnlikeRestoButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {createRestoItemTemplate, createLikeRestoButtonTemplate, createUnlikeRestoButtonTemplate};