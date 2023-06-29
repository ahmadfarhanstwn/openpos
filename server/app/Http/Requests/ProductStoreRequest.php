<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductStoreRequest extends FormRequest
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
            'product_barcode' => 'string|max:25',
            'product_name' => 'required|string|max:25',
            'unit_id' => 'required|numeric',
            'category_id' => 'required|numeric',
            'product_price' => 'required|numeric',
            'discount_percentage' => 'required|numeric',
        ];
    }

    public function messages()
    {
        return [
            'product_barcode.max' => 'Product Barcode must be less than 25 characters',
            'product_name.required' => 'Product Name is required',
            'product_name.max' => 'Product Name must be less than 25 characters',
            'unit_id.required' => 'Unit is required',
            'unit_id.numeric' => 'Unit Id must be in numeric format',
            'category_id.required' => 'Category is required',
            'category_id.numeric' => 'Category Id must be in numeric format',
            'product_price.required' => 'Product Price is required',
            'product_price.numeric' => 'Product Price must be in numeric format',
            'discount_percentage.required' => 'Discount Percentage is required',
            'discount_percentage.numeric' => 'Discount Percentage must be in numeric format',
        ];
    }
}
