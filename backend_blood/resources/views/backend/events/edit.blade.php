@extends('backend.layouts.app')

@section('content')
    <ol class="breadcrumb">
        <li class="breadcrumb-item">
            <a href="{{ route('events.index') }}">Events</a>
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
                            <strong>Edit Event</strong>
                        </div>

                        <div class="card-body">
                            <form action="{{ route('events.update', $event->id) }}" method="POST" enctype="multipart/form-data">
                                @csrf
                                @method('PUT')

                                <div class="form-row">
                                    <!-- Title -->
                                    <div class="form-group col-md-6">
                                        <label for="title">Title</label>
                                        <input type="text" name="title" class="form-control" id="title" value="{{ old('title', $event->title) }}" required>
                                    </div>

                                    <!-- Date -->
                                    <div class="form-group col-md-3">
                                        <label for="event_date">Event Date</label>
                                        <input type="date" name="event_date" class="form-control" id="event_date" value="{{ old('event_date', $event->event_date) }}" required>
                                    </div>

                                    <!-- Time -->
                                    <div class="form-group col-md-3">
                                        <label for="event_time">Event Time</label>
                                        <input type="time" name="event_time" class="form-control" id="event_time" value="{{ old('event_time', $event->event_time) }}" required>
                                    </div>

                                    <!-- Address -->
                                    <div class="form-group col-md-6">
                                        <label for="address">Address</label>
                                        <input type="text" name="address" class="form-control" id="address" value="{{ old('address', $event->address) }}" required>
                                    </div>

                                    <!-- Image -->
                                    <div class="form-group col-md-6">
                                        <label for="image">Event Image</label>
                                        <input type="file" name="image" class="form-control-file" id="image" accept="image/*">
                                        @if($event->image)
                                            <p class="mt-2">
                                                <img src="{{ asset('storage/' . $event->image) }}" alt="Current Image" width="100">
                                            </p>
                                        @endif
                                    </div>

                                    <!-- Description -->
                                    <div class="form-group col-md-12">
                                        <label for="description">Description</label>
                                        <textarea name="description" class="form-control" id="description" rows="4">{{ old('description', $event->description) }}</textarea>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <button type="submit" class="btn btn-primary">Update Event</button>
                                    <a href="{{ route('events.index') }}" class="btn btn-secondary">Cancel</a>
                                </div>
                            </form>
                        </div> <!-- /.card-body -->
                    </div> <!-- /.card -->
                </div> <!-- /.col-lg-12 -->
            </div> <!-- /.row -->
        </div> <!-- /.animated -->
    </div> <!-- /.container-fluid -->
@endsection
