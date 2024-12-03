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

    _searchResto(latestQuery) {
        this._latestQuery = latestQuery;
        this._favoriteRestaurants.searchResto(this.latestQuery);
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
    }

    get latestQuery() {
        return this._latestQuery;
    }
}

export default FavoriteRestoSearchPresenter;