<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Lesson;
use App\Models\Teacher;
use App\Models\Review;
use App\Models\Division;

class LessonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Lesson::factory(16)
            ->has(Teacher::factory()->count(1))    
            ->has(Review::factory()->count(5))
            ->for(Division::inRandomOrder()->first(), 'division')
            ->create();
    }
}
