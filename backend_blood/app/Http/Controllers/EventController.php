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
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image = $image->store('images/event', 'public');
        }
        // if($request->hasFile('image'))
        // {
        //    $img_file = $request->file('image');
        //    $main_img = \Str::random(10).time().'.'.$request->image->getClientOriginalExtension();
        //    $img_filepath = 'sfu-edu/image/event/cover_image/'.$main_img;
        //    \Storage::disk('spaces')->put($img_filepath, file_get_contents($img_file),'public');
        //    }else{
        //     $main_img = 'null';
        // }

        // if($request->hasfile('gallery'))
        // {
        //     foreach($request->file('gallery') as $key => $file)
        //     {
        //         $gallery_file = $file;
        //         $gallery_filename = \Str::random(10).time().'.'.$file->getClientOriginalExtension();
        //         $p_filepath = 'sfu-edu/image/event/gallery/'.$gallery_filename;
        //         \Storage::disk('spaces')->put($p_filepath, file_get_contents($gallery_file),'public');
        //         $gallery_f[] = $gallery_filename;
        //         $gallery=implode("|",$gallery_f);
        //     }

        // }else{
        //     $gallery =NULL;
        // }

        $event = Event::create([
            'title' => $validated_data['title'],
            'description' => $validated_data['description'],
            'status' => $request->get('status'),
            'image' => $image,
            'event_date' => $request->get('event_date'),
            'event_time' => $request->get('event_time'),
            'description' => $request->get('description'),
            // 'gallery' => $gallery,
            'date' => $request->get('date'),
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
        $validated_data = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'order' => 'required',
        ]);

        $event = Event::findOrFail($id);

        if($request->hasFile('image'))
        {
             $vi_file = $request->file('image');
             $vi_filename = \Str::random(10).time().'.'.$request->image->getClientOriginalExtension();
             $vi_filepath = 'sfu-edu/image/event/cover_image/'.$vi_filename;
             \Storage::disk('spaces')->put($vi_filepath, file_get_contents($vi_file),'public');
             $event->image = $vi_filename;
        }else{
            $event->image = $event->image;
        }

        if($request->hasfile('gallery'))
        {
            foreach($request->file('gallery') as $key => $file)
            {
                $p_file = $file;
                $p_filename = \Str::random(10).time().'.'.$file->getClientOriginalExtension();
                $p_filepath = 'sfu-edu/image/event/gallery/'.$p_filename;
                \Storage::disk('spaces')->put($p_filepath, file_get_contents($p_file),'public');
                $gallery[] = $p_filename;
                $event->gallery =implode("|",$gallery);
            }
        }else{
            $event->gallery = $event->gallery;
        }

        $event->title = $request->get('title');
        $event->description = $request->get('description');
        $event->status = $request->get('status');
        $event->date = $request->get('date');
        $event->order = $request->get('order');
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
