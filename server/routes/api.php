<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductCategoryController;
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
    Route::get('category/products_list', 'productList');
    Route::post('category', 'store');
    Route::put('category/{id}', 'update');
    Route::delete('category/{id}', 'delete');
});