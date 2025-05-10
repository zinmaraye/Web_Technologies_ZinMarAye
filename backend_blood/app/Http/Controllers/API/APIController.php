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

        try {

            $validated = $request->validate([
                'name' => 'required|string',
                'email' => 'required|email',
                'phone' => 'required|string',
                'password' => 'required|string',
                'bloodType' => 'required|string',
                'appointment_date' => 'required|date',
                'appointment_time' => 'required',
                'last_donation_date' => 'required|string',
                'type' => 'required|string',
                'event_id' => 'required|integer',
            ]);
            // dd('ZMA');


            if($validated['type'] == 'urgent'){
                $validated['event'] = UrgentBlood::where('id', $validated['event_id'])->first();
            }else{
                $validated['event'] = Event::where('id', $validated['event_id'])->first();
            }
            $event = UrgentBlood::where('id', $validated['event_id'])->first();
            $event = Event::where('id', $validated['event_id'])->first();
            // dd($event);
            if (!$event) {
                \Log::error('Event not found:', ['urgent_blood_id' => $validated['urgent_blood_id']]);
                return response()->json(['message' => 'Event not found'], 404);
            }


            $user = User::where('phone', $validated['phone'])
            ->orWhere('email',$validated['email'])->first();
            if (!$user) {
                // dd($validated['bloodType']);
                $user = User::create([
                    'name' => $validated['name'],
                    'email' => $validated['email'],
                    'phone' => $validated['phone'],
                    'password' => Hash::make($validated['password']),
                    // 'blood_group' => $request->bloodType,
                    // 'status' => 'active',
                ]);
                // dd($user);
                \Log::info('Created new user:', $user->toArray());
            }

            $appointment = Appointment::create(array_merge($validated, [
                'user_id' => $user->id,
                'event_id' => $validated['event']->id,
            ]));

            \Log::info('Created appointment:', $appointment->toArray());

            return response()->json(['message' => 'Appointment saved successfully', 'data' => $appointment], 201);
        } catch (\Exception $e) {
            \Log::error('Error in appointment store: ' . $e->getMessage());
            return response()->json(['message' => 'Submission failed. Please try again.'], 500);
        }
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


public function getUserDonations($userId)
    {
        // Retrieve the user from the database
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Fetch donations for the user
        $donations = Appointment::where('user_id', $userId)
            ->orderBy('last_donation_date', 'desc') // You can adjust this as needed
            ->get();

        // Return the donations data as JSON
        return response()->json(['donations' => $donations]);
    }

}
