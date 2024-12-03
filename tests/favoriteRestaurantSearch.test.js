import { spyOn } from 'jest-mock';
import FavoriteRestoSearchPresenter from '../src/scripts/views/pages/liked-resto/favorite-resto-search-presenter';
import FavoriteRestoIdb from '../src/scripts/data/favorite-resto-idb';
//import {describe, beforeEach, it, expect, jest} from '@jest/globals';

describe('Searching restaurants', () => {
    let presenter;
    let favoriteResto;

    const searchResto = (query) => {
        const queryElement = document.getElementById('query');
        queryElement.value = query;

        queryElement.dispatchEvent(new Event('change'));
    };

    const setRestoSearchContainer = () => {
        document.body.innerHTML = `
        <div id="restaurant-search-container">
            <input id="query" type="text">
            <div class="restaurant-result-container">
                <ul class="restaurants">
                </ul>
            </div>
        </div>
        `;
    };

    const constructPresenter = () => {
        favoriteResto = {
            getAllResto: jest.fn(),
            searchResto: jest.fn(),
        };
        
        presenter = new FavoriteRestoSearchPresenter({
            favoriteResto,
        });
    };

    beforeEach(() => {
        setRestoSearchContainer();
        constructPresenter();
    });


    describe('When query is not empty', () => {
        it('should be able to capture the query typed by the user', () => {
            FavoriteRestoIdb.searchResto.mockImplementation(() => []);
            
            searchResto('resto a');

            expect(presenter.latestQuery).toEqual('resto a');
        });

        it('should ask the model to search for liked restaurants', () => {
            favoriteResto.searchResto.mockImplementation(() => []);

            searchResto('resto a');

            expect(favoriteResto.searchResto).toHaveBeenCalledWith('resto a');
        });

        it('should show the found restaurants', () => {
            presenter._showFoundResto([{ id: 1 }]);
            expect(document.querySelectorAll('.restaurants').length).toEqual(1);

            presenter._showFoundResto([
                {
                    id: 1,
                    title: 'resto a',
                },
                {
                    id: 2,
                    title: 'resto b',
                },
            ]);

            expect(document.querySelectorAll('.restaurants').length).toEqual(2);
        });

        it('should show the title of the found restaurants', () => {
            presenter._showFoundResto([
                {
                    id: 1,
                    title: 'resto a',
                },
            ]);

            expect(document.querySelectorAll('.resto__name').item(0).textContent).toEqual('resto a');

            presenter._showFoundResto([
                {
                    id: 1,
                    title: 'resto a',
                },
                {
                    id: 2,
                    title: 'resto b',
                },
            ]);

            const restoTitles = document.querySelectorAll('.resto__name');
            
            expect(restoTitles.item(0).textContent).toEqual('resto a');
            expect(restoTitles.item(1).textContent).toEqual('resto b');
        });

        it('should show - for found restaurants without title', () => {
            presenter._showFoundResto([{ id: 1 }]);
            
            expect(document.querySelectorAll('.resto__name').item(0).textContent).toEqual('-');
        });

        it('should show the restaurants found by Favorite Restaurants', (done) => {
            document.getElementById('restaurant-search-container')
            .addEventListener('restaurants:searched:updated', () => {
                expect(document.querySelectorAll('.restaurants').length).toEqual(3);

                done();
            });

            favoriteResto.searchResto.mockImplementation((query) => {
                if (query === 'resto a') {
                    return [
                        { id: 111, title: 'resto abc'},
                        { id: 222, title: 'ada juga resto abcde'},
                        { id: 333, title: 'ini juga boleh resto a'},
                    ];
                }
                return [];
            });

            searchResto('resto a');
        });

        it('should show the name of the restaurants found by Favorite Movies', (done) => {
            document.getElementById('restaurant-search-container')
            .addEventListener('restaurants:searched:updated', () => {
                const restoTitles = document.querySelectorAll('.resto__name');

                expect(restoTitles.item(0).textContent).toEqual('resto abc');
                expect(restoTitles.item(1).textContent).toEqual('ada juga resto abcde');
                expect(restoTitles.item(2).textContent).toEqual('ini juga boleh resto a');

                done();
            });

            favoriteResto.searchResto.mockImplementation((query) => {
                if (query === 'resto a') {
                    return [
                        { id: 111, title: 'resto abc'},
                        { id: 222, title: 'ada juga resto abcde'},
                        { id: 333, title: 'ini juga boleh resto a'},
                    ];
                }

                return [];
            });

            searchResto('resto a');
        });
    });

    describe('When query is empty', () => {
        it('should capture the query as empty', () => {
            favoriteResto.getAllResto.mockImplementation(() => []);

            searchResto(' ');

            expect(presenter.latestQuery.length).toEqual(0);

            searchResto('   ');
            expect(presenter.latestQuery.length).toEqual(0);

            searchResto('');
            expect(presenter.latestQuery.length).toEqual(0);

            searchResto('\t');
            expect(presenter.latestQuery.length).toEqual(0);
        });

        it('should show all favorite movies', () => {
            favoriteResto.getAllResto.mockImplementation(() => []);

            searchResto('    ');

            expect(favoriteResto.getAllResto).toHaveBeenCalled();
        });
    });
});
