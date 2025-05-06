<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\DonationGallery;
use App\Models\UrgentBlood;
use Illuminate\Http\Request;

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
}
