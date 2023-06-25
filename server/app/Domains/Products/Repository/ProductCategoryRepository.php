<?php

namespace App\Domains\Products\Repository;

use App\Models\ProductCategory;
use App\Domains\Products\Repository\IProductCategoryRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpFoundation\Response;

class ProductCategoryRepository implements IProductCategoryRepository
{

    public function list()
    {
        return ProductCategory::get();
    }

    public function productList(int $id)
    {
        return ProductCategory::findOrFail($id)->products;
    }

    public function getById(int $id)
    {
        try {
            return ProductCategory::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            throw new \Exception('Product Category not found', Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function store(array $data = array())
    {
        $productCategory = new ProductCategory;

        $productCategory->category_name = $data['category_name']; 

        $productCategory->save();

        return $productCategory;
    }

    public function update(int $id, array $data = array())
    {
        try {
            $productCategory = ProductCategory::findOrFail($id);
            $productCategory->category_name = $data['category_name'];
            $productCategory->save();
            return $productCategory;
        } catch (ModelNotFoundException $e) {
            throw new \Exception('Product Category not found', Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function destroyById(int $id)
    {
        try{
            $productCategory = ProductCategory::findOrFail($id);
            $productCategory->delete();
            return $productCategory;
        } catch (ModelNotFoundException $e) {
            throw new \Exception('Product Category not found', Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            throw $e;
        }
    }
}