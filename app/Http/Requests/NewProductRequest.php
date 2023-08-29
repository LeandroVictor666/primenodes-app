<?php

namespace App\Http\Requests;

use App\Enum\Product\ProductCategoryEnum;
use App\Enum\Product\ProductStateEnum;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class NewProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['string', 'min:3','max:255'],
            'description' => ['string', 'min:4', 'max:350'],
            /*'category' => [new Enum(ProductCategoryEnum::class)],*/   
            'state' => [new Enum(ProductStateEnum::class)],
            'price' => ['numeric'],
            'product_image' => ['mimes:jpg,png,jpeg,jpe']
        ];
    }
}
