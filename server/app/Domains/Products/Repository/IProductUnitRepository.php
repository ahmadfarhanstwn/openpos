<?php

namespace App\Domains\Products\Repository;

interface IProductUnitRepository 
{
    public function list();
    public function getById(int $id);
    public function store(array $data = []);
    public function update(int $id, array $data = []);
    public function destroyById(int $id);
}