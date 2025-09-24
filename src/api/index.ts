import * as product from './allproducts';
import * as sale from './allsalereports';
import * as user from './allusers';

class API{
    product: typeof product;
    sale: typeof sale;
    user: typeof user;


    constructor(){
        this.product = product;
        this.sale = sale;
        this.user = user;
    }
}

const api = new API;
export default api;