import data from './DATA.json'

const restaurantList = document.getElementById('restaurant-list');
data.restaurants.forEach(restaurant =>{
    restaurantList.innerHTML += `
    <div class= "restaurant-item">
        <img src= "${restaurant.pictureId}" alt="${restaurant.name}" class="restaurant-img">
        <div class="restaurant-content">
            <h2>${restaurant.name}</h2>
            <p>Location: ${restaurant.city}</p>
            <p>Rating: ${restaurant.rating}</p>
        </div>
    </div>
    `;
});