<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Division;
use App\Models\Lesson;
use App\Models\Major;

class DivisionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Division::factory(10)
        ->has(Lesson::factory()->count(10))
        ->for(Major::inRandomOrder()->first(), "major")
        ->create();
    }
}
