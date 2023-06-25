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
        return $this->productCategoryService->list();
    }

    public function productList(int $id)
    {
        return $this->productCategoryService->productList($id);
    }

    public function store(ProductCategoryStoreRequest $request)
    {
        $validatedRequest = $request->validated();

        return $this->productCategoryService->store($validatedRequest);
    }

    public function update(ProductCategoryStoreRequest $request, int $id)
    {
        $validatedRequest = $request->validated();

        return $this->productCategoryService->update($id, $validatedRequest);
    }

    public function delete(int $id)
    {
        return $this->productCategoryService->destroyById($id);
    }
}
