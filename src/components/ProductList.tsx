import React, {useEffect, useState} from 'react';
import ProductCard from "./ProductCard";
import {IProduct} from "../types/product";

const ProductList = (props: {
    products: IProduct[],
    handleReRender?: () => void
}) => {
    const [products, setProducts] = useState<IProduct[]>(props.products);
    useEffect(() => {
        setProducts(props.products);
    }, [props.products])

    return (
        products.length === 0 ?
            <div className="row">
                <h1 className="text-center">Products not found</h1>
            </div>
            :
            <>
                <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 g-4">
                    {products.map(product =>
                        <ProductCard
                            key={product.id}
                            product={product}
                            handleReRender={props.handleReRender}
                        />
                    )}
                </div>
            </>
    );
}

export default ProductList;