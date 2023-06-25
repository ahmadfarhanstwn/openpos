<?php

namespace App\Domains\Products\Service;

use App\Domains\Products\Repository\IProductRepository;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ProductService
{
    public function __construct(private IProductRepository $productRepository)
    {}

    public function index(Request $request)
    {
        $currentPage = $request->query('current_page', 1);
        if(!is_numeric($currentPage)) {
            return response()->json([
                'message' => 'current_page should be numeric'
            ], Response::HTTP_BAD_REQUEST);
        }

        $perPage = $request->query('per_page', 10);
        if(!is_numeric($perPage)) {
            return response()->json([
                'message' => 'per_page should be numeric'
            ], Response::HTTP_BAD_REQUEST);
        }

        $data = $this->productRepository->index($currentPage, $perPage);
        
        return response()->json([
            'message' => 'Success',
            'data' => $data
        ], Response::HTTP_OK);
    }

    public function getById(int $id)
    {
        try {
            $data = $this->productRepository->getById($id);
            return response()->json([
                'message' => 'Success',
                'data' => $data
            ], Response::HTTP_OK);
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    public function store($request = array(), int $userId)
    {
        $data = $this->productRepository->store($request, $userId);
        return response()->json([
            'message' => 'Success',
            'data' => $data
        ], Response::HTTP_CREATED);
    }

    public function update($request = array(), int $id)
    {
        try {
            $data = $this->productRepository->update($request, $id);
            return response()->json([
                'message' => 'Success',
                'data' => $data
            ], Response::HTTP_OK);
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    public function increaseStock($request = array(), int $id)
    {
        try {
            $data = $this->productRepository->increaseStock($id, $request['amount']);
            return response()->json([
                'message' => 'Success',
                'data' => $data
            ], Response::HTTP_OK);
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    public function decreaseStock($request = array(), int $id)
    {
        try {
            $data = $this->productRepository->decreaseStock($id, $request['amount']);
            return response()->json([
                'message' => 'Success',
                'data' => $data
            ], Response::HTTP_OK);
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    public function deleteyById($id)
    {
        try {
            $data = $this->productRepository->deleteById($id);
            return response()->json([
                'message' => 'Success',
                'data' => $data
            ], Response::HTTP_OK);
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }
}