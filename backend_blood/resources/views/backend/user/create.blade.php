@extends('backend.layouts.app')

@section('content')
    <ol class="breadcrumb">
        <li class="breadcrumb-item">
            <a href="{{ route('user.list') }}">Users</a>
        </li>
        <li class="breadcrumb-item active">Create</li>
    </ol>

    <div class="container-fluid">
        <div class="animated fadeIn">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header">
                            <i class="fa fa-user-plus fa-lg"></i>
                            <strong>Create User</strong>
                        </div>

                        <div class="card-body">
                            <form action="{{ route('user.store') }}" method="POST">
                                @csrf

                                <div class="form-row">
                                    <!-- Name -->
                                    <div class="form-group col-md-6">
                                        <label for="name">Name</label>
                                        <input type="text" name="name" class="form-control" id="name" required placeholder="Enter full name">
                                    </div>

                                    <!-- Email -->
                                    <div class="form-group col-md-6">
                                        <label for="email">Email</label>
                                        <input type="email" name="email" class="form-control" id="email" required placeholder="Enter email address">
                                    </div>

                                    <!-- Phone -->
                                    <div class="form-group col-md-6">
                                        <label for="phone">Phone</label>
                                        <input type="text" name="phone" class="form-control" id="phone" placeholder="Enter phone number">
                                    </div>

                                    <!-- Password -->
                                    <div class="form-group col-md-6">
                                        <label for="password">Password</label>
                                        <input type="password" name="password" class="form-control" id="password" required placeholder="Enter password">
                                    </div>

                                    <!-- Blood Group -->
                                    <div class="form-group col-md-6">
                                        <label for="blood_group">Blood Group</label>
                                        <select name="blood_group" class="form-control" id="blood_group">
                                            <option value="">Select Blood Group</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                        </select>
                                    </div>

                                    <!-- Status -->
                                    <div class="form-group col-md-6">
                                        <label for="status">Status</label>
                                        <select name="status" class="form-control" id="status">
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option>
                                        </select>
                                    </div>

                                    <!-- Age -->
                                    <div class="form-group col-md-6">
                                        <label for="age">Age</label>
                                        <input type="number" name="age" class="form-control" id="age" placeholder="Enter age">
                                    </div>

                                    <!-- Weight -->
                                    <div class="form-group col-md-6">
                                        <label for="weight">Weight (kg)</label>
                                        <input type="number" name="weight" class="form-control" id="weight" placeholder="Enter weight">
                                    </div>

                                    <!-- Address -->
                                    <div class="form-group col-md-12">
                                        <label for="address">Address</label>
                                        <textarea name="address" class="form-control" id="address" rows="3" placeholder="Enter address"></textarea>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <button type="submit" class="btn btn-primary">
                                        <i class="fa fa-save"></i> Save User
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
