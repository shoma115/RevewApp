<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "content" => fake()->realText(50, 5),
            "ease" => fake()->numberBetween(1,5),
            "expertise" => fake()->numberBetween(1,5),
            "opinion" => fake()->numberBetween(1,5),
            "assignment" => fake()->numberBetween(1,5),
            "communication" => fake()->numberBetween(1,5),
            "growth" => fake()->numberBetween(1,5),
        ];
    }
}
