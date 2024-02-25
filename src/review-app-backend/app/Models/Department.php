<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Major;
use App\Models\Faculty;

class Department extends Model
{
    use HasFactory;

    public function majors() {
        return $this->hasMany(Major::class);
    }

    public function faculty() {
        return $this->belongsTo(Faculty::class);
    }
}
