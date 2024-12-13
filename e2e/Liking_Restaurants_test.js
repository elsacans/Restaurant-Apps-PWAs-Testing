// eslint-disable-next-line no-unused-vars, no-undef
const { I } = inject();

// eslint-disable-next-line no-undef
Feature('Restaurant Favorites');

// eslint-disable-next-line no-undef
Before(({ I }) => {
  I.amOnPage('/'); 
});

// eslint-disable-next-line no-undef
Scenario('Liking a restaurant', async ({ I }) => {
  I.seeElement('.resto-item_name a');

  const restaurantName = await I.grabTextFrom('.resto-item_name a');
  I.click('.resto-item_name a');

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');

  I.seeElement('.resto-item');
  I.see(restaurantName, '.resto-item_name');
});


// eslint-disable-next-line no-undef
Scenario('Unliking a restaurant', async ({ I }) => {
  I.amOnPage('/#/favorite');

  I.seeElement('.resto-item');

  I.click('.resto-item_name a');

  I.seeElement('[aria-label="unlike this restaurant"]');
  I.click('[aria-label="unlike this restaurant"]');

  I.amOnPage('/#/favorite');
  I.see('You don\'t have a favourite restaurant', '.restaurant-item__not__found');
});