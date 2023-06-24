<?php

namespace App\Domains\Products\Repository;

use App\Models\ProductUnit;
use App\Domains\Products\Repository\IProductUnitRepository;

class ProductUnitRepository implements IProductUnitRepository
{
    public function list()
    {
        return ProductUnit::get();
    }

    public function getById(int $id)
    {
        return ProductUnit::find($id);
    }

    public function store(array $data = array())
    {
        $productUnit = new ProductUnit;

        $productUnit->unit_name = $data['unit_name']; 

        $productUnit->save();

        return $productUnit;
    }

    public function update(int $id, array $data = array())
    {
        $productUnit = ProductUnit::find($id);

        if(!$productUnit) return $productUnit;

        $productUnit->unit_name = $data['unit_name'];

        $productUnit->save();

        return $productUnit;
    }

    public function destroyById(int $id)
    {
        $productUnit = ProductUnit::find($id);

        if(!$productUnit) return $productUnit;

        $productUnit->delete();

        return $productUnit;
    }
}