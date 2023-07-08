<?php

namespace App\Domains\Products\Service;

use App\Domains\Products\Repository\IProductRepository;
use App\Http\Requests\ProductStoreRequest;
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
                'error' => 'current_page should be numeric'
            ], Response::HTTP_BAD_REQUEST);
        }

        $perPage = $request->query('per_page', 10);
        if(!is_numeric($perPage)) {
            return response()->json([
                'error' => 'per_page should be numeric'
            ], Response::HTTP_BAD_REQUEST);
        }

        // filter
        $productBarcode = $request->query('product_barcode', '');
        $productName = $request->query('product_name', '');
        $productUnit = $request->query('product_unit', '');
        $productCategory = $request->query('product_category', '');

        $data = $this->productRepository->index($currentPage, $perPage, $productBarcode, $productName, $productUnit, $productCategory);
        
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

    public function store(array $request = array(), int $userId)
    {
        try {
            $data = $this->productRepository->store($request, $userId);
            return response()->json([
                'message' => 'Success',
                'data' => $data
            ], Response::HTTP_CREATED);
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
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