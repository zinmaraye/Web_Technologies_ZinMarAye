<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DonationGallery extends Model
{
    use HasFactory;

    public $table = 'donation_galleries';

    public $fillable = [
        'id',
        'title',
        'image',
        'rank',
    ];

    protected $casts = [
        'id' => 'integer',
        'title' => 'string',
        'image' => 'string',
        'rank' => 'integer',
    ];
}
