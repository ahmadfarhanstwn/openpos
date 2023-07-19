<?php

namespace App\Domains\Transactions\Repository;

use App\Domains\Transactions\Dtos\CreateTransactionDto;
use App\Domains\Transactions\Dtos\TransactionDtoResponse;
use App\Models\Product;
use App\Models\TransactionDetails;
use App\Models\Transactions;
use Illuminate\Http\Response;
use App\Domains\Transactions\Repository\TransactionRepositoryInterface;
use Exception;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

class TransactionRepository implements TransactionRepositoryInterface
{
    public function addProduct(CreateTransactionDto $data, int $transactionId, int $userId): TransactionDtoResponse
    {
        $product = Product::where('product_id', '=', $data->productId)->first();

        if($product->is_deleted == 'Y') {
            throw new BadRequestException('Product is already deleted', Response::HTTP_BAD_REQUEST);
        }

        if ($product->unit_in_stock < $data->quantity) {
            throw new BadRequestException('Quantity is less than stock', Response::HTTP_BAD_REQUEST);
        }

        if($transactionId == 0) {
            $transactionData = Transactions::create([
                'user_id' => $userId
            ]);
            $transactionId = $transactionData->transaction_id;
        }

        $transactionDetailsData = TransactionDetails::create([
            'transaction_id' => $transactionId,	
            'product_id' => $data->productId,
            'quantity' => $data->quantity,	
            'discount' => $data->discount,
            'subtotal' => $data->subtotal
        ]);

        return new TransactionDtoResponse(
            $transactionDetailsData->transaction_id,
            $transactionDetailsData->product_id,
            $transactionDetailsData->quantity,
            $transactionDetailsData->discount,
            $transactionDetailsData->subtotal
        );
    }
}