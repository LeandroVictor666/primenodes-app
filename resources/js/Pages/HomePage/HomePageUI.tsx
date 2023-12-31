import { Link, Head, usePage } from '@inertiajs/react';

import { Product } from "@/types/product";
import Styles from "../../../css/styles.module.css";
import Header from '@/Components/Header/Header';
import { useState } from 'react';
import ProductCard from './ProductCard';
export default function HomePageUI() {

    const Products = (usePage().props.Products) as Array<Product>;
    const [sProducts, setProducts] = useState(Products);
    return (
        <>
            <div className={Styles.ItemPainelController}>
                <p onClick={()=> {window.location.href = "/product/newproduct"}}>Add Product</p>
                <p onClick={()=> {window.location.href = "/product/searchproduct"}}>Search Product</p>
            </div>
            <div className={Styles.itemsContainer}>
                {sProducts.map((product, index) => {
                    return (
                        <ProductCard product={product}></ProductCard>

                    );
                })
                }

            </div>
        </>
    );
}
