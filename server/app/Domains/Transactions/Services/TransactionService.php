<?php

namespace App\Domains\Transactions\Services;

use App\Domains\Transactions\Dtos\CreateTransactionDto;
use App\Domains\Transactions\Dtos\TransactionDtoResponse;
use App\Domains\Transactions\Repository\TransactionRepositoryInterface;

class TransactionService
{
    public function __construct(private TransactionRepositoryInterface $transactionRepository)
    {}

    public function addProduct(CreateTransactionDto $data, int $transactionid, int $userId) : TransactionDtoResponse
    {
        return $this->transactionRepository->addProduct($data, $transactionid, $userId);
    }

    public function getDetails(int $transactionId)
    {
        return $this->transactionRepository->getDetails($transactionId);
    }

    public function deleteTransactionDetail(int $transactionId, int $transactionDetailId)
    {
        return $this->transactionRepository->deleteTransactionDetail($transactionId, $transactionDetailId);
    }

    public function pay(int $transactionId, array $data)
    {

    }

    public function cancel(int $transactionId)
    {

    }
}