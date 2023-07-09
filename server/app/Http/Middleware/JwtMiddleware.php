<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;

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
        try {
            $token = $request->header('Authorization');

            error_log($token);

            if (!$token) {
                // abort(401, 'Token not provided');
                return response()->json(['error' => 'Token not provided'], 401);
            }

            $user = auth()->user();

            if(!$user) {
                return response()->json(['error' => 'User not found'], 401);
            }

            $request->merge(['user' => $user]);
        } catch(JWTException $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        } catch(Exception $e) {
            return response()->json(['error' => $e->getMessage()], 401);
        }
        return $next($request);
    }
}
