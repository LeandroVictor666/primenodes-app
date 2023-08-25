<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Account extends Model
{
    use  HasApiTokens, HasFactory, Notifiable;
    protected $fillable = [
        'username',
        'full_name',
        'email',
        'password',
        'date_of_birth'
    ];
}
