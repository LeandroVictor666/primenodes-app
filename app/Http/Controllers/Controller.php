<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Notifications\Notifiable;
use Illuminate\Routing\Controller as BaseController;
use Laravel\Sanctum\HasApiTokens;

class Controller extends BaseController
{
    /**
     * Array with props.
     */
    protected $propBase;
    
    /**
     * Apply common props.
     */
    protected function definePropBase(string $Route = '/') :void
    {
        $this->propBase = array(
            'Route' => $Route
        );
    }

    protected function apiResponse(array $content,int $code = 200) :void
    {
        header("Content-Type: application/json");
        http_response_code($code);
        echo json_encode($content);
        return;
    }

    use AuthorizesRequests, ValidatesRequests;
}
