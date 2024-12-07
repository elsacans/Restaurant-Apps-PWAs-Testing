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
                <section id="restaurant-list" class="restaurant-list">
                </section>
            </main>
        `;
    },

    async afterRender() {
        const restaurants = await RestoDbSource.homeResto();
        const restaurantContainer = document.querySelector('#restaurant-list');
        const searchInput = document.querySelector('#searchInput');
        const searchButton = document.querySelector('#searchButton');

        const renderRestaurants = (restos) => {
            restaurantContainer.innerHTML = '';
            restos.forEach((resto) => {
                restaurantContainer.innerHTML += createRestoItemTemplate(resto);
            });
        };

        renderRestaurants(restaurants);

        const searchRestaurants = async (query) => {
            const searchUrl = `https://restaurant-api.dicoding.dev/search?q=${query}`;
            try {
                const response = await fetch(searchUrl);
                const data = await response.json();
                return data.restaurants;
            } catch (error) {
                console.error('Error searching restaurants:', error);
                return [];
            }
        };

        searchButton.addEventListener('click', async () => {
            const query = searchInput.value.trim();
            if (query) {
                const searchResults = await searchRestaurants(query);
                renderRestaurants(searchResults);
            } else {
                renderRestaurants(restaurants);
            }
        });

        searchInput.addEventListener('keyup', async (event) => {
            if (event.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    const searchResults = await searchRestaurants(query);
                    renderRestaurants(searchResults);
                } else {
                    renderRestaurants(restaurants);
                }
            }
        });
    },
};

export default Home;