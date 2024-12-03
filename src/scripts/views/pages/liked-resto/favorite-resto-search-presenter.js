class FavoriteRestoSearchPresenter {
    constructor({favoriteRestaurants}) {
        this._listenToSearchRequestByUser();
        this._favoriteRestaurants = favoriteRestaurants;
    }

    _listenToSearchRequestByUser() {
        this._queryElement = document.getElementById('query');
        this._queryElement.addEventListener('change', (event) => {
            this._searchResto(event.target.value);
        });
    }

    async _searchResto(latestQuery) {
        this._latestQuery = latestQuery.trim();

        let foundResto;
        if (this._latestQuery.length > 0) {
            foundResto = await this._favoriteRestaurants.searchResto(this.latestQuery);
        } else {
            foundResto = await this._favoriteRestaurants.getAllResto();
        }
        
        this._showFoundResto(foundResto);
    }

    _showFoundResto(restaurants) {
        const html = restaurants.reduce(
            (carry, resto) => carry.concat(`
                <li class="restaurants">
                    <span class="resto__name">${resto.name || '-'}</span>
                </li>
                `),
            '',
        );
        
        document.querySelector('.restaurants').innerHTML = html;

        document.getElementById('restaurant-search-container')
        .dispatchEvent(new Event('restaurants:searched:updated'));
    }

    get latestQuery() {
        return this._latestQuery;
    }
}

export default FavoriteRestoSearchPresenter;