<?php
namespace App\Enum\Product;

enum ProductStateEnum :string
{
    case New = 'New';
    case Used = 'Used';
    case Bought = "Bought";
};


