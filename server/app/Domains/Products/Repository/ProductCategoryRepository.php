<?php

namespace App\Domains\Products\Repository;

use App\Models\ProductCategory;
use App\Domains\Products\Repository\IProductCategoryRepository;

class ProductCategoryRepository implements IProductCategoryRepository
{
    public function __construct()
    {}

    public function list()
    {
        return ProductCategory::get();
    }

    public function productList(int $id)
    {
        return ProductCategory::find($id)->products;
    }

    public function getById(int $id)
    {
        return ProductCategory::find($id);
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
        $productCategory = ProductCategory::find($id);

        if(!$productCategory) return $productCategory;

        $productCategory->category_name = $data['category_name'];

        $productCategory->save();

        return $productCategory;
    }

    public function destroyById(int $id)
    {
        $productCategory = ProductCategory::find($id);

        if(!$productCategory) return $productCategory;

        $productCategory->delete();

        return $productCategory;
    }
}