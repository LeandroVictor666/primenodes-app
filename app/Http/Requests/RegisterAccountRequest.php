<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterAccountRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'username' => ['bail', 'required', 'min:4', 'max:35', 'unique:accounts,username'],
            'full_name' => ['bail', 'required', 'min:3', 'max:80', 'string'],
            'email' => ['bail', 'required', 'email', 'min:4', 'max:255', 'string', 'unique:accounts,email'],
            'password' => ['bail', 'required', 'min:4', 'max:255', Password::min(4)->letters()->mixedCase()->numbers()->uncompromised()],
            'date_of_birth' => ['required', 'before:18 years ago']
        ];
    }

}
