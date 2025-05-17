@extends('backend.layouts.app')

@section('content')
    <ol class="breadcrumb">
        <li class="breadcrumb-item">
            <a href="{{ route('user.list') }}">Users</a>
        </li>
        <li class="breadcrumb-item active">Edit</li>
    </ol>

    <div class="container-fluid">
        <div class="animated fadeIn">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header">
                            <i class="fa fa-edit fa-lg"></i>
                            <strong>Edit User</strong>
                        </div>

                        <div class="card-body">
                            <form action="{{ route('user.update', $user->id) }}" method="POST" enctype="multipart/form-data">
                                @csrf
                                <input type="hidden" name="user_id" value="{{ $user->id }}">
                                <div class="form-row">
                                    <!-- Name -->
                                    <div class="form-group col-md-6">
                                        <label for="name">Name</label>
                                        <input type="text" name="name" value="{{ old('name', $user->name) }}" class="form-control" id="name" required>
                                    </div>

                                    <!-- Email -->
                                    <div class="form-group col-md-6">
                                        <label for="email">Email</label>
                                        <input type="email" name="email" value="{{ old('email', $user->email) }}" class="form-control" id="email" required>
                                    </div>

                                    <!-- Phone -->
                                    <div class="form-group col-md-6">
                                        <label for="phone">Phone</label>
                                        <input type="text" name="phone" value="{{ old('phone', $user->phone) }}" class="form-control" id="phone">
                                    </div>

                                    <!-- Password -->
                                    <div class="form-group col-md-6">
                                        <label for="password">Password</label>
                                        <input type="password" name="password" class="form-control" id="password" placeholder="Leave blank to keep current password">
                                        <small class="form-text text-muted">Leave blank to retain current password.</small>
                                    </div>

                                    <!-- Blood Group -->
                                    <div class="form-group col-md-6">
                                        <label for="blood_group">Blood Group</label>
                                        <select name="blood_group" class="form-control" id="blood_group">
                                            <option value="">Select Blood Group</option>
                                            @foreach(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] as $group)
                                                <option value="{{ $group }}" {{ $user->blood_group === $group ? 'selected' : '' }}>{{ $group }}</option>
                                            @endforeach
                                        </select>
                                    </div>

                                    <!-- Status -->
                                    <div class="form-group col-md-6">
                                        <label for="status">Status</label>
                                        <select name="status" class="form-control" id="status">
                                            <option value="1" {{ $user->status == 1 ? 'selected' : '' }}>Active</option>
                                            <option value="0" {{ $user->status == 0 ? 'selected' : '' }}>Inactive</option>
                                        </select>
                                    </div>

                                    <!-- Age -->
                                    <div class="form-group col-md-6">
                                        <label for="age">Age</label>
                                        <input type="number" name="age" value="{{ old('age', $user->age) }}" class="form-control" id="age">
                                    </div>

                                    <!-- Weight -->
                                    <div class="form-group col-md-6">
                                        <label for="weight">Weight (kg)</label>
                                        <input type="number" name="weight" value="{{ old('weight', $user->weight) }}" class="form-control" id="weight">
                                    </div>

                                    <!-- Address -->
                                    <div class="form-group col-md-12">
                                        <label for="address">Address</label>
                                        <textarea name="address" class="form-control" id="address" rows="3">{{ old('address', $user->address) }}</textarea>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <button type="submit" class="btn btn-primary">
                                        <i class="fa fa-save"></i> Update User
                                    </button>
                                    <a href="{{ route('user.list') }}" class="btn btn-secondary">
                                        <i class="fa fa-times"></i> Cancel
                                    </a>
                                </div>
                            </form>
                        </div> <!-- /.card-body -->
                    </div> <!-- /.card -->
                </div> <!-- /.col-lg-12 -->
            </div> <!-- /.row -->
        </div> <!-- /.animated -->
    </div> <!-- /.container-fluid -->
@endsection
