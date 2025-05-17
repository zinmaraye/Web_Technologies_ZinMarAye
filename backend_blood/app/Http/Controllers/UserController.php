<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Appointment;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::orderBy('id', 'desc')->paginate(10);
        return view('backend.user.index', compact('users'));
    }

    public function create()
    {
        return view('backend.user.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'phone' => 'nullable',
            'blood_group' => 'nullable',
            'address' => 'nullable',
        ]);

        if ($request->filled('password')) {
            $validated['password'] = Hash::make($request->password);
        } else {
            unset($validated['password']);
        }
        $validated['status'] = 1;
        User::create($validated);

        return redirect()->route('user.list')->with('status', 'User created successfully.');
    }

    public function edit($user_id)
    {
        $user = User::findOrFail($user_id);
        return view('backend.user.edit', compact('user'));
    }

    public function update(Request $request)
    {
        // dd($request->all());
        $user = User::findOrFail($request->user_id);
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|min:6',
            'phone' => 'nullable',
            'blood_group' => 'nullable',
            'address' => 'nullable',
        ]);
        $validated['status'] = 1;
        // dd('ZMA3');
        // Only hash and set password if provided
        if ($request->filled('password')) {
            $validated['password'] = Hash::make($request->password);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return redirect()->route('user.list')->with('status', 'User updated successfully.');
    }


    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('user.list')->with('status', 'User deleted.');
    }

    public function userHistory($user_id)
    {
        $user = User::find($user_id);
        $appointments = Appointment::where('user_id', $user_id)->get();
        return view('backend.user.user_history', compact('user', 'appointments'));
    }
}
