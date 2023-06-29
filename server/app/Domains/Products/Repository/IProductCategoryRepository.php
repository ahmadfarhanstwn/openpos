<?php

namespace App\Domains\Products\Repository;

interface IProductCategoryRepository 
{
    public function list();
    public function productList(int $id);
    public function getById(int $id);
    public function store(array $data = []);
    public function update(int $id, array $data = []);
    public function destroyById(int $id);
}