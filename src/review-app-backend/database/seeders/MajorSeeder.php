<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Major;
use App\Models\Division;
use App\Models\Department;

class MajorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Major::factory(10)
            ->has(Division::factory()->count(10))
            ->for(Department::inRandomOrder()->first(), "department")
            ->create();
    }
}
