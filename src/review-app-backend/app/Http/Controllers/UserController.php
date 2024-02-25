<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\RegisterRequest;
use Illuminate\Auth\Events\Registered;
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RegisterRequest $request)
    {
        $user_name = mb_convert_encoding ($request->input("name"), 'UTF-8', 'UTF-8');
        $email = mb_convert_encoding ($request->input("email"), 'UTF-8', 'UTF-8');
        $password = mb_convert_encoding ($request->input("password"), 'UTF-8', 'UTF-8');
        
        $user = User::create([
            "name" =>  $user_name,
            "email" => $email,
            "password" => Hash::make($password),
        ]);
        // ユーザーの新規登録イベントを通知。認証メールを発火させる
        // event(new Registered($user));

        // // // セッションIDの再生成。セッション固定化攻撃によってアカウント乗っ取りなどが行えないように
        // $request->session()->regenerate();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
