import RestoDbSource from "../../data/resto-idb";
import { createRestoItemTemplate } from "../templates/templates-creator";

const Home = {
    async render() {
        return `
            <div class="search-container">
                <input type="text" id="searchInput" placeholder="Search restaurants...">
                <button id="searchButton">Search</button>
            </div>
            <main id="main-content">
                <div class="headline">
                    <h1 class="headline_title">Explore The Restaurant</h1>
                </div>
                <section id="restaurant-list" class="restaurant-list"></section>
            </main>
        `;
    },

    async afterRender() {
        const restaurantContainer = document.querySelector('#restaurant-list');
        const searchInput = document.querySelector('#searchInput');
        // eslint-disable-next-line no-unused-vars
        const searchButton = document.querySelector('#searchButton');

        await this.loadRestaurants();

        this.setupSearch(restaurantContainer, searchInput);
    },

    async loadRestaurants() {
        const restaurants = await RestoDbSource.homeResto();
        this.renderRestaurants(restaurants);
    },

    renderRestaurants(restos) {
        const restaurantContainer = document.querySelector('#restaurant-list');
        restaurantContainer.innerHTML = '';
        restos.forEach((resto) => {
            restaurantContainer.innerHTML += createRestoItemTemplate(resto);
        });
    },

    async searchRestaurants(query) {
        const searchUrl = `https://restaurant-api.dicoding.dev/search?q=${query}`;
        try {
            const response = await fetch(searchUrl);
            const data = await response.json();
            return data.restaurants || [];
        } catch (error) {
            console.error('Error searching restaurants:', error);
            return [];
        }
    },

    setupSearch(restaurantContainer, searchInput) {
        const searchButton = document.querySelector('#searchButton');

        searchButton.addEventListener('click', async () => {
            const query = searchInput.value.trim();
            const searchResults = query ? await this.searchRestaurants(query) : await RestoDbSource.homeResto();
            this.renderRestaurants(searchResults);
        });

        searchInput.addEventListener('keyup', async (event) => {
            if (event.key === 'Enter') {
                const query = searchInput.value.trim();
                const searchResults = query ? await this.searchRestaurants(query) : await RestoDbSource.homeResto();
                this.renderRestaurants(searchResults);
            }
        });
    },
};

export default Home;