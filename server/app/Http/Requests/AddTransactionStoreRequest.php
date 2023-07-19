<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddTransactionStoreRequest extends FormRequest
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
            'product_id' => 'required|numeric',
            'quantity' => 'required|numeric|gt:1',
            'discount' => 'required|numeric|gte:0',
            'subtotal' => 'required|numeric|gte:0',
        ];
    }
}
