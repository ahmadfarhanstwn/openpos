<?php

namespace App\Domains\Products\Service;

use App\Domains\Products\Repository\IProductUnitRepository;
use Symfony\Component\HttpFoundation\Response;

class ProductUnitService
{
    public function __construct(private IProductUnitRepository $productUnitRepository)
    {}

    public function list()
    {
        try {
            $data = $this->productUnitRepository->list();

            return response()->json([
                'message' => 'Success',
                'data' => $data
            ], Response::HTTP_OK);
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    public function store($data = array())
    {
        try {
            $data = $this->productUnitRepository->store($data);
            return response()->json([
                'message' => 'Success',
                'data' => $data
            ], Response::HTTP_CREATED);
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    public function update($id, $data = array())
    {
        try {
            $data = $this->productUnitRepository->update($id, $data);
            return response()->json([
                'message' => 'Success',
                'data' => $data
            ], Response::HTTP_OK);
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    public function destroyById($id)
    {
         try {
            $data = $this->productUnitRepository->destroyById($id);
            return response()->json([
                'message' => 'Success',
                'data' => $data
            ], Response::HTTP_OK);
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }
}