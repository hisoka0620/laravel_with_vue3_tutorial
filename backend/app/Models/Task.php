<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
	use HasFactory;
	protected $fillable = [
		'title',
		'content',
		'person_in_charge',
        'confirmed',
        'deadline'
	];

    protected $casts = [
        'deadline' => 'datetime:Y-m-d H:i'
    ];
}
