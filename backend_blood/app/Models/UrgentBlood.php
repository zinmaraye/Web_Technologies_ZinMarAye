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
        'address',
        'phone',
        'status'
    ];

    protected $casts = [
        'id' => 'integer',
        'blood_group' => 'string',
        'address' => 'string',
        'phone' => 'integer',
        'status' => 'integer',
    ];
}
