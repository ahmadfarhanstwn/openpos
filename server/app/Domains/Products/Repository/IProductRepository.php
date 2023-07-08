<?php

namespace App\Domains\Products\Repository;

use App\Http\Requests\ProductStoreRequest;

interface IProductRepository {
    public function index(
        int $currentPage, 
        int $perPage, 
        string $productBarcode, 
        string $productName, 
        string $productUnit,
        string $productCategory
    );
    public function getById(int $id);
    public function store(array $request = array(), int $userId);
    public function update(array $request = array(), int $id);
    public function increaseStock(int $id, int $amount);
    public function decreaseStock(int $id, int $amount);
    public function deleteById(int $id);
}