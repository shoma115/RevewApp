<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\DepartmentCollection;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $faculty_id = $request->query("faculty");

        $departments = Department::where("faculty_id", "=", $faculty_id)
                                    ->with("majors.divisions")
                                    ->get();

        return new DepartmentCollection($departments);
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
    public function show(Department $department)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Department $department)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        //
    }
}
