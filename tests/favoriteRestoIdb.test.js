import { itActsAsFavoriteRestoModel } from "./contracts/favoriteRestaurantContract";
import FavoriteRestoIdb from "../src/scripts/data/favorite-resto-idb";

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
    afterEach(async () => {
        (await FavoriteRestoIdb.getAllResto()).forEach(async (resto) => {
            await FavoriteRestoIdb.deleteResto(resto.id);
        });
    });

    itActsAsFavoriteRestoModel(FavoriteRestoIdb);
});