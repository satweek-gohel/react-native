# ProductApi.DefaultApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**productPost**](DefaultApi.md#productPost) | **POST** /product | Add a new product
[**productsGet**](DefaultApi.md#productsGet) | **GET** /products | Get all products



## productPost

> productPost(product)

Add a new product

### Example

```javascript
import ProductApi from 'product_api';

let apiInstance = new ProductApi.DefaultApi();
let product = new ProductApi.Product(); // Product | 
apiInstance.productPost(product, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **product** | [**Product**](Product.md)|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined


## productsGet

> [Product] productsGet()

Get all products

### Example

```javascript
import ProductApi from 'product_api';

let apiInstance = new ProductApi.DefaultApi();
apiInstance.productsGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[Product]**](Product.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

