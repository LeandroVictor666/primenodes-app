<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public $timestamps = false;
    public $fillable = ['name', 'description', 'category', 'state', 'price', 'vendor_name'];
    use HasFactory;
}
