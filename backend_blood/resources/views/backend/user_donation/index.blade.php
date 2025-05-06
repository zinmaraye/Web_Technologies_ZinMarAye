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
                            <span><i class="fa fa-align-justify"></i> User Donation List</span>
                            <a class="btn btn-sm btn-primary" href="">
                                <i class="fa fa-plus"></i> Add New Donation
                            </a>
                        </div>

                        <div class="card-body">
                            @if($user_donations->count())
                                <div class="table-responsive">
                                    <table class="table table-bordered table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>User ID</th>
                                                <th>Blood Type</th>
                                                <th>Donation Date</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @foreach($user_donations as $index => $donation)
                                                <tr>
                                                    <td>{{ $index + 1 }}</td>
                                                    <td>{{ $donation->user_id }}</td>
                                                    <td>{{ $donation->blood_type }}</td>
                                                    <td>{{ $donation->donation_date }}</td>
                                                    <td>{{ $donation->status }}</td>
                                                    <td>
                                                        <a href="{{ route('donations.edit', $donation->id) }}" class="btn btn-sm btn-warning">Edit</a>
                                                        <form action="{{ route('donations.destroy', $donation->id) }}" method="POST" style="display:inline-block;" onsubmit="return confirm('Are you sure?');">
                                                            @csrf
                                                            @method('DELETE')
                                                            <button type="submit" class="btn btn-sm btn-danger">Delete</button>
                                                        </form>
                                                    </td>
                                                </tr>
                                            @endforeach
                                        </tbody>
                                    </table>
                                </div>

                                <div class="d-flex justify-content-center mt-3">
                                    {{ $donations->links() }}
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
