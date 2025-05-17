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
                'appointment_date' => 'required|date',
                'appointment_time' => 'required',
                'last_donation_date' => 'required|string',
                'type' => 'required|string',
            ]);


            if($validated['type'] == 'urgent'){
                $validated['event'] = UrgentBlood::where('id', $request->event_id)->first();
                $event = $validated['event']->id;
            }elseif($validated['type'] == 'event'){
                $validated['event'] = Event::where('id', $request->event_id)->first();
                $event = $validated['event']->id;
            }else{
                $event = null;
            }

            $appointment = Appointment::create(array_merge($validated, [
                'user_id' => $request->user_id,
                'event_id' => $event,
                'blood_type' => $request->bloodType,
                'notes' => $request->notes,
            ]));
            $user = User::where('id',$request->user_id)->first();
            $user->blood_group = $request->bloodType;
            $user->weight = $request->weight;
            $user->update();
            \Log::info('Created appointment:', $appointment->toArray());

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
            'weight' => $request->weight,
            'age' => $request->age,
            'status' => 1,
        ]);

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user,
        ]);
    }

    public function login(Request $request)
{
    $request->validate([
        'email' => 'required|string|email',
        'password' => 'required|string',
    ]);
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
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $donations = Appointment::where('user_id', $userId)
            ->orderBy('last_donation_date', 'desc')
            ->with([
                'user:id,name',
                'event:id,title,event_date'
            ])
            ->get()
            ->map(function ($appointment) {
                return [
                    'id' => $appointment->id,
                    'event_title' => $appointment->event->title ?? null,
                    'event_date' => $appointment->event->event_date ?? null,
                    'blood_type' => $appointment->blood_type,
                    'appointment_date' => $appointment->appointment_date,
                    'appointment_time' => $appointment->appointment_time,
                    'last_donation_date' => $appointment->last_donation_date,
                    'type' => $appointment->type,
                    'status' => $appointment->status == 0 ? 'Pending' : 'Done',
                ];
            });

        return $donations;
    }

}
