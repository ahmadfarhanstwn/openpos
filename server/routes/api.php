<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
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