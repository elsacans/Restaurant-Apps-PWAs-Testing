/* eslint-disable no-undef */
import API_ENDPOINT from "../globals/api.endpoint";

class RestoDbSource {
    static async homeResto() {
        try {
          const response = await fetch(API_ENDPOINT.HOME);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const responseJson = await response.json();
          return responseJson.restaurants;
        } catch (error) {
          console.error('Error fetching home restaurants:', error);
          throw error; // Re-throw the error for the caller to handle
        }
    }

    static async favoriteResto() {
        const response = await fetch(API_ENDPOINT.FAVORITE);
        const responseJson = await response.json();
        return responseJson.restaurants;
    }

    static async detailResto(id) {
        const response = await fetch(API_ENDPOINT.DETAIL(id));
        return response.json();
    }
}

export default RestoDbSource;