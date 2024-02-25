<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LessonAPITest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_lesson(): void
    {
        $response = $this->get('/api/lesson');

        $response->assertStatus(200);
    }
}
