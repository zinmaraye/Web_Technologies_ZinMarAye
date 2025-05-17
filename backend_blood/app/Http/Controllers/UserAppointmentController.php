<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;


class UserAppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function list()
    {
        $user_appointments = Appointment::with('user','event','urgent')->get();
        return view('backend.user_appointment.list', compact('user_appointments'));
    }

    public function updateStatus(Request $request)
    {
        $appointment = Appointment::findOrFail($request->appointment_id);
        if ($request->action == 'done') {
            $appointment->status = 1;
        }
        $appointment->update();

        return redirect()->back()->with('status', 'Appointment updated.');
    }

    public function destroy($id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->delete();
        return redirect()->back()->with('status', 'Appointment deleted.');
    }

}
