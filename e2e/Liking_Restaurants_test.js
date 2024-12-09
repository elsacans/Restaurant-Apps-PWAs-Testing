// c:\Users\MDP\Desktop\Restaurant-Apps-PWAs-Testing-main\e2e\Liking_Restaurants_test.js

// eslint-disable-next-line no-undef, no-unused-vars
const { I } = inject();

// eslint-disable-next-line no-undef
Feature('Restaurant Favorites');

// eslint-disable-next-line no-undef
Before(({ I }) => {
  I.amOnPage('/'); // Navigate to the home page
});

// eslint-disable-next-line no-undef
Scenario('Liking a restaurant', async ({ I }) => {
  // Ensure there is at least one restaurant to like
  I.seeElement('.resto-item_name a');

  // Grab the name of the first restaurant and click on it
  const restaurantName = await I.grabTextFrom('.resto-item_name a');
  I.click('.resto-item_name a');

  // Click the like button to like the restaurant
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // Navigate to the favorites page
  I.amOnPage('/#/favorite');

  // Verify that the restaurant is now in the favorites list
  I.seeElement('.resto-item');
  I.see(restaurantName, '.resto-item_name');
});

// eslint-disable-next-line no-undef
Scenario('Unliking a restaurant', async ({ I }) => {
  // Navigate to the favorites page
  I.amOnPage('/#/favorite');

  // Ensure the favorites list is not empty
  I.seeElement('.resto-item');

  // Click on the first restaurant in the favorites list
  I.click('.resto-item_name a');

  // Click the unlike button to remove the restaurant from favorites
  I.seeElement('[aria-label="unlike this restaurant"]');
  I.click('[aria-label="unlike this restaurant"]');

  // Verify that the restaurant is no longer in the favorites list
  I.amOnPage('/#/favorite');
  I.see('You don\'t have any favorite restaurants yet.', '.restaurant-item__not__found');
});