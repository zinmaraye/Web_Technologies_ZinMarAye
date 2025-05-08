<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'email', 'phone', 'bloodType',
        'appointmentDate', 'appointmentTime',
        'event_title', 'event_date', 'event_time', 'event_address'
    ];
}
