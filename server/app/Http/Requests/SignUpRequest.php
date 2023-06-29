<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SignUpRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'username' => 'required|string',
            'email' => 'required|string|email',
            'full_name' => 'required|string',
            'password' => 'required|string',
            'role' => 'in:super_admin,cashier,management',
        ];
    }

    public function messages()
    {
        return [
            'username.required' => 'Username is required',
            'email.required' => 'Email is required',
            'email.email' => 'Email is invalid',
            'full_name.required' => 'Full Name is required',
            'password.required' => 'Password is required',
            'role.in' => 'Role must be either "super_admin", "cashier" or "management"'
        ];
    }
}
