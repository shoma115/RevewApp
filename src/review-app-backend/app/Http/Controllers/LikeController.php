<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\LikeRequest;

class LikeController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(LikeRequest $request)
    {
        $like = $request->only(["review_id"]);
        $like["user_id"] = Auth::id();
        Like::create($like);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LikeRequest $request)
    {
        $review_id = $request->query("review_id");
        $user_id = Auth::id();
        $delete_like = Like::where("review_id", "=", $review_id)->where("user_id", "=", $user_id)->first();
        $delete_like->delete();
    }
}
