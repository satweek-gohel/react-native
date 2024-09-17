import ApiClient from '../ApiClient';
import Product from '../model/Product';

export default class DefaultApi {
    constructor(apiClient) {
        this.apiClient = apiClient || new ApiClient();
    }

    async createProduct(product) {
        let postBody = product;
        if (!product) {
            throw new Error("Missing the required parameter 'product' when calling createProduct");
        }

        let pathParams = {};
        let queryParams = {};
        let headerParams = {};
        let formParams = {};

        let authNames = [];
        let contentTypes = ['application/json'];
        let accepts = [];
        let returnType = null;
        try {
            const response = await this.apiClient.callApi(
                '/product', 'POST',
                pathParams, queryParams, headerParams, formParams, postBody,
                authNames, contentTypes, accepts, returnType
            );
            return response;
        } catch (error) {
            console.error('Error in createProduct:', error);
            throw error;
        }
    }

    async getProducts() {
        let postBody = null;

        let pathParams = {};
        let queryParams = {};
        let headerParams = {};
        let formParams = {};

        let authNames = [];
        let contentTypes = [];
        let accepts = ['application/json'];
        let returnType = [Product];
        try {
            const response = await this.apiClient.callApi(
                '/products', 'GET',
                pathParams, queryParams, headerParams, formParams, postBody,
                authNames, contentTypes, accepts, returnType
            );
            return response;
        } catch (error) {
            console.error('Error in getProducts:', error);
            throw error;
        }
    }
}
