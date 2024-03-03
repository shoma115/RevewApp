<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Review;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(5)
            ->has(Review::factory()->count(3))
            ->create();

        // User::factory()->create([
        //     'name' => 'shoma',
        //     'email' => 'k2123232@kadai.jp',
        // ]);
    }
}
