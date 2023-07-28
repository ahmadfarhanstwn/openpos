<?php

namespace App\Domains\Transactions\Dtos;

class UpdateTransactionDetailDto {
    public int $quantity;
    public float $discount;
    public float $subtotal;

    public function __construct(int $quantity, float $discount, float $subtotal)
    {
        $this->quantity = $quantity;
        $this->discount = $discount;
        $this->subtotal = $subtotal;
    }
}