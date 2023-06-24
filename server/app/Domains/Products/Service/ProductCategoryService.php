<?php

namespace App\Domains\Products\Service;

use App\Domains\Products\Repository\IProductCategoryRepository;

class ProductCategoryService
{
    public function __construct(private IProductCategoryRepository $productCategoryRepository)
    {}

    public function list()
    {
        return $this->productCategoryRepository->list();
    }

    public function productList($id)
    {
        return $this->productCategoryRepository->productList($id);
    }

    public function store($data = array())
    {
        return $this->productCategoryRepository->store($data);
    }

    public function update($id, $data = array())
    {
        return $this->productCategoryRepository->update($id, $data);
    }

    public function destroyById($id)
    {
        return $this->productCategoryRepository->destroyById($id);
    }
}