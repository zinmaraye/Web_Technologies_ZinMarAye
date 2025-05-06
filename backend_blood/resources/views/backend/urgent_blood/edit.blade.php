@extends('backend.layouts.app')

@section('content')
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{ route('blood.index') }}">Urgent Blood List</a></li>
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
                            <form action="{{ route('blood.update', $bloodRequest->id) }}" method="POST">
                                @csrf
                                @method('PUT')

                                <div class="form-group">
                                    <label for="blood_group">Blood Group</label>
                                    <select name="blood_group" id="blood_group" class="form-control" required>
                                        <option value="">Select Blood Group</option>
                                        <option value="A+" {{ $bloodRequest->blood_group == 'A+' ? 'selected' : '' }}>A+</option>
                                        <option value="A-" {{ $bloodRequest->blood_group == 'A-' ? 'selected' : '' }}>A-</option>
                                        <option value="B+" {{ $bloodRequest->blood_group == 'B+' ? 'selected' : '' }}>B+</option>
                                        <option value="B-" {{ $bloodRequest->blood_group == 'B-' ? 'selected' : '' }}>B-</option>
                                        <option value="O+" {{ $bloodRequest->blood_group == 'O+' ? 'selected' : '' }}>O+</option>
                                        <option value="O-" {{ $bloodRequest->blood_group == 'O-' ? 'selected' : '' }}>O-</option>
                                        <option value="AB+" {{ $bloodRequest->blood_group == 'AB+' ? 'selected' : '' }}>AB+</option>
                                        <option value="AB-" {{ $bloodRequest->blood_group == 'AB-' ? 'selected' : '' }}>AB-</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="address">Address</label>
                                    <textarea name="address" id="address" class="form-control" rows="3" required>{{ old('address', $bloodRequest->address) }}</textarea>
                                </div>

                                <div class="form-group">
                                    <label for="phone">Phone</label>
                                    <input type="text" name="phone" id="phone" class="form-control" value="{{ old('phone', $bloodRequest->phone) }}" required>
                                </div>

                                <div class="form-group">
                                    <label for="status">Status</label>
                                    <select name="status" id="status" class="form-control" required>
                                        <option value="">Select Status</option>
                                        <option value="Pending" {{ $bloodRequest->status == 'Pending' ? 'selected' : '' }}>Pending</option>
                                        <option value="Fulfilled" {{ $bloodRequest->status == 'Fulfilled' ? 'selected' : '' }}>Fulfilled</option>
                                        <option value="Cancelled" {{ $bloodRequest->status == 'Cancelled' ? 'selected' : '' }}>Cancelled</option>
                                    </select>
                                </div>

                                <div class="form-group text-right">
                                    <button type="submit" class="btn btn-sm btn-primary">
                                        <i class="fa fa-save"></i> Update
                                    </button>
                                    <a href="{{ route('blood.index') }}" class="btn btn-sm btn-secondary">
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
