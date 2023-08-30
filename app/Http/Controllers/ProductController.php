<?php

namespace App\Http\Controllers;

use App\Helpers\SessionHelper;
use App\Http\Requests\NewProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{

    public function __construct()
    {
        if (\session_status() !== PHP_SESSION_ACTIVE) {
            \session_start();
        }
    }

    public function newProductView()
    {
        if (!$this->customIsAuth()) {
            return redirect('/Login');
        }
        $accountInformations = $this->getAccountInformationBySession();
        return Inertia::render('AuthenticatedPages/Product/NewProductUI', [
            'AccountInformations' => $accountInformations
        ]);
    }

    public function searchProductView()
    {
        return Inertia::render("SearchProductPage/SearchProductUI", []);
        exit();
    }



    public function fireNewProductEvent(NewProductRequest $request)
    {

        if (!$this->customIsAuth()) {
            $this->apiResponse([
                'response' => 'Not Authenticated, please login.',
                'isError' => 'true'
            ]);
        }

        $dataRequest = $request->only(['name', 'description', 'category', 'state', 'price']);
        if (!$request->hasFile('product_image')) {
            $this->apiResponse([
                'response' => 'It is necessary to send an image of the product.',
                'isError' => 'true'
            ], 400);
            exit();
        };
        $productImage = $_FILES['product_image'];

        if (!getimagesize($productImage['tmp_name'])) {
            $this->apiResponse([
                'response' => 'The uploaded file is not a valid image.',
                'isError' => 'true'
            ], 400);
            exit();
        };

        if ($productImage['size'] > 7000000) {
            $this->apiResponse([
                'response' => 'The uploaded image is too large.',
                'isError' => 'true'
            ], 400);
            exit();
        };

        $accountInformations = $this->getAccountInformationBySession();
        $dataRequest['vendor_name'] = $accountInformations['full_name'];
        $productModel = new Product();
        $thisProduct = $productModel->create($dataRequest);
        $id = $thisProduct->id;
        $target = "assets/images/product-images/product-{$id}.jpg";
        if (move_uploaded_file($productImage['tmp_name'], $target)) {
            $this->apiResponse([
                'response' => 'file uploaded sucesfully',
                'isError' => 'false'
            ]);
        } else {
            $this->apiResponse([
                'response' => 'failed to upload image, try again in few hours.',
                'isError' => 'true'
            ]);
        };
        exit();
    }

    public function viewFullProduct(int $id)
    {
        $productData = $this->getProductById($id);
        if ($productData === null) {
            echo "not found.";
            exit();
        }

        $secureProductData = $productData->only('id', 'name', 'description', 'category', 'state', 'vendor_name', 'price', 'release_date');
        return Inertia::render('ViewFullProductPage/FullProductUI', [
            'productData' => $secureProductData
        ]);

        exit();
    }


    public function getProductById(int $id)
    {
        $productModel = new Product();
        $productQueryResult = $productModel->find($id);
        return $productQueryResult;
    }

    public function getProductByProductName(string $productName, bool $inJson = false)
    {
        $productModel = new Product();
        $productQueryResult = $productModel->select('id', 'name', 'description', 'category', 'state', 'vendor_name', 'price', 'release_date')->where("name", 'LIKE', '%' . $productName . '%')->get();
        if ($inJson === true) {
            $this->apiResponse([
                'isError' => 'false',
                'response' => 'Products Found.',
                'Products' => $productQueryResult,
            ]);
            exit();
        };
        return $productQueryResult;
    }

    public function getProductByVendorName(string $vendorName, bool $inJson = false)
    {
        $productModel = new Product();
        $productQueryResult = $productModel->select('id', 'name', 'description', 'category', 'state', 'vendor_name', 'price', 'release_date')->where("vendor_name", 'LIKE', '%' . $vendorName . '%')->get();
        if ($inJson === true) {
            $this->apiResponse([
                'isError' => 'false',
                'response' => 'Products Found.',
                'Products' => $productQueryResult,
            ]);
            exit();
        };
        return $productQueryResult;
    }

    public function buyProductView(int $productId)
    {
        $product = $this->getProductById($productId);
        return Inertia::render('BuyPage/BuyPageUI', [
            'productInformations' => $product

        ]);
        exit();
    }
}
