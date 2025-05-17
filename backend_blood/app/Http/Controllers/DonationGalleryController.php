<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DonationGallery;

class DonationGalleryController extends Controller
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
        $galleryItems = DonationGallery::all();
        return view('backend.donation_gallery.index', compact('galleryItems')); // Pass them to the view
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('backend.donation_gallery.create'); // Return the view for creating a new gallery item
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:4096',
            'rank' => 'required|integer|min:1',
        ]);
        $imagePaths = [];
    if ($request->hasFile('images'))
    {
        foreach ($request->file('images') as $image) {

            $imagePathStorage = $image->store('images/donation/gallery', 'public');

            $imageName = time() . '_' . $image->getClientOriginalName();

            $imagePathPublic = public_path('images/donation/gallery/' . $imageName);

            $image->move(public_path('images/donation/gallery'), $imageName);

            $imagePaths[] = $imageName;
        }
    }
        DonationGallery::create([
            'title' => $validatedData['title'],
            'image' => $imagePaths ? json_encode($imagePaths) : null,
            'rank' => $validatedData['rank'],
        ]);

        return redirect()->route('donation_gallery.index')->with('success', 'Gallery item created successfully!');
    }

    public function edit($id)
    {
        $galleryItem = DonationGallery::findOrFail($id); // Find the gallery item by ID
        return view('backend.donation_gallery.edit', compact('galleryItem'));
    }

    public function update(Request $request, $id)
    {
        $galleryItem = DonationGallery::findOrFail($id);
        // Handle file uploads (if any)
        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $request->file('thumbnail')->store('images/donation/thumbnails', 'public');
            $galleryItem->thumbnail = $thumbnailPath;
        }

        $imagePaths = [];
    if ($request->hasFile('images'))
    {
        foreach ($request->file('images') as $image) {

            $imagePathStorage = $image->store('images/donation/gallery', 'public');

            $imageName = time() . '_' . $image->getClientOriginalName();

            $imagePathPublic = public_path('images/donation/gallery/' . $imageName);

            $image->move(public_path('images/donation/gallery'), $imageName);

            $imagePaths[] = $imageName;
            $galleryItem->image =json_encode($imagePaths);
        }
    }else{
        $galleryItem->image = $galleryItem->image;
    }

        $galleryItem->title = $request->title;
        $galleryItem->rank = $request->rank;
        $galleryItem->save();

        return redirect()->route('donation_gallery.index')->with('success', 'Gallery item updated successfully!');
    }

    public function destroy(string $id)
    {
        $urgent_blood = DonationGallery::findOrFail($id);
        $urgent_blood->delete();
        return redirect()->route('donation_gallery.index')->with('success', 'Donation Gallery Request deleted successfully!');
    }
}
