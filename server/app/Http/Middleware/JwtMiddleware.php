<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // try {
            $token = $request->header('Authorization');

            if (!$token) {
                throw new Exception('Token not provided', Response::HTTP_UNAUTHORIZED);
            }

            $user = auth()->user();

            if(!$user) {
                throw new Exception('User not found', Response::HTTP_UNAUTHORIZED);
            }

            $request->merge(['user' => $user]);
        // } catch(JWTException $e) {
        //     throw new Exception('Invalid token', Response::HTTP_UNAUTHORIZED);
        // } catch(TokenExpiredException $e) {
        //     throw new Exception('Token expired', Response::HTTP_UNAUTHORIZED);
        // }catch(Exception $e) {
        //     throw new Exception($e->getMessage(), Response::HTTP_UNAUTHORIZED);
        // }
        return $next($request);
    }
}
