import CONFIG from "./config";

const API_ENDPOINT = {
    HOME : `${CONFIG.BASE_URL}/list`,
    FAVORITE :(id) => `${CONFIG.BASE_URL}/list/${id}`,
    DETAIL: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
};

export default API_ENDPOINT;