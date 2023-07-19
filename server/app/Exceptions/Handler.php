<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Throwable;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->renderable(function(TokenInvalidException $e, Request $request){
            return response()->json(['message'=>'Invalid token'],Response::HTTP_UNAUTHORIZED);
        });

        $this->renderable(function (TokenExpiredException $e, Request $request) {
            return response()->json(['error'=>'Token has Expired'],Response::HTTP_UNAUTHORIZED);
        });

        $this->renderable(function (JWTException $e, Request $request) {
            return response()->json(['error'=>'Token not parsed'],Response::HTTP_UNAUTHORIZED);
        });

        $this->renderable(function (BadRequestException $e, Request $request) {
            return response()->json([
                'message' => $e->getMessage()
            ], $e->getCode() == 0 ? Response::HTTP_BAD_REQUEST : $e->getCode());
        });
    }
}
