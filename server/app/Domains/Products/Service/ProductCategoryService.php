<?php

namespace App\Domains\Products\Service;

use App\Domains\Products\Repository\IProductCategoryRepository;
use Symfony\Component\HttpFoundation\Response;

class ProductCategoryService
{
    public function __construct(private IProductCategoryRepository $productCategoryRepository)
    {}

    public function list()
    {
        try {
            $data = $this->productCategoryRepository->list();
            return response()->json([
                'message' => 'Success',
                'data' => $data
            ], Response::HTTP_OK);
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    public function productList($id)
    {
        try {
            $data = $this->productCategoryRepository->productList($id);
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
            $data = $this->productCategoryRepository->store($data);
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
            $data = $this->productCategoryRepository->update($id, $data);
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
            $data =  $this->productCategoryRepository->destroyById($id);
            return response()->json([
                'message' => 'Success',
                'data' => $data
            ], Response::HTTP_OK);
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }
}