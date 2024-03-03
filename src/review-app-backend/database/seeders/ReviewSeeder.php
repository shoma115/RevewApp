<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Review;
use App\Models\Lesson;
use App\Models\User;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Review::factory(50)
            ->for(Lesson::inRandomOrder()->first(), "lesson")
            ->for(User::inRandomOrder()->first(), "user")
            ->create();
    }
}
