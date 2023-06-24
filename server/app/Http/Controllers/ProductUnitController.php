<?php

namespace App\Http\Controllers;

use App\Domains\Products\Service\ProductUnitService;
use App\Http\Requests\ProductUnitStoreRequest;
use Symfony\Component\HttpFoundation\Response;

class ProductUnitController extends Controller
{
    public function __construct(private ProductUnitService $productUnitService)
    {
        $this->middleware('jwt.auth');
    }

    public function index()
    {
        $categoryList = $this->productUnitService->list();

        return response()->json([
            'message' => 'Success',
            'data' => $categoryList
        ], Response::HTTP_OK);
    }

    public function store(ProductUnitStoreRequest $request)
    {
        $validatedRequest = $request->validated();

        $newProductUnit = $this->productUnitService->store($validatedRequest);

        return response()->json([
            'message' => 'Success',
            'data' => $newProductUnit
        ], Response::HTTP_CREATED);
    }

    public function update(ProductUnitStoreRequest $request, int $id)
    {
        $validatedRequest = $request->validated();

        $newProductUnit = $this->productUnitService->update($id, $validatedRequest);

        if (!$newProductUnit) {
            return response()->json([
                'message' => 'There is no product category with provided id',
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json([
            'message' => 'Update Success',
            'data' => $newProductUnit
        ], Response::HTTP_OK);
    }

    public function delete(int $id)
    {
        $deletedProductUnit = $this->productUnitService->destroyById($id);

        if (!$deletedProductUnit) {
            return response()->json([
                'message' => 'There is no product category with provided id',
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json([
            'message' => 'Delete Success',
            'data' => $deletedProductUnit
        ], Response::HTTP_OK);
    }
}
