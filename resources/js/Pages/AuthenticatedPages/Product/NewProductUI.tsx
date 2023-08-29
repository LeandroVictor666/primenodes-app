import { usePage } from "@inertiajs/react";
import Style from "../../../../css/styles.module.css";
import { useState } from "react";
import ProductController from "@/Controllers/Product/ProductController";
import * as ReactRedux from "react-redux";
import * as ReduxToolkit from "@reduxjs/toolkit";
import { ModalType, showModal } from "@/Redux/Modal.Redux";
import IModal from "@/Interface/ModalInterface/ModalInterface";
import { ServerResponse } from "@/types/serverresponse";

interface AccountProps {
    id: number;
    username: string;
    full_name: string;
    email: string;
    email_status: string;
    date_of_birth: string;
    token: string;
};


/**
 * Ainda vou quebrar esse component em pequenas partes para manter o codigo mais limpo.
 * @returns 
 */
export const NewProductUI = () => {

    const [blobProductImage, setBlobProductImage] = useState<Blob | null>(null);
    const [productName, setProductName] = useState<string>('');
    const [productDescription, setProductDescription] = useState<string>('');
    const [productCategory, setProductCategory] = useState<string>('GPU');
    const [productState, setProductState] = useState<string>('New');
    const [productPrice, setProductPrice] = useState<number>(1);
    const userAccount: AccountProps = usePage().props.AccountInformations as AccountProps;

    /**
     * Isso é para replicar o efeito de seleção de arquivo do HTML, porem, sem utilizar a estilização padrão.
     * Pois não é possivel estilizar o "selecione um arquivo", na verdade, não é possivel alterar a string.
     * Então apenas deixei com display:none, e ao usuario clicar na imagem ele chama esse select file por debaixo dos panos.
     * @returns 
     */
    function selectImageFunction(): void {
        document.getElementById("select-img-input")?.click();
        return;
    }


    /**
     * Ainda contem alguns bugs, é necessario fazer o preventDefault, pois caso o usuario selecione uma imagem invalida
     * o Template de "imagem não encontrada", se quebra, e não fica nenhuma imagem selecionada no painel.
     * @param ProductImage 
     * @returns 
     */
    function imageSelectedChanged(ProductImage: File | null | undefined): void {
        console.log(ProductImage?.type);
        if (ProductImage?.type !== "image/png" && ProductImage?.type !== 'image/jpeg' || ProductImage.type === undefined) {
            window.alert("Select a valid image.");
            return;
        }
        var blobFile: Blob = ProductImage as Blob;
        setBlobProductImage(blobFile);
        console.log('Image-Type: ', blobFile.type);
        var newUrl = window.URL.createObjectURL(blobFile);
        document.getElementById("image-selected")?.setAttribute('src', newUrl);
        return;
    }


    /**
     * Eu poderia tipar o 'e' como: React.ChangeEvent<any>, porem, o intelisense não iria ajudar. (e é justamente esse o proposito do Typescript xD)
     * @param e HTML Element
     * @returns 
     */
    const productDataHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const inputType: string | null = e.target.getAttribute('id');
        switch (inputType) {
            case 'product-name': {
                setProductName(e.target.value)
                break;
            }
            case 'product-description': {
                setProductDescription(e.target.value)
                break;
            }
            case 'product-category': {
                setProductCategory(e.target.value)
                break;
            }
            case 'product-status': {
                setProductState(e.target.value)
                break;
            }
            case 'product-price': {
                var price = Number(e.target.value);
                setProductPrice(price);
                break;
            }
            default: {
                return;
            }
        }

        return;
    }


    /**
     * Function para chamar o Modal, apenas para deixar o codigo mais limpo.
     * @param title 
     * @param content 
     * @param modalType 
     * @param Dispatch 
     * @returns 
     */
    const dispatchModalUI = (title: string, content: string, modalType: ModalType, Dispatch: ReduxToolkit.Dispatch<ReduxToolkit.AnyAction>): void => {
        const payload: IModal = {
            title: title,
            content: content,
            isActive: true,
            modalType: modalType
        };
        Dispatch(showModal(payload));
        return;
    }




    /**
     * Envia o novo produto para o servidor.
     * @returns 
     */
    async function sendNewProductEvent(Dispatch: ReduxToolkit.Dispatch<ReduxToolkit.AnyAction>) {
        const productController = new ProductController(userAccount.token);
        if (blobProductImage === null) {
            window.alert("Select a valid image.")
            return;
        }

        const payload = {
            productName: productName,
            productDescription: productDescription,
            productCategory: productCategory,
            productState: productState,
            productPrice: productPrice,
            productImage: blobProductImage
        };


        await productController.fireNewProduct(payload)
            .then(response => {
                if (response === undefined) {
                    dispatchModalUI('Internal Error', "An internal error has occurred, please try a few minutes or contact administration.", ModalType.failure, Dispatch);
                    return;
                }
                if (response?.isError === 'true') {
                    dispatchModalUI('New Product Failed', response.response, ModalType.failure, Dispatch);
                    return;
                } else {
                    dispatchModalUI('New Product Success', response.response, ModalType.success, Dispatch);
                    setTimeout(() => {
                        window.location.href = "/";
                        return;
                    }, 3700);
                };
            })
            .catch(error => {
                if (error === undefined || error === null) {
                    dispatchModalUI('Internal Error', "An internal error has occurred, please try a few minutes or contact administration.", ModalType.failure, Dispatch);
                    return;
                }
                var errorResponse = error as ServerResponse;
                dispatchModalUI('New Product Failed', errorResponse.response, ModalType.failure, Dispatch);
                return;
            });

    }


    const Dispatch = ReactRedux.useDispatch();

    return (
        <div className={Style.NewProductController}>
            <div className={Style.NewProductHeader}>
                <p>Hello, {userAccount.full_name}</p>
                <p>What do you want to sell?</p>
            </div>
            <div className={Style.NewProductPanel}>
                <div className={Style.Painel1}>
                    <div className={Style.Painel1Header}>
                        <input type="file" id="select-img-input" onChange={(e) => { imageSelectedChanged(e.target.files?.item(0)) }} accept="image/png, image/jpeg" style={{ display: 'none' }}></input>
                        <p>Select A Image</p>
                        <img src="/assets/images/product-images/broken-image.png" id="image-selected" onClick={() => { selectImageFunction() }} className={Style.ProductImgSelect} />
                    </div>
                </div>
                <div className={Style.Painel2}>
                    <div className={Style.Painel2Form}>
                        <p>Name</p>
                        <input type="text" id="product-name" value={productName} onChange={(e) => productDataHandler(e)}></input>
                        <p>Description</p>
                        <input type="text" id="product-description" value={productDescription} onChange={(e) => productDataHandler(e)}></input>
                        <p>Category</p>
                        {/* Tentei automatizar a categoria usando um loop, mas não consegui :P TS me atrapalhou xD*/}
                        <select id="product-category" name="ItemCategory" onChange={(e) => productDataHandler(e)}>
                            <option value="GPU">GPU</option>
                            <option value="CPU">CPU</option>
                            <option value="VideoCard">Placa De Video</option>
                            <option value="Processor">Processador</option>
                            <option value="MotherBoard">Placa Mãe</option>
                            <option value="RAM">Memoria Ram</option>
                            <option value="SSD">SSD</option>
                            <option value="HDD">HDD</option>
                            <option value="PowerSupply">Fonte</option>
                            <option value="Cooler">Cooler</option>
                            <option value="Fans">Fans</option>
                            <option value="ComputerCase">Gabinete</option>
                        </select>
                        <p>Product Status</p>
                        <select id="product-status" name="ProductState" onChange={(e) => productDataHandler(e)}>
                            <option value="New">New</option>
                            <option value="Used">Used</option>
                        </select>
                        <p>Price</p>
                        <input id="product-price" value={productPrice} onChange={(e) => productDataHandler(e)} type="number"></input>
                        <button onClick={async () => { await sendNewProductEvent(Dispatch) }}>
                            Start Selling
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )

}