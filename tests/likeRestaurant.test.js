import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator';

describe('Liking A Restaurants', () => {
    it('should show the like button when the restaurants has not been liked before', async () => {
        document.body.innerHTML = '<div id="likeButtonContainer"></div>';

        await LikeButtonInitiator.init({
            'likeButtonContainer': document.querySelector('#likeButtonContainer'),
            restaurant: {
                id: 1,
            },
        });

        expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
    });
});