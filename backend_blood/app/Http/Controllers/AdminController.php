<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
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
        // $admins = Admin::orderBy('id', 'desc')->get();
        $admins = Admin::paginate(10);
        return view('backend.admin.index', compact('admins'));
    }

    public function create()
    {
        return view('backend.admin.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:admins,email',
            'password' => 'required|min:6',
            'phone' => 'nullable',
        ]);

        if ($request->filled('password')) {
            $validated['password'] = Hash::make($request->password);
        } else {
            unset($validated['password']);
        }

        Admin::create($validated);

        return redirect()->route('admin.index')->with('status', 'Admin created successfully.');
    }

    public function edit($admin_id)
    {
        $admin = Admin::findOrFail($admin_id);
        return view('backend.admin.edit', compact('admin'));
    }

    public function update(Request $request, Admin $admin)
    {
        $admin = Admin::findOrFail($request->admin_id);
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:admins,email,' . $admin->id,
            'password' => 'nullable|min:6',
            'phone' => 'nullable',
        ]);

        if ($request->filled('password')) {
            $validated['password'] = Hash::make($request->password);
        } else {
            unset($validated['password']);
        }

        if (!$request->filled('password')) {
            unset($validated['password']);
        }

        $admin->update($validated);

        return redirect()->route('admin.index')->with('status', 'Admin updated successfully.');
    }

    public function destroy(Admin $admin)
    {
        $admin->delete();
        return redirect()->route('admin.index')->with('status', 'Admin deleted.');
    }
}
