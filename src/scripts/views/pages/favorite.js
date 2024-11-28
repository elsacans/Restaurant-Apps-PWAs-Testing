import FavoriteRestoIdb from '../../data/favorite-resto-idb';
import { createRestoItemTemplate } from '../templates/templates-creator';

const Favorite = {
    async render() {
        return `
            <div id="main-content" class="content">
                <h2 class="content__heading">Your Favorite Restaurants</h2>
                <div id="restaurants" class="restaurants">
                </div>
            </div>
        `;
    },

    async afterRender() {
        const restaurants = await FavoriteRestoIdb.getAllResto();
        const restaurantsContainer = document.querySelector('#restaurants');
        const jumbotron = document.querySelector('.hero')
        jumbotron.style.display = 'none';
        if (restaurants.length === 0) {
            restaurantsContainer.innerHTML = `
                <div class="restaurant-item__not__found">
                    You don't have any favorite restaurants yet.
                </div>
            `;
        }

        restaurants.forEach((restaurant) => {
            restaurantsContainer.innerHTML += createRestoItemTemplate(restaurant);
        });
    },
};

export default Favorite;