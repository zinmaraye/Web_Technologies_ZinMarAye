@extends('backend.layouts.app')

@section('content')
    <ol class="breadcrumb">
        <li class="breadcrumb-item">Urgent Blood Request List</li>
    </ol>

    <div class="container-fluid">
        <div class="animated fadeIn">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <span><i class="fa fa-align-justify"></i> Urgent Blood Request List</span>
                            <a class="btn btn-sm btn-primary create_btn" href="{{ route('urgent_blood.create') }}">
                                <i class="fa fa-plus"></i> Add New Request
                            </a>
                        </div>

                        <div class="card-body">
                            @if($urgent_bloods->count())
                                <div class="table-responsive">
                                    <table class="table table-bordered table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Blood Group</th>
                                                <th>Location</th>
                                                <th>Address</th>
                                                <th>Contact</th>
                                                <th>Urgency</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @foreach($urgent_bloods as $index => $request)
                                                <tr>
                                                    <td>{{ $index + 1 }}</td>
                                                    <td>{{ $request->blood_group }}</td>
                                                    <td>{{ $request->location }}</td>
                                                    <td>{{ $request->address }}</td>
                                                    <td>{{ $request->contact }}</td>
                                                    <td>{{ $request->urgency }}</td>
                                                    <td>
                                                        @if($request->active)
                                                            <span class="badge badge-success py-2" disabled>Active</span>
                                                        @else
                                                            <span class="badge badge-danger py-2" disabled>Inactive</span>
                                                        @endif
                                                    </td>
                                                    <td>
                                                        <a href="{{ route('urgent_blood.edit', $request->id) }}" class="btn btn-sm btn-warning">Edit</a>
                                                        <form action="{{ route('urgent_blood.destroy', $request->id) }}" method="POST" style="display:inline-block;" onsubmit="return confirm('Are you sure?');">
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
                                </div>
                            @else
                                <p class="text-center">No urgent blood requests found.</p>
                            @endif
                        </div> <!-- /.card-body -->
                    </div> <!-- /.card -->
                </div> <!-- /.col-lg-12 -->
            </div> <!-- /.row -->
        </div> <!-- /.animated -->
    </div> <!-- /.container-fluid -->
@endsection
