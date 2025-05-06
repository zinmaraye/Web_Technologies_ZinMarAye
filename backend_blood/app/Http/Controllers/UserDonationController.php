<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserDonation;

class UserDonationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function list()
    {
        $user_donations = UserDonation::all(); // Fetch all user donations
        return view('backend.user_donation.index', compact('user_donations')); // Pass them to the view
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
