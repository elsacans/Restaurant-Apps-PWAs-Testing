import FavoriteRestoIdb from '../../data/favorite-resto-idb';
import { createRestoItemTemplate } from '../templates/templates-creator';

const Favorite = {
    async render() {
        return `
            <div id="main-content" class="content">
                <h2 class="content__title">Your Favorite Restaurants</h2>
                <div id="restaurants" class="restaurants"></div>
            </div>
        `;
    },

    async afterRender() {
        const restaurants = await this.getFavoriteRestaurants();
        this.displayFavoriteRestaurants(restaurants);
    },

    async getFavoriteRestaurants() {
        return await FavoriteRestoIdb.getAllResto();
    },

    displayFavoriteRestaurants(restaurants) {
        const restaurantsContainer = document.querySelector('#restaurants');
        const jumbotron = document.querySelector('.hero');
        jumbotron.style.display = 'none';

        if (restaurants.length === 0) {
            this.showNoFavoritesMessage(restaurantsContainer);
        } else {
            this.renderRestaurants(restaurants, restaurantsContainer);
        }
    },

    showNoFavoritesMessage(container) {
        container.innerHTML = `
            <div class="restaurant-item__not__found">
                You don't have a favourite restaurant.
            </div>
        `;
    },

    renderRestaurants(restaurants, container) {
        container.innerHTML = ''; 
        restaurants.forEach((restaurant) => {
            container.innerHTML += createRestoItemTemplate(restaurant);
        });
    },
};

export default Favorite;