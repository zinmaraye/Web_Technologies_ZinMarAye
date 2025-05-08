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

        // dd($request->all());
        // if ($request->hasFile('image')) {
        //     $image = $request->file('image');
        //     $image = $image->store('images/event', 'public');
        // }

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
        $event = Event::findOrFail($id);
        return view('backend.events.edit', compact('event'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validate the incoming request data
        $validated_data = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'order' => 'required',
        ]);

        // Find the event by its ID
        $event = Event::findOrFail($id);

        // Handle Image Upload
        if ($request->hasFile('image')) {
            // Process the uploaded image for 'storage' and 'public' folder
            $image = $request->file('image');
            $imageName = \Str::random(10) . time() . '.' . $image->getClientOriginalExtension();

            $imagePathStorage = $image->store('images/event', 'public');

            // Save the image in the 'public/images/event' folder for direct access
            $imagePathPublic = public_path('images/event/' . $imageName);
            $image->move(public_path('images/event'), $imageName);

            // Set the image paths
            $event->image = $imageName;
        } else {
            $event->image = $event->image;
        }

        $event->title = $request->get('title');
        $event->description = $request->get('description');
        $event->status = $request->get('status');
        $event->date = $request->get('date');

        // Save the event
        $event->update();
        return redirect()->route('event.index', compact('event'));
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
