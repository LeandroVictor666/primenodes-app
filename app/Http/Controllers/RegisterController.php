<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function render()
    {
        $this->definePropBase('/Register');

        return Inertia::render('RegisterPage/RegisterPage', [
            'propBase' => $this->propBase,
        ]);
    }
}
