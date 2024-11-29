import { itActsAsFavoriteRestoModel } from "./contracts/favoriteRestaurantContract";

let favoriteResto = [];

const FavoriteRestoArray = {
    getResto(id) {
        if (!id) {
            return;
        }

        return favoriteResto.find((resto) => resto.id === id);
    },

    getAllResto() {
        return favoriteResto;
    },

    putResto(resto) {
        // eslint-disable-next-line no-prototype-builtins
        if (!resto.hasOwnProperty('id')) {
            return;
        }

        // pastikan id ini belum ada dalam daftar favoriteResto
        if (!this.getResto(resto.id)) {
            return;
        }

        favoriteResto.push(resto);
    },

    deleteResto(id) {
        // cara boros menghapus resto dengan meng-copy film yang ada 
        // kecuali film dengan id == id 
        favoriteResto = favoriteResto.filter((resto) => resto.id !== id);
    },
};

describe('Favorite Movie Array Contract Test Implementation', () => {
    afterEach(() => {
        favoriteResto = [];
    });

    itActsAsFavoriteRestoModel(FavoriteRestoArray);
});import { itActsAsFavoriteRestoModel } from "./contracts/favoriteRestaurantContract";

let favoriteResto = [];

const FavoriteRestoArray = {
    getResto(id) {
        if (!id) {
            throw new Error('Id is required');
        }

        return favoriteResto.find((resto) => resto.id === id);
    },

    getAllResto() {
        return [...favoriteResto];
    },

    putResto(resto) {
        if (!resto || !resto.hasOwnProperty('id')) {
            throw new Error('Invalid resto object');
        }

        const existingResto = this.getResto(resto.id);
        if (existingResto) {
            return;
        }

        favoriteResto.push(resto);
    },

    deleteResto(id) {
        if (!id) {
            throw new Error('Id is required');
        }

        favoriteResto = favoriteResto.filter((resto) => resto.id !== id);
    },
};

describe('Favorite Movie Array Contract Test Implementation', () => {
    afterEach(() => {
        favoriteResto = [];
    });

    itActsAsFavoriteRestoModel(FavoriteRestoArray);
});