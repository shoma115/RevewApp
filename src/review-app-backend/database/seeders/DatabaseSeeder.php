<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Http\App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            FacultySeeder::class,
            DepartmentSeeder::class,
            MajorSeeder::class,
            DivisionSeeder::class,
            LessonSeeder::class,
            TeacherSeeder::class,
            ReviewSeeder::class,
            UserSeeder::class,
        ]);
    }
}
