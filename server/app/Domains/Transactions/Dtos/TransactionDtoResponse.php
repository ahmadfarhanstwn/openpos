<?php

namespace App\Domains\Transactions\Dtos;

class TransactionDtoResponse {
    public int $transaction_id;
    public int $product_id;
    public int $quantity;
    public float $discount;
    public float $subtotal;

    public function __construct(
        int $transaction_id,
        int $product_id,
        int $quantity,
        float $discount,
        float $subtotal
    )
    {
        $this->transaction_id = $transaction_id;
        $this->product_id = $product_id;
        $this->quantity = $quantity;
        $this->discount = $discount;
        $this->subtotal = $subtotal;
    }
}