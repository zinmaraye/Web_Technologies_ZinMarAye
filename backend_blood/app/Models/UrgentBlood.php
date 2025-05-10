<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UrgentBlood extends Model
{
    use HasFactory;

    public $table = 'urgent_bloods';

    public $fillable = [
        'id',
        'blood_group',
        'location',
        'address',
        'contact',
        'urgency',
        'active'
    ];

    protected $casts = [
        'id' => 'integer',
        'blood_group' => 'string',
        'location' => 'string',
        'address' => 'string',
        'contact' => 'string',
        'urgency' => 'string',
        'active' => 'integer',
    ];
}
