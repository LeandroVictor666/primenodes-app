<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MyAccountController extends Controller
{

    function render()
    {
        return Inertia::render('MyAccount', []);
    }
}
