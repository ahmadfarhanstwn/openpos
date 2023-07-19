<?php

namespace App\Providers;

use App\Domains\Products\Repository\IProductCategoryRepository;
use App\Domains\Products\Repository\IProductRepository;
use App\Domains\Products\Repository\IProductUnitRepository;
use App\Domains\Products\Repository\ProductCategoryRepository;
use App\Domains\Products\Repository\ProductRepository;
use App\Domains\Products\Repository\ProductUnitRepository;
use App\Domains\Transactions\Repository\TransactionRepository;
use App\Domains\Transactions\Repository\TransactionRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(IProductCategoryRepository::class, ProductCategoryRepository::class);
        $this->app->bind(IProductUnitRepository::class, ProductUnitRepository::class);
        $this->app->bind(IProductRepository::class, ProductRepository::class);
        $this->app->bind(TransactionRepositoryInterface::class, TransactionRepository::class);
    }
}
