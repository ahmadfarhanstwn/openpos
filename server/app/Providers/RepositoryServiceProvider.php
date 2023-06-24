<?php

namespace App\Providers;

use App\Domains\Products\Repository\IProductCategoryRepository;
use App\Domains\Products\Repository\ProductCategoryRepository;
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
    }
}
