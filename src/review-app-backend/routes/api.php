<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\VerificationController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post("/login", LoginController::class)->name("login");
Route::post("/logout", LogoutController::class)->name("logout");
Route::post("/register", [UserController::class, "store"])->name("register");
// Route::get('/email/verify/{id}/{hash}', [VerificationController::class, "verification_request"])
//     ->middleware(['auth', 'signed'])->name('verification.verify');
// Route::post('/email/verification-notification', [VerificationController::class, "resend_verification_email"])
//     ->middleware(['auth:sanctum', 'throttle:6,1'])->name('verification.send');

// Route::middleware("auth:sanctum", "verified")->group(function() {
Route::middleware("auth:sanctum")->group(function() {
    Route::get("/lesson/search", [LessonController::class, "search"])->name("lesson_search");
    Route::apiResource("lesson", LessonController::class);

    Route::get("/review/search", [ReviewController::class, "search"])->name("review_search");
    Route::apiResource("review", ReviewController::class)->only(["index", "create", "store", "update", "destroy"]);
    Route::post("like", [LikeController::class, "store"])->name("like_store");
    Route::delete("unlike", [LikeController::class, "destroy"])->name("like_delete");
    
    Route::apiResource("faculty", FacultyController::class)->only(["index", "create", "store", "update", "destroy"]);
    
    Route::apiResource("department", DepartmentController::class)->only(["index", "create", "store", "update", "destroy"]);
    
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});