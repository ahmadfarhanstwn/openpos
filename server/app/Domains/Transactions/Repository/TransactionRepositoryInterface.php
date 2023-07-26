<?php

namespace App\Domains\Transactions\Repository;

use App\Domains\Transactions\Dtos\CreateTransactionDto;
use App\Domains\Transactions\Dtos\TransactionDtoResponse;

interface TransactionRepositoryInterface
{
    public function addProduct(CreateTransactionDto $data, int $transactionId, int $userId): TransactionDtoResponse;
    public function getDetails(int $transactionId) : array;
    public function deleteTransactionDetail(int $transactionId, int $transactionDetailId): TransactionDtoResponse;
}