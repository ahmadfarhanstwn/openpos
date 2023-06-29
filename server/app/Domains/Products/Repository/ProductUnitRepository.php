<?php

namespace App\Domains\Products\Repository;

use App\Models\ProductUnit;
use App\Domains\Products\Repository\IProductUnitRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpFoundation\Response;

class ProductUnitRepository implements IProductUnitRepository
{
    public function list()
    {
        return ProductUnit::get();
    }

    public function getById(int $id)
    {
        try {
            return ProductUnit::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            throw new \Exception('Product Unit not found', Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            throw $e;
        }
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
        try {
            $productUnit = ProductUnit::findOrFail($id);
            $productUnit->unit_name = $data['unit_name'];
            $productUnit->save();
            return $productUnit;
        } catch (ModelNotFoundException $e) {
            throw new \Exception('Product Unit not found', Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function destroyById(int $id)
    {
        try {
            $productUnit = ProductUnit::findOrFail($id);
            $productUnit->delete();
            return $productUnit;
        } catch (ModelNotFoundException $e) {
            throw new \Exception('Product Unit not found', Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            throw $e;
        }
    }
}