<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class MainPageController extends Controller
{
    public function render()
    {
        $productModel = new Product();
        $products = $this->getProductTimeline($productModel);
        return Inertia::render('HomePage', ['Products' => $products, 'MyName' => "LeandroVictor666"]);
    }

    public function getProductTimeline(Product $productModel)
    {
        $products = $productModel->take(75)->get();
        return $products;
    }
}
