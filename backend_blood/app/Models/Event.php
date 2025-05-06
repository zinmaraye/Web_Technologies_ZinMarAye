<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    public $table = 'events';

    public $fillable = [
        'id',
        'title',
        'description',
        'event_date',
        'event_time',
        'image',
        'address'
    ];

    protected $casts = [
        'id' => 'integer',
        'title' => 'string',
        'description' => 'string',
        'event_date' => 'string',
        'event_time' => 'string',
        'image' => 'string',
        'address' => 'string',
    ];
}
