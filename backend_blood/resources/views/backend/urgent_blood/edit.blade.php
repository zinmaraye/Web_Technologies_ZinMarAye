@extends('backend.layouts.app')

@section('content')
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{ route('urgent_blood.list') }}">Urgent Blood List</a></li>
        <li class="breadcrumb-item active">Edit Urgent Blood Request</li>
    </ol>

    <div class="container-fluid">
        <div class="animated fadeIn">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header">
                            <span><i class="fa fa-edit"></i> Edit Urgent Blood Request</span>
                        </div>

                        <div class="card-body">
                            <form action="{{ route('urgent_blood.update', $urgent_blood->id) }}" method="POST" enctype="multipart/form-data">
                                @csrf
                                <div class="form-group">
                                    <label for="blood_group">Blood Group</label>
                                    <select name="blood_group" id="blood_group" class="form-control" required>
                                        <option value="">Select Blood Group</option>
                                        <option value="A+" {{ $urgent_blood->blood_group == 'A+' ? 'selected' : '' }}>A+</option>
                                        <option value="A-" {{ $urgent_blood->blood_group == 'A-' ? 'selected' : '' }}>A-</option>
                                        <option value="B+" {{ $urgent_blood->blood_group == 'B+' ? 'selected' : '' }}>B+</option>
                                        <option value="B-" {{ $urgent_blood->blood_group == 'B-' ? 'selected' : '' }}>B-</option>
                                        <option value="O+" {{ $urgent_blood->blood_group == 'O+' ? 'selected' : '' }}>O+</option>
                                        <option value="O-" {{ $urgent_blood->blood_group == 'O-' ? 'selected' : '' }}>O-</option>
                                        <option value="AB+" {{ $urgent_blood->blood_group == 'AB+' ? 'selected' : '' }}>AB+</option>
                                        <option value="AB-" {{ $urgent_blood->blood_group == 'AB-' ? 'selected' : '' }}>AB-</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="location">Location</label>
                                    <input type="text" name="location" id="location" class="form-control" value="{{ $urgent_blood->location }}" required>
                                </div>

                                <div class="form-group">
                                    <label for="address">Address</label>
                                    <textarea name="address" id="address" class="form-control" rows="3" required>{{ $urgent_blood->address }}</textarea>
                                </div>

                                <div class="form-group">
                                    <label for="contact">Contact</label>
                                    <input type="text" name="contact" id="contact" class="form-control" value="{{ $urgent_blood->contact }}" required>
                                </div>

                                <div class="form-group">
                                    <label for="urgency">Urgency</label>
                                    <select name="urgency" id="urgency" class="form-control" required>
                                        <option value="High" {{ $urgent_blood->urgency == 'High' ? 'selected' : '' }}>High</option>
                                        <option value="Medium" {{ $urgent_blood->urgency == 'Medium' ? 'selected' : '' }}>Medium</option>
                                        <option value="Critical" {{ $urgent_blood->urgency == 'Critical' ? 'selected' : '' }}>Critical</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="active">Active</label>
                                    <select name="active" id="active" class="form-control" required>
                                        <option value="1" {{ $urgent_blood->active == 1 ? 'selected' : '' }}>Active</option>
                                        <option value="0" {{ $urgent_blood->active == 0 ? 'selected' : '' }}>Inactive</option>
                                    </select>
                                </div>
                                <div class="form-group text-right">
                                    <button type="submit" class="btn btn-sm btn-primary">
                                        <i class="fa fa-save"></i> Save Changes
                                    </button>
                                    <a href="{{ route('urgent_blood.list') }}" class="btn btn-sm btn-secondary">
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
