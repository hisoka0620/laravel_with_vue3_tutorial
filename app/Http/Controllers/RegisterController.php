<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RegisteredUser;

class RegisterController extends Controller
{
    public function store(Request $request){

        $request->validate([
            'user_id' => 'required|unique:registered_users,user_id',
            'email' => 'required|unique:registered_users,email',
            'password' => 'required|min:4|confirmed'
        ]);

        return RegisteredUser::create($request->all());

    }

}
