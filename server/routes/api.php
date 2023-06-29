<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductUnitController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//FOR TESTING PURPOSE
Route::get('/test', function () {
    return env('DB_HOST').' '.env('DB_PORT');
});

//auth
Route::controller(AuthController::class)->group(function() {
    Route::post('signin', 'signin');
    Route::post('signup', 'signup');
    Route::post('signout', 'signout');
    Route::post('refresh', 'refresh');
});

Route::controller(ProductCategoryController::class)->group(function() {
    Route::get('category', 'index');
    Route::get('category/product_list/{id}', 'productList');
    Route::post('category', 'store');
    Route::put('category/{id}', 'update');
    Route::delete('category/{id}', 'delete');
});

Route::controller(ProductUnitController::class)->group(function() {
    Route::get('unit', 'index');
    Route::post('unit', 'store');
    Route::put('unit/{id}', 'update');
    Route::delete('unit/{id}', 'delete');
});

Route::controller(ProductController::class)->group(function() {
    Route::get('product', 'index');
    Route::get('product/{id}', 'getById');
    Route::post('product', 'store');
    Route::put('product/{id}', 'update');
    Route::put('product/increase/{id}', 'increaseStock');
    Route::put('product/decrease/{id}', 'decreaseStock');
    Route::delete('product/{id}', 'deleteById');
});