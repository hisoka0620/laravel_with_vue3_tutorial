<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RegisteredUser;
use App\Http\Requests\UserRegistrationRequest;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function store(UserRegistrationRequest $request)
    {
        return RegisteredUser::create($request->all());
    }
}
