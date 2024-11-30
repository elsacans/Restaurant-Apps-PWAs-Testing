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
});