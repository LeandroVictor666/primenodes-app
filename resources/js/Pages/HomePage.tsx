import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Styles from "../../css/styles.module.css";
import { BiLogoGithub } from "react-icons/bi";
import { BsLinkedin } from "react-icons/bs";
import Header from '@/Components/Header/Header';

import ProductImage from "../../images/product-1.jpg";
export default function Welcome({ }) {
    return (
        <>
            <Header />
            <div className={Styles.itemsContainer}>
            </div>
        </>
    );
}
