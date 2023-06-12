import axios from "axios";
import {toolkit_store} from "../index";
import {SET_IS_AUTH} from "../storeToolkit/reducers/item_reducer/itemsActions";

export const axiosApi = axios.create({
    method: 'post'
});

axiosApi.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken !== null) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

axiosApi.interceptors.response.use((config) => {
    return config;
}, async (error) => {

    const originalRequest = error.config;

    if (error.response.status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refreshToken');
        const data = {
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
            client_id: 'xa1r6sx4h2u4way',
            client_secret: '98cr69bkvski9av'
        };
        const config = {
            method: 'post',
            url: 'https://api.dropbox.com/oauth2/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data
        };

        try {
            const response = await axios.request(config);
            localStorage.setItem('accessToken', response.data.access_token);
            originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
            return axiosApi.request(originalRequest);
        } catch {
            localStorage.clear();
            toolkit_store.dispatch(SET_IS_AUTH(false));
        }
    }
});