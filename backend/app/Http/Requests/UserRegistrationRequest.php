<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRegistrationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'user_id' => 'required|unique:registered_users',
            'email' => 'required|email|unique:registered_users',
            'last_name' => 'required',
            'first_name' => 'required',
            'password' => 'required|min:4|confirmed'
        ];
    }

    public function messages()
    {
        return [
            'user_id.required' => 'useID is required.',
            'user_id.unique' => 'userID is already registered.',
            'email.required' => 'email is required.',
            'email.email' => 'not in email format.',
            'lastname.required' => 'lastname is required.',
            'firstname.required' => 'firstname is required.',
            'password.required' => 'password is required.',
            'password.min' => 'please enter a password with at least 4 digits.',
            'password.confirmed' => 'doesn\'t match the confirmation password.'
        ];
    }
}
