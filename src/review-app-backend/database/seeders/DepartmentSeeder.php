<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Department;
use App\Models\Faculty;
use App\Models\Major;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Department::factory(10)
            ->has(Major::factory()->count(3))
            // belongsToリレーションをfacultyと結ぶ。
            // FacultySeederに記述したhasだけでカラムは埋まるが、明示的にbelongsToを記述しないとデフォルト値エラーが発生した。
            // 第二引数は、モデル内に記述したリレーションを参照している
            ->for(Faculty::inRandomOrder()->first(), 'faculty')
            ->create();
    }
}
