<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Division;
use App\Models\Review;
use App\Models\Teacher;

class Lesson extends Model
{
    use HasFactory;

    public function division() {
        return $this->belongsTo(Division::class);
    }

    public function reviews() {
        return $this->hasMany(Review::class);
    }

    public function teachers() {
        return $this->belongsToMany(Teacher::class);
    }
}
