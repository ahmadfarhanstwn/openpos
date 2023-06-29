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
        return $this->productUnitService->list();
    }

    public function store(ProductUnitStoreRequest $request)
    {
        $validatedRequest = $request->validated();

        return $this->productUnitService->store($validatedRequest);
    }

    public function update(ProductUnitStoreRequest $request, int $id)
    {
        $validatedRequest = $request->validated();

        return $this->productUnitService->update($id, $validatedRequest);
    }

    public function delete(int $id)
    {
        return $this->productUnitService->destroyById($id);
    }
}
