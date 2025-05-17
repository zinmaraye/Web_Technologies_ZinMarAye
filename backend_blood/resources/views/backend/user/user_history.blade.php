@extends('backend.layouts.app')

@section('content')
    <ol class="breadcrumb">
        <li class="breadcrumb-item active">User Appointment History</li>
    </ol>

    <div class="container-fluid">
        <div class="animated fadeIn">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <span><i class="fa fa-history"></i>User Appointment History</span>
                </div>

                <div class="card-body">
                    @if($appointments->count())
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>User</th>
                                        <th>Event</th>
                                        <th>Blood Type</th>
                                        <th>Appointment Date</th>
                                        <th>Appointment Time</th>
                                        <th>Last Donation</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($appointments as $index => $appointment)
                                        <tr>
                                            <td>{{ $index + 1 }}</td>
                                            <td>{{ $appointment->user->name }}</td>
                                            <td>{{ $appointment->event->title }}</td>
                                            <td>{{ $appointment->blood_type }}</td>
                                            <td>{{ $appointment->appointment_date }}</td>
                                            <td>{{ $appointment->appointment_time }}</td>
                                            <td>{{ $appointment->last_donation_date }}</td>
                                            <td>
                                                @if($appointment->status == 1)
                                                    <span class="badge badge-success">Done</span>
                                                @elseif($appointment->status == 0)
                                                    <span class="badge badge-warning">Pending</span>
                                                @else
                                                    <span class="badge badge-danger">Cancelled</span>
                                                @endif
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    @else
                        <p class="text-center">No appointment history found.</p>
                    @endif
                </div>
            </div>
        </div>
    </div>
@endsection
