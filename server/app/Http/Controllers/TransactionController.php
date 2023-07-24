<?php

namespace App\Http\Controllers;

use App\Domains\Transactions\Dtos\CreateTransactionDto;
use App\Domains\Transactions\Services\TransactionService;
use App\Http\Requests\AddTransactionStoreRequest;
use Illuminate\Http\Response;

class TransactionController extends Controller
{
    public function __construct(private TransactionService $transactionService)
    {
        $this->middleware('jwt.auth');
    }

    public function addProduct(AddTransactionStoreRequest $request, int $transactionId)
    {
        $user = $request->user();
        $userId = $user->id;

        $validatedRequest = $request->validated();

        $data = new CreateTransactionDto(
            $validatedRequest['product_id'],
            $validatedRequest['quantity'],
            $validatedRequest['discount'],
            $validatedRequest['subtotal']
        );

        $responseData = $this->transactionService->addProduct($data, $transactionId, $userId);

        return response()->json([
            'data' => $responseData
        ], Response::HTTP_CREATED);
    }

    public function getDetails(int $transactionId)
    {
        $responseData = $this->transactionService->getDetails($transactionId);

        return response()->json([
            'data' => $responseData
        ], Response::HTTP_OK);
    }

    public function saveDraft()
    {

    }


}