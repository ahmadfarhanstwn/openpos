<?php

namespace App\Domains\Transactions\Repository;

use App\Domains\Transactions\Dtos\CreateTransactionDto;
use App\Domains\Transactions\Dtos\TransactionDtoResponse;
use App\Domains\Transactions\Dtos\UpdateTransactionDetailDto;

interface TransactionRepositoryInterface
{
    public function addProduct(CreateTransactionDto $data, int $transactionId, int $userId): TransactionDtoResponse;
    public function getDetails(int $transactionId) : array;
    public function deleteTransactionDetail(int $transactionId, int $transactionDetailId): TransactionDtoResponse;
    public function updateTransactionDetail(UpdateTransactionDetailDto $data, int $transactionId, int $transactionDetailId): TransactionDtoResponse;
}