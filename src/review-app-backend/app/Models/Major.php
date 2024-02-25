<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Department;
use App\Models\Division;


class Major extends Model
{
    use HasFactory;

    public function divisions() {
        return $this->hasMany(Division::class);
    }

    public function department() {
        return $this->belongsTo(Department::class);
    }
}
