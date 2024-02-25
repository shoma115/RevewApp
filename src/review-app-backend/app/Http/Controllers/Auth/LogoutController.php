<?php
declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Auth\AuthManager;
use Illuminate\Http\JsonResponse;

class LogoutController extends Controller
{
    public function __construct(private readonly AuthManager $auth,) 
    {

    }
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): JsonResponse
    {
        // ユーザーが認証されていない場合
        if($this->auth->guard()->guest()) {
            return new JsonRespose([
                'message' => '既にログアウトしています。'
            ]);
        }

        // ログアウトする
        $this->auth->guard()->logout();
        // セッションを無効化する
        $request->session()->invalidate();
        // CSRFトークンを再生成する
        $request->session()->regenerateToken();

        return new JsonRequest([
            'message' => 'ログアウトしました。'
        ]);
    }
}
