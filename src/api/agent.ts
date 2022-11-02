import axios, {AxiosError, AxiosResponse} from "axios";
import {toast} from "react-toastify";
import {history} from "../BrowserRouter";
import {PaginatedResponse} from "../models/pagination";
import {store} from "../store/configureStore";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;
axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if (token)
        config.headers!.Authorization = `Bearer ${token}`
    return config;
})
axios.interceptors.response.use(async response => {
    if(process.env.NODE_ENV === 'development') await sleep();
        const pagination = response.headers['pagination'];
        if (pagination) {
            response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
            return response;
        }
        return response;
    },
    (error: AxiosError) => {
        const {data, status} = error.response!;
        // @ts-ignore
        const {title} = data;
        // @ts-ignore
        const dataErrors = data.errors!;
        // @ts-ignore
        switch (status) {
            case 400:
                if (dataErrors) {
                    const modelStateErrors: string[] = [];
                    for (const key in dataErrors) {
                        if (dataErrors[key]) {
                            modelStateErrors.push(dataErrors[key])
                        }
                    }
                    throw modelStateErrors.flat();
                }
                toast.error(title);
                break;
            case 401:
                toast.error(title);
                break;
            case 500:
                history.push({
                    pathname: '/server-error',
                }, {error: data})
                break;
        }
        return Promise.reject(error.response);
    });

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: (params: URLSearchParams) => requests.get('Products', params),
    details: (id: number) => requests.get(`Products/${id}`),
    filters: () => requests.get('Products/filters')
}

const Account = {
    login: (values: any) => requests.post('account/login', values),
    register: (values: any) => requests.post('account/register', values),
    currentUser: () => requests.get('account/getCurrentUser'),
    fetchAddress: () => requests.get('account/savedAddress')
}

const Orders = {
    list: () => requests.get('orders'),
    fetch: (id: number) => requests.get(`orders/${id}`),
    create: (values: any) => requests.post('orders', values)
}

const Basket = {
    get: () => requests.get('Basket'),
    addItem: (productId: number, quantity = 1) => requests.post(`Basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.delete(`Basket?productId=${productId}&quantity=${quantity}`)
}

const Payments = {
    createPaymentsIntent: () => requests.post('Payments', {})
}

const agent = {
    Catalog,
    Basket,
    Account,
    Orders,
    Payments
}

export default agent;