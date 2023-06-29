<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductUnitStoreRequest extends FormRequest
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
            'unit_name' => 'required|string|max:255'
        ];
    }

    public function messages()
    {
        return [
            'unit_name.required' => 'Unit Name is required',
            'unit_name.max' => 'Unit Name must be less than 255 characters'
        ];
    }
}
