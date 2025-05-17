<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     public function __construct()
     {
        $this->middleware('auth:admin');
     }

    public function index()
    {
        $events = Event::all();
        return view('backend.events.index', compact('events'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('backend.events.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validated_data = $request->validate([
            'title' => 'required',
            'image' => 'required',
            'description' => 'required',
        ]);
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePathStorage = $image->store('images/event', 'public');

            $imageName = time() . '_' . $image->getClientOriginalName();
            $imagePathPublic = public_path('images/event/' . $imageName);
            $image->move(public_path('images/event'), $imageName);
        }

        $event = Event::create([
            'title' => $validated_data['title'],
            'status' => $request->get('status'),
            'image' => $imageName,
            'event_date' => $request->get('event_date'),
            'event_time' => $request->get('event_time'),
            'address' => $request->get('address'),
        ]);

        return redirect()->route('events.index');
    }


    public function edit(string $id)
    {
        $event = Event::findOrFail($id);
        return view('backend.events.edit', compact('event'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $event = Event::findOrFail($request->id);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = \Str::random(10) . time() . '.' . $image->getClientOriginalExtension();

            // Move file to public/images/event
            $image->move(public_path('images/event'), $imageName);

            $image = $imageName;
        } else {
            $image = $event->image;
        }
        $event->title = $request->title;
        $event->description = $request->description;
        $event->event_date = $request->event_date;
        $event->event_time = $request->event_time;
        $event->address = $request->address;
        $event->image = $image;
        $event->update();
        // dd($event);
        return redirect()->route('events.index')->with('status', 'Event updated successfully.');
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $urgent_blood = Event::findOrFail($id);
        $urgent_blood->delete();
        return redirect()->route('events.index')->with('success', 'Event Request deleted successfully!');
    }
}
