<?php

namespace App\Http\Controllers;

use App\Http\Requests\SignInRequest;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['signin', 'signup']]);
    }

    public function signin(SignInRequest $request)
    {
        $credentials = $request->only('username', 'password');

        $user = User::where('username', $credentials['username'])->first();

        if (!$user) {
            return response()->json([
                'error' => 'Username not found'
            ], 422);
        }

        if(!Hash::check($credentials['password'], $user->password))
        {
            return response()->json([
                'error' => 'Invalid Password'
            ], 422);
        }

        try {
            $token = auth()->attempt($credentials);

            return response()->json([
                'message' => 'success',
                'user' => $user,
                'authorization' => [
                    'token' => $token,
                    'type' => 'bearer'
                ]
            ], 200);
        } catch(JWTException $e) {
            return response()->json([
                'error' => 'Auth error'
            ], 500);
        }
    }

    public function signup(SignUpRequest $request)
    {
        $validatedRequest = $request->validated();

        $user = User::create([
            'username' => $validatedRequest['username'],
            'email' => $validatedRequest['email'],
            'full_name' => $validatedRequest['full_name'],
            'password' => Hash::make($validatedRequest['password']),
            'role' => $validatedRequest['role'],
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'User created succesfully',
            'user' => $user
        ], 201);
    }

    public function signout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Succesfully logout'
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorization' => [
                'token' => Auth::refresh(),
                'type' => 'bearer'
            ]
        ]);
    }
}
