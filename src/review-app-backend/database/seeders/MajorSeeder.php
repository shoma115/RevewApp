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
        Major::factory(4)
            ->has(Division::factory()->count(2))
            ->for(Department::inRandomOrder()->first(), "department")
            ->create();
    }
}
