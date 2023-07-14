<?php

namespace App\Http\Controllers;

use App\Domains\Products\Service\ProductService;
use App\Http\Requests\ProductStockIncreaseDecreaseRequest;
use App\Http\Requests\ProductStoreRequest;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends Controller
{
    public function __construct(private ProductService $productService)
    {
        $this->middleware('jwt.auth');
    }

    public function index(Request $request)
    {
        return $this->productService->index($request);
    }

    public function getById(int $id)
    {
        return $this->productService->getById($id);
    }

    public function getByQuery(Request $request)
    {
        $query = $request->query('product_name', '');
        return $this->productService->getByQuery($query);
    }

    public function store(ProductStoreRequest $request)
    {
        $validatedRequest = $request->validated();

        $userId = auth()->id();

        return $this->productService->store($validatedRequest, $userId);
    }

    public function update(ProductStoreRequest $request, int $id)
    {
        $validatedRequest = $request->validated();

        return $this->productService->update($validatedRequest, $id);
    }

    public function increaseStock(ProductStockIncreaseDecreaseRequest $request, int $id)
    {
        $validatedRequest = $request->validated();

        return $this->productService->increaseStock($validatedRequest, $id);
    }

    public function decreaseStock(ProductStockIncreaseDecreaseRequest $request, int $id)
    {
        $validatedRequest = $request->validated();

        return $this->productService->decreaseStock($validatedRequest, $id);
    }

    public function deleteById(int $id)
    {
        return $this->productService->deleteyById($id);
    }
}
