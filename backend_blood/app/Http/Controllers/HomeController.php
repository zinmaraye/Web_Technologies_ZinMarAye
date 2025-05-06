<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:admin');
    }

    // public function __construct()
    // {
    //     $this->middleware('guest')->except('logout');
    //     $this->middleware('guest:admin')->except('logout');
    // }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function dashboard()
     {
    //     $activeDonors = Donor::where('status', 'active')->count(); // Assuming 'status' column to track active donors
    //     $livesSaved = BloodDonation::sum('amount');  // Assuming amount of blood donated corresponds to lives saved
    //     $monthlyDonations = BloodDonation::whereMonth('donation_date', now()->month)->count(); // Count donations for the current month
    $activeDonors = 50; // Example value
    $livesSaved = 100; // Example value
    $monthlyDonations = 20000;
    return view('backend.dashboard', compact('activeDonors', 'livesSaved', 'monthlyDonations'));
    }

    public function user_donation()
    {
        $donations = Donation::paginate(10); // Adjust pagination as needed
        return view('admin.donations.index', compact('donations'));
    }

}
