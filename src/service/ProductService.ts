import {IProduct} from "../types/product";
import api from "../http";
import {AxiosResponse} from "axios";

class ProductService {

    static create(product: IProduct, photo: File | undefined): Promise<AxiosResponse> {
        const productBlob = new Blob([JSON.stringify(product)], {
            type: 'application/json'
        })
        let formData = new FormData();
        if (photo) {
            formData.append('productPhoto', photo);
        } else {
            formData.append('productPhoto', new Blob());
        }
        formData.append('productDto', productBlob);
        return api.post('/products', formData)
    }

    static readById(id: number): Promise<AxiosResponse<IProduct>> {
        return api.get<IProduct>(`/products/${id}`);
    }

    static readProductsInStock(): Promise<AxiosResponse<IProduct[]>> {
        return api.get<IProduct[]>('/products/in-stock');
    }

    static readAll(): Promise<AxiosResponse<IProduct[]>> {
        return api.get<IProduct[]>("/products");
    }

    static update(product: IProduct): Promise<AxiosResponse> {
        return api.put(`/products/${product.id}`, product)
    }

    static delete(id: number): Promise<AxiosResponse> {
        return api.delete(`/products/${id}`)
    }
}

export default ProductService;
