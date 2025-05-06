<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDonation extends Model
{
    use HasFactory;

    public $table = 'user_donations';

    public $fillable = [
        'id',
        'user_id',
        'blood_type',
        'donation_date',
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
