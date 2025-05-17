<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UrgentBlood;

class UrgentBloodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct()
    {
        $this->middleware('auth:admin');
    }

    public function list()
    {
        $urgent_bloods = UrgentBlood::all();
        return view('backend.urgent_blood.index', compact('urgent_bloods'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('backend.urgent_blood.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'blood_group' => 'required|string',
            'location' => 'required|string',
            'address' => 'required|string',
            'contact' => 'required|string',
            'urgency' => 'required|string',
            'active' => 'required|integer',
        ]);

        $urgentBlood = new UrgentBlood();
        $urgentBlood->blood_group = $validatedData['blood_group'];
        $urgentBlood->location = $validatedData['location'];
        $urgentBlood->address = $validatedData['address'];
        $urgentBlood->contact = $validatedData['contact'];
        $urgentBlood->urgency = $validatedData['urgency'];
        $urgentBlood->active = $validatedData['active'];

        $urgentBlood->save();

        // Return a success message or response
        return redirect()->route('urgent_blood.list')
        ->with('success', 'Urgent blood request saved successfully!');
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
    public function edit($id)
    {
        $urgent_blood = UrgentBlood::findOrFail($id);
        return view('backend.urgent_blood.edit', compact('urgent_blood'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'blood_group' => 'required|string',
            'location' => 'required|string',
            'address' => 'required|string',
            'contact' => 'required|string',
            'urgency' => 'required|string',
            'active' => 'required|boolean',
        ]);
        $urgent_blood = UrgentBlood::findOrFail($id);
        $urgent_blood->update([
            'blood_group' => $request->blood_group,
            'location' => $request->location,
            'address' => $request->address,
            'contact' => $request->contact,
            'urgency' => $request->urgency,
            'active' => $request->active,
        ]);

        return redirect()->route('urgent_blood.list')->with('success', 'Urgent Blood Request updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $urgent_blood = UrgentBlood::findOrFail($id);
        $urgent_blood->delete();
        return redirect()->route('urgent_blood.list')->with('success', 'Urgent Blood Request deleted successfully!');
    }
}
