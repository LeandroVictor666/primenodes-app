<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAccountRequest extends FormRequest
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
            'newUsername' => ['bail', 'min:4', 'max:35', 'unique:accounts,username']
            // 'newEmail' => ['bail', 'email', 'min:4', 'max:255', 'string', 'unique:accounts,email'],
            // 'newPassword' => ['bail',  'min:4', 'max:255']
        ];
    }
}
