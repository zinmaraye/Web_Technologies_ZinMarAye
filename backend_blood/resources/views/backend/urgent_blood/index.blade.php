@extends('backend.layouts.app')

@section('content')
    <ol class="breadcrumb">
        <li class="breadcrumb-item">Urgent Blood List</li>
    </ol>

    <div class="container-fluid">
        <div class="animated fadeIn">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        {{-- <div class="card-header d-flex justify-content-between align-items-center">
                            <span><i class="fa fa-align-justify"></i> Urgent Blood List</span>
                            <a class="btn btn-sm btn-primary" href="{{ route('blood.create') }}">
                                <i class="fa fa-plus"></i> Add New Request
                            </a>
                        </div> --}}

                        <div class="card-body">
                            @if($urgent_bloods->count())
                                <div class="table-responsive">
                                    <table class="table table-bordered table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Blood Group</th>
                                                <th>Address</th>
                                                <th>Phone</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @foreach($urgent_bloods as $index => $request)
                                                <tr>
                                                    <td>{{ $index + 1 }}</td>
                                                    <td>{{ $request->blood_group }}</td>
                                                    <td>{{ $request->address }}</td>
                                                    <td>{{ $request->phone }}</td>
                                                    <td>{{ $request->status }}</td>
                                                    <td>
                                                        <a href="{{ route('blood.edit', $request->id) }}" class="btn btn-sm btn-warning">Edit</a>
                                                        <form action="{{ route('blood.destroy', $request->id) }}" method="POST" style="display:inline-block;" onsubmit="return confirm('Are you sure?');">
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
                                    {{ $bloodRequests->links() }}
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
