import {AxiosResponse} from "axios";
import api from "../http";
import {ICategory} from "../types/category";

class CategoryService {
    static create(category: ICategory): Promise<AxiosResponse> {
        return api.post('/categories', category);
    }

    static readAll(): Promise<AxiosResponse<ICategory[]>> {
        return api.get<ICategory[]>('/categories');
    }

    static update(category: ICategory): Promise<AxiosResponse> {
        return api.put(`/categories/${category.id}`, category);
    }

    static delete(categoryId: number): Promise<AxiosResponse> {
        return api.delete(`/categories/${categoryId}`);
    }
}

export default CategoryService;