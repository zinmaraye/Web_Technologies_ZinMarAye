@extends('backend.layouts.app')

@section('content')
    <ol class="breadcrumb">
        <li class="breadcrumb-item">Admin List</li>
    </ol>

    <div class="container-fluid">
        <div class="animated fadeIn">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <span><i class="fa fa-align-justify"></i> Admin List</span>
                            <a class="btn btn-sm btn-primary" href="{{ route('admin.create') }}">
                                <i class="fa fa-plus"></i> Add New Admin
                            </a>
                        </div>

                        <div class="card-body">
                            @if($admins->count())
                                <div class="table-responsive">
                                    <table class="table table-bordered table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Role</th>
                                                <th>Permissions</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @foreach($admins as $index => $admin)
                                                <tr>
                                                    <td>{{ $index + 1 }}</td>
                                                    <td>{{ $admin->name }}</td>
                                                    <td>{{ $admin->email }}</td>
                                                    <td>{{ $admin->phone }}</td>
                                                    <td>{{ $admin->role->name }}</td> <!-- Assuming you have a relationship for roles -->
                                                    <td>{{ $admin->admin_permission ? 'Yes' : 'No' }}</td> <!-- Assuming 'admin_permission' is a boolean field -->
                                                    <td>
                                                        <a href="{{ route('admin.edit', $admin->id) }}" class="btn btn-sm btn-warning">Edit</a>
                                                        <form action="{{ route('admin.destroy', $admin->id) }}" method="POST" style="display:inline-block;" onsubmit="return confirm('Are you sure?');">
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
                                    {{ $admins->links() }}
                                </div>
                            @else
                                <p class="text-center">No admins found.</p>
                            @endif
                        </div> <!-- /.card-body -->
                    </div> <!-- /.card -->
                </div> <!-- /.col-lg-12 -->
            </div> <!-- /.row -->
        </div> <!-- /.animated -->
    </div> <!-- /.container-fluid -->
@endsection
