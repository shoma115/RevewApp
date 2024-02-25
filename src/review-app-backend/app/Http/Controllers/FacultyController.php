<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\FacultyCollection;

class FacultyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $faculties = Faculty::get(["id", "name"]);

        return new FacultyCollection($faculties);
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
    public function show(Faculty $faculty)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Faculty $faculty)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Faculty $faculty)
    {
        //
    }
}
