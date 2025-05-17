<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Appointment;
use App\Models\Event;
use App\Models\UrgentBlood;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct()
    {
        $this->middleware('auth:admin');
    }

    public function dashboard()
     {
        // Total active users (assuming 'status' column)
    $activeDonors = User::where('status', 1)->count();

    // Total appointments done (status = 1 means done)
    $completedAppointments = Appointment::where('status', 1)->count();

    // Upcoming events count (events with date >= today)
    $upcomingEvents = Event::whereDate('event_date', '>=', Carbon::today())->count();

    // Active urgent needs count (assuming 'active' field = 1 means active)
    $activeUrgentNeeds = UrgentBlood::where('active', 1)->count();

    return view('backend.dashboard', compact(
        'activeDonors',
        'completedAppointments',
        'upcomingEvents',
        'activeUrgentNeeds'
    ));
    }
}
