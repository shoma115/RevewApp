<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Http\Resources\LessonCollection;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $faculty_id = $request->query("faculty");
        $per_page = 15;
        // リレーションから同時に取得している
        $lessons = Lesson::with("teachers")
                   ->withAvg("reviews", "ease")
                   ->withAvg("reviews", "enrichment")
                //    リレーション先をとってくるwithメソッドと、取得するデータをレコードで絞り込めるwhereHasメソッドを合わせたやべーやつ
                   ->withWhereHas("division.major.department.faculty", function($faculty) use ($faculty_id) {
                        $faculty->where("id", "=", $faculty_id);
                   }) 
                   ->paginate($per_page);

        return new LessonCollection($lessons);
    }

    public function search(Request $request) 
    {
        $faculty_id = $request->query("faculty");
        $per_page = 15;

        $query_lesson = Lesson::query();

        // クエリパラメータに基づいて、動的にクエリを組み立て
        if($request->has("search")) {
            $search_word = $request->query("search");
            $query_lesson->where("name", "LIKE", "%$search_word%");
        }
        if($request->has("division")) {
            $division_id = $request->query("division");
            $query_lesson->where("division_id", "=", $division_id);
        }
        if($request->has("major")) {
            $major_id = $request->query("major");
            $query_lesson->whereHas("division", function($division) use ($major_id) {
                $division->where("major_id", "=", $major_id);
            });
        }
        if($request->has("department")) {
            $department_id = $request->query("department");
            $query_lesson->whereHas("division.major", function($major) use ($department_id) {
                $major->where("department_id", "=", $department_id);
            });
        }
            
        $flitered_lesson = $query_lesson->with("teachers")
            ->withAvg("reviews", "ease")
            ->withAvg("reviews", "enrichment")
            //    リレーション先をとってくるwithメソッドと、取得するデータをレコードで絞り込めるwhereHasメソッドを合わせたやべーやつ
            ->withWhereHas("division.major.department.faculty", function($faculty) use ($faculty_id) {
                $faculty->where("id", "=", $faculty_id);
            }) 
            ->paginate($per_page);
            
        return new LessonCollection($flitered_lesson);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Lesson $lesson)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Lesson $lesson)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lesson $lesson)
    {
        //
    }
}
