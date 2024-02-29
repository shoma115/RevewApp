<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Lesson;
use App\Models\User;
use App\Models\Like;

class Review extends Model
{
    use HasFactory;

    public function lesson() {
        return $this->belongsTo(Lessn::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function likes() {
        return $this->hasMany(Like::class);
    }

    // mass assignment防止のため、laravelはデフォルトでAPI等を通じた外部からのカラムの書き換えを制限している
    // 書き換えが出来るカラムを指定
    protected $fillable = [
        "ease",
        "expertise",
        "opinion",
        "assignment",
        "communication",
        "growth",
        "content",
        "user_id",
        "lesson_id"
    ];
}
