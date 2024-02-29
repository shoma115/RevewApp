<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Lesson;
use App\Http\Resources\ReviewCollection;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\ReviewPostRequest;
use App\Http\Requests\ReviewUpdateRequest;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $lesson_id = $request->query("lesson");
        $reviews = Review::where("lesson_id", "=", $lesson_id)
                            ->with("user")
                            ->with("likes")
                            ->get();
        
        return new ReviewCollection($reviews);
    }

    public function search(Request $request) 
    {
        $lesson_id = $request->query("lesson");
        $query_review = Review::query();

        if($request->has("search")) {
           $search_word = $request->query("search");
           $query_review->where("content", "LIKE", "%$search_word%"); 
        }

        $filterd_reviews = $query_review
                            ->where("lesson_id", "=", $lesson_id)
                            ->with("user")
                            ->with("likes")
                            ->get();
        
        return new ReviewCollection($filterd_reviews); 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ReviewPostRequest $request)
    {
        $review = $request->only([
                                    "ease",
                                    "expertise",
                                    "opinion",
                                    "assignment",
                                    "communication",
                                    "growth",
                                    "content",
                                    "lesson_id"
                                ]);
        $review["user_id"] = Auth::id();
        Review::create($review);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ReviewUpdateRequest $request, Review $review)
    {
        $updated_review = $request->only([
                                            "ease",
                                            "expertise",
                                            "opinion",
                                            "assignment",
                                            "communication",
                                            "growth",
                                            "content",
                                        ]);
        $review->update($updated_review);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        $review->delete();
    }
}
