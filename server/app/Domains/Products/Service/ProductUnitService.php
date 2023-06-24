<?php

namespace App\Domains\Products\Service;

use App\Domains\Products\Repository\IProductUnitRepository;

class ProductUnitService
{
    public function __construct(private IProductUnitRepository $productUnitRepository)
    {}

    public function list()
    {
        return $this->productUnitRepository->list();
    }

    public function store($data = array())
    {
        return $this->productUnitRepository->store($data);
    }

    public function update($id, $data = array())
    {
        return $this->productUnitRepository->update($id, $data);
    }

    public function destroyById($id)
    {
        return $this->productUnitRepository->destroyById($id);
    }
}