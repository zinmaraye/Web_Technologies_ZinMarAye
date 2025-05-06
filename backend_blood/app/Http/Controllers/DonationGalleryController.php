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
        $galleryItems = DonationGallery::all(); // Fetch all gallery items
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
        // Validate incoming request data
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'thumbnail' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:4096',
            'rank' => 'required|integer|min:1',
        ]);

        // Handle file uploads (if any)
        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $request->file('thumbnail')->store('images/donation/thumbnails', 'public');
        }

        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imagePaths[] = $image->store('images/donation/gallery', 'public');
            }
        }

        // Create a new gallery item
        DonationGallery::create([
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'thumbnail' => $thumbnailPath ?? null,
            'image' => $imagePaths ? json_encode($imagePaths) : null,
            'rank' => $validatedData['rank'],
        ]);

        return redirect()->route('donation_gallery.index')->with('success', 'Gallery item created successfully!');
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
        $galleryItem = DonationGallery::findOrFail($id); // Find the gallery item by ID
        return view('backend.donation_gallery.edit', compact('galleryItem'));
    }

    public function update(Request $request, $id)
    {
        $galleryItem = DonationGallery::findOrFail($id);

        // Validate incoming request data
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'thumbnail' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:4096',
            'rank' => 'required|integer|min:1',
        ]);

        // Handle file uploads (if any)
        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $request->file('thumbnail')->store('images/donation/thumbnails', 'public');
            $galleryItem->thumbnail = $thumbnailPath;
        }

        // Create a new GalleryItem or retrieve an existing one
        $galleryItem = new GalleryItem();

        // Check if images are uploaded
        if ($request->hasFile('images')) {
            $imagePaths = []; // Array to store paths of uploaded images

            // Loop through each uploaded image and store it
            foreach ($request->file('images') as $image) {
                // Store each image in the 'images/donation/gallery' folder and get the path
                $imagePath = $image->store('images/donation/gallery', 'public');

                // Add the image path to the array
                $imagePaths[] = $imagePath;
            }

            // Optionally, store the image paths in the database (e.g., serialize the array)
            $galleryItem->image = json_encode($imagePaths);  // Assuming you want to save the paths as a JSON array

            // Save the gallery item (or save in your database)
            $galleryItem->save();
        }

        // Update the gallery item with the validated data
        $galleryItem->title = $validatedData['title'];
        $galleryItem->description = $validatedData['description'];
        $galleryItem->rank = $validatedData['rank'];
        $galleryItem->save();

        return redirect()->route('donation_gallery.index')->with('success', 'Gallery item updated successfully!');
    }
}
