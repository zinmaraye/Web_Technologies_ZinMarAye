<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'blood_type','appointment_date', 'appointment_time',
        'last_donation_date', 'event_id', 'type','status','notes'
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User','user_id','id');
    }

    public function event()
    {
        return $this->belongsTo('App\Models\Event','event_id','id');
    }

    public function urgent()
    {
        return $this->belongsTo('App\Models\UrgentBlood','urgent_blood_id','id');
    }
}
