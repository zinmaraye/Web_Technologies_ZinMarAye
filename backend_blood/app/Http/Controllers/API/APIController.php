<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\DonationGallery;
use App\Models\UrgentBlood;
use App\Models\Appointment;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class APIController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function eventList()
    {
        $events = Event::all();
        return response()->json([
            'status' => true,
            'message' => 'Event List',
            'data' => $events // Return the events array directly
        ]);
    }

    public function donationGallery()
    {
        $donation_gallery = DonationGallery::all();
        return response()->json([
            'status' => true,
            'message' => 'Donation Gallery',
            'data' => $donation_gallery
        ]);
    }

    public function urgentBloodList()
    {
        $urgent_bloods = UrgentBlood::all();
        return response()->json([
            'status' => true,
            'message' => 'Urgent Blood List',
            'data' => [$urgent_bloods]
        ]);
    }
    public function userDonationList()
    {
        $user_donations = UserDonation::all();
        return response()->json([
            'status' => true,
            'message' => 'User Donation List',
            'data' => [$user_donations]
        ]);
    }

    public function appointment_store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'bloodType' => 'required|string',
            'appointmentDate' => 'required|date',
            'appointmentTime' => 'required',
            'event_title' => 'required|string',
            'event_date' => 'required|date',
            'event_time' => 'required|string',
            'event_address' => 'required|string',
        ]);

        $appointment = Appointment::create($validated);

        return response()->json(['message' => 'Appointment saved successfully', 'data' => $appointment], 201);
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:users,name',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Create the user
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user,
        ]);
    }

    // public function login(Request $request)
    // {
    //     // Validate the incoming request
    //     $request->validate([
    //         'email' => 'required|string',
    //         'password' => 'required|string',
    //     ]);

    //     // Attempt to authenticate the user
    //     if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
    //         $user = Auth::user();
    //         return response()->json([
    //             'message' => 'Login successful',
    //             'user' => $user,
    //         ]);
    //     }

    //     return response()->json([
    //         'message' => 'Invalid credentials',
    //     ], 401);
    // }

    public function login(Request $request)
{
    // Validate the incoming request
    $request->validate([
        'email' => 'required|string|email',
        'password' => 'required|string',
    ]);

    // Check if the user exists
    $user = User::where('email', $request->email)->first();

    if ($user && Hash::check($request->password, $user->password)) {
        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
        ]);
    }

    return response()->json([
        'message' => 'Invalid credentials',
    ], 401);
}
}
