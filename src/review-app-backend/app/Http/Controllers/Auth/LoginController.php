<?php
declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\AuthManager;
use Illuminate\Http\JsonResponse;

final class LoginController extends Controller
{
    //  @param AuthManager $auth
    public function __construct(private readonly AuthManager $auth,) 
    {
    
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(LoginRequest $request): JsonResponse
    {
        $credential = $request->only(['email', 'password']);

        if($this->auth->guard()->attempt($credential)) {
            // セッションIDの再生成。セッション固定化攻撃によってアカウント乗っ取りなどが行えないように
            $request->session()->regenerate();

            // レスポンスを返す。ここのJsonにはAPIリソースは使わない。APIリソースはモデルやコレクションデータに特化しているようだから
            return new JsonResponse([
                'message' => 'ログインに成功しました。'
            ]);
        }
        // 認証エラー時に例外処理を投げる。
        throw new AuthenticationException();
    }
}
