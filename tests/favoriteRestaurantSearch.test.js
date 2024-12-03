import { spyOn } from 'jest-mock';
import FavoriteRestoSearchPresenter from '../src/scripts/views/pages/liked-resto/favorite-resto-search-presenter';
import FavoriteRestoIdb from '../src/scripts/data/favorite-resto-idb';
//import {describe, beforeEach, it, expect, jest} from '@jest/globals';

describe('Searching restaurants', () => {
    let presenter;

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
        spyOn(FavoriteRestoIdb, 'searchResto');
        presenter = new FavoriteRestoSearchPresenter({ favoriteRestaurants: FavoriteRestoIdb });
    };

    beforeEach(() => {
        setRestoSearchContainer();
        constructPresenter();
    });

    it('should be able to capture the query typed by the user', () => {
        searchResto('resto a');

        expect(presenter.latestQuery).toEqual('resto a');
    });

    it('should ask the model to search for liked restaurants', () => {
        searchResto('resto a');

        expect(FavoriteRestoIdb.searchResto).toHaveBeenCalledWith('resto a');
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
});