@extends('backend.layouts.app')

@section('content')
    <ol class="breadcrumb">
        <li class="breadcrumb-item">User Donations</li>
    </ol>

    <div class="container-fluid">
        <div class="animated fadeIn">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <span><i class="fa fa-align-justify"></i> User Appointment List</span>
                            <a class="btn btn-sm btn-primary create_btn" href="">
                                <i class="fa fa-plus"></i> Add New Donation
                            </a>
                        </div>

                        <div class="card-body">
                            @if($user_appointments->count())
                                <div class="table-responsive">
                                    <table class="table table-bordered table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>User NAme</th>
                                                <th>Event Title</th>
                                                <th>Blood Type</th>
                                                <th>Donation Date</th>
                                                <th>Donation Time</th>
                                                <th>Last Dontation Date</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @foreach($user_appointments as $index => $user_appointment)
                                                <tr>
                                                    <td>{{ $index + 1 }}</td>
                                                    <td>{{ $user_appointment->user->name }}</td>
                                                    <td>{{ $user_appointment->event->title }}</td>
                                                    <td>{{ $user_appointment->blood_type }}</td>
                                                    <td>{{ $user_appointment->appointment_date }}</td>
                                                    <td>{{ $user_appointment->appointment_time }}</td>
                                                    <td>{{ $user_appointment->last_donation_date }}</td>
                                                    <td>
                                                        @if($user_appointment->status == 0)
                                                            <button class="btn btn-sm btn-warning" data-toggle="modal" data-target="#statusModal{{ $user_appointment->id }}" data-id="{{ $user_appointment->id }}">Pending</button>
                                                        @else
                                                            <span class="btn btn-sm btn-success disabled">Done</span>
                                                        @endif
                                                    </td>
                                                    <td>
                                                    @if($user_appointment->status == 0)
                                                    <form action="{{ route('user_appointment.destroy', $user_appointment->id) }}" method="POST" style="display:inline-block;" onsubmit="return confirm('Are you sure you want to delete this appointment?');">
                                                        @csrf
                                                        <button class="btn btn-sm btn-danger" type="submit">Delete</button>
                                                    </form>
                                                    @else
                                                    <button class="btn btn-sm btn-danger disabled" type="submit">Delete</button>
                                                    @endif
                                                </td>
                                                </tr>
                                                <!-- Status Update Modal -->
                                    <div class="modal fade" id="statusModal{{ $user_appointment->id }}" tabindex="-1" role="dialog" aria-labelledby="statusModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <form id="statusForm" method="POST" action="{{ route('update_status') }}" enctype="multipart/form-data">
                                        @csrf
                                        <input type="hidden" name="appointment_id" id="appointment_id" value="{{ $user_appointment->id }}">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                            <h5 class="modal-title">Update Status</h5>
                                            <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                                            </div>
                                            <div class="modal-body">
                                            <p>Choose an action for this pending appointment:</p>
                                            </div>
                                            <div class="modal-footer">
                                            <button type="submit" name="action" value="cancel" class="btn btn-danger">Cancel</button>
                                            <button type="submit" name="action" value="done" class="btn btn-success">Mark as Done</button>
                                            </div>
                                        </div>
                                        </form>
                                    </div>
                                    </div>
                                            @endforeach
                                        </tbody>
                                    </table>
                                    </div>

                                <div class="d-flex justify-content-center mt-3">
                                    {{-- {{ $donations->links() }} --}}
                                </div>
                            @else
                                <p class="text-center">No donations found.</p>
                            @endif
                        </div> <!-- /.card-body -->
                    </div> <!-- /.card -->
                </div> <!-- /.col-lg-12 -->
            </div> <!-- /.row -->
        </div> <!-- /.animated -->
    </div> <!-- /.container-fluid -->
@endsection
@section('script')
<script>
    $('#statusModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var appointmentId = button.data('id');
        $('#appointment_id').val(appointmentId);
    });
</script>
@endsection
