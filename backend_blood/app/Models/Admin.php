<?php

namespace App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Authenticatable
{
    use HasFactory;

    public $table = 'admins';

    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'phone',
        'admin_permission',
    ];

    protected $casts = [
        'id' => 'integer',
        'name' => 'string',
        'email' => 'string',
        'email_verified_at' => 'datetime',
        'password' => 'string',
        'role_id' => 'integer',
        'phone' => 'integer',
        'admin_permission' => 'string',
    ];
}
