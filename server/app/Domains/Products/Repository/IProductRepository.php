<?php

namespace App\Domains\Products\Repository;

interface IProductRepository {
    public function index(int $currentPage, int $perPage);
    public function getById(int $id);
    public function store(array $request = array(), int $userId);
    public function update(array $request = array(), int $id);
    public function increaseStock(int $id, int $amount);
    public function decreaseStock(int $id, int $amount);
    public function deleteById(int $id);
}