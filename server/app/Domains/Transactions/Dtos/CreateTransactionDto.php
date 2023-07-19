<?php

namespace App\Domains\Transactions\Dtos;

class CreateTransactionDto {
    public int $productId;
    public int $quantity;
    public float $discount;
    public float $subtotal;

    public function __construct(int $productId, int $quantity, float $discount, float $subtotal)
    {
        $this->productId = $productId;
        $this->quantity = $quantity;
        $this->discount = $discount;
        $this->subtotal = $subtotal;
    }
}