import CONFIG from '../../globals/config';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import FavoriteRestoIdb from '../../data/favorite-resto-idb';

const Detail = {
  async render() {
    return `
      <div id="loading" class="loading">Loading...</div>
      <div id="restaurant-detail" class="restaurant-detail"></div>
      <div id="likeButtonContainer"></div>
      <div id="reviewFormContainer" class="review-form-container">
        <h3>Add Your Review</h3>
        <form id="reviewForm">
          <input type="text" id="reviewName" placeholder="Your Name" required>
          <textarea id="reviewText" placeholder="Your Review" required></textarea>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    `;
  },

  async afterRender() {
    const url = window.location.hash;
    const id = url.split('/')[2];
    
    try {
      const response = await fetch(`${CONFIG.BASE_URL}/detail/${id}`);
      const responseJson = await response.json();
      const { restaurant } = responseJson;
      const jumbotron = document.querySelector('.hero')
      jumbotron.style.display = 'none';

      this._populateRestaurantDetail(restaurant);
      
      LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        favoriteRestaurants: FavoriteRestoIdb,
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          description: restaurant.description,
          pictureId: restaurant.pictureId,
          rating: restaurant.rating,
          city: restaurant.city,
        },
      });

      this._hideLoading();
    } catch (error) {
      console.error('Error fetching restaurant detail:', error);
      this._showErrorMessage();
    }
  },

  _populateRestaurantDetail(restaurant) {
    const detailContainer = document.querySelector('#restaurant-detail');
    detailContainer.innerHTML = `
      <h2 class="restaurant-name">${restaurant.name}</h2>
      <img class="lazyload" id="restaurant-image" data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}">
      <div class="restaurant-info">
        <p class="restaurant-city">🏙️ ${restaurant.city}</p>
        <p class="restaurant-address">🏠 ${restaurant.address}</p>
        <p class="restaurant-rating">⭐ ${restaurant.rating}</p>
      </div>
      <div class="restaurant-description">
        <h3>Description</h3>
        <p>${restaurant.description}</p>
      </div>
      <div class="restaurant-menus">
        <h3>Menus</h3>
        <div class="menu-list">
          <div class="foods">
            <h4>Foods</h4>
            <ul>
              ${restaurant.menus.foods.map(food => `<li>${food.name}</li>`).join('')}
            </ul>
          </div>
          <div class="drinks">
            <h4>Drinks</h4>
            <ul>
              ${restaurant.menus.drinks.map(drink => `<li>${drink.name}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
      <div class="restaurant-reviews">
        <h3>Customer Reviews</h3>
        <ul>
          ${restaurant.customerReviews.map(review => `
            <li>
              <p class="review-name">${review.name}</p>
              <p class="review-date">${review.date}</p>
              <p class="review-text">${review.review}</p>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  },

  _initReviewForm(restaurantId) {
    const reviewForm = document.getElementById('reviewForm');
    reviewForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('reviewName');
      const reviewInput = document.getElementById('reviewText');
      const name = nameInput.value;
      const review = reviewInput.value;

      try {
        const response = await fetch(`${CONFIG.BASE_URL}/review`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: restaurantId,
            name,
            review,
          }),
        });

        const responseJson = await response.json();

        if (responseJson.error === false) {
          alert('Thank you! Your review has been added.');
          this._updateReviews(responseJson.customerReviews);
          
          nameInput.value = '';
          reviewInput.value = '';
        } else {
          alert('Failed to add review. Please try again.');
        }
      } catch (error) {
        console.error('Error posting review:', error);
        alert('Failed to add review. Please check your connection and try again.');
      }
    });
  },

  _updateReviews(customerReviews) {
    const reviewsContainer = document.querySelector('.restaurant-reviews ul');
    reviewsContainer.innerHTML = customerReviews.map((review) => `
      <li>
        <p class="review-name">${review.name}</p>
        <p class="review-date">${review.date}</p>
        <p class="review-text">${review.review}</p>
      </li>
    `).join('');
  },

  _hideLoading() {
    const loadingElement = document.querySelector('#loading');
    loadingElement.style.display = 'none';
  },

  _showErrorMessage() {
    const detailContainer = document.querySelector('#restaurant-detail');
    detailContainer.innerHTML = '<p class="error-message">Failed to load restaurant details. Please try again later.</p>';
    this._hideLoading();
  },
};

export default Detail;