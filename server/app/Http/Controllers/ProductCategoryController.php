<?php

namespace App\Http\Controllers;

use App\Domains\Products\Service\ProductCategoryService;
use App\Http\Requests\ProductCategoryStoreRequest;
use Symfony\Component\HttpFoundation\Response;

class ProductCategoryController extends Controller
{
    public function __construct(private ProductCategoryService $productCategoryService)
    {
        $this->middleware('jwt.auth');
    }

    public function index()
    {
        $categoryList = $this->productCategoryService->list();

        return response()->json([
            'message' => 'Success',
            'data' => $categoryList
        ], Response::HTTP_OK);
    }

    public function productList(int $id)
    {
        $productList = $this->productCategoryService->productList($id);

        return response()->json([
            'message' => 'Success',
            'data' => $productList
        ], Response::HTTP_OK);
    }

    public function store(ProductCategoryStoreRequest $request)
    {
        $validatedRequest = $request->validated();

        $newProductCategory = $this->productCategoryService->store($validatedRequest);

        return response()->json([
            'message' => 'Success',
            'data' => $newProductCategory
        ], Response::HTTP_CREATED);
    }

    public function update(ProductCategoryStoreRequest $request, int $id)
    {
        $validatedRequest = $request->validated();

        $newProductCategory = $this->productCategoryService->update($id, $validatedRequest);

        if (!$newProductCategory) {
            return response()->json([
                'message' => 'There is no product category with provided id',
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json([
            'message' => 'Update Success',
            'data' => $newProductCategory
        ], Response::HTTP_OK);
    }

    public function delete(int $id)
    {
        $deletedProductCategory = $this->productCategoryService->destroyById($id);

        if (!$deletedProductCategory) {
            return response()->json([
                'message' => 'There is no product category with provided id',
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json([
            'message' => 'Delete Success',
            'data' => $deletedProductCategory
        ], Response::HTTP_OK);
    }
}
