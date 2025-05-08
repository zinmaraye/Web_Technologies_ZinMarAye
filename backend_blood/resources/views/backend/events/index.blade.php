@extends('backend.layouts.app')

@section('content')
    <ol class="breadcrumb">
        <li class="breadcrumb-item">Events</li>
    </ol>

    <div class="container-fluid">
        <div class="animated fadeIn">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <span><i class="fa fa-align-justify"></i> Event List</span>
                            <a class="btn btn-sm btn-primary" href="{{ route('events.create') }}">
                                <i class="fa fa-plus"></i> Add New Event
                            </a>
                        </div>

                        <div class="card-body">
                            @if($events->count())
                                <div class="table-responsive">
                                    <table class="table table-bordered table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Title</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Address</th>
                                                <th>Image</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @foreach($events as $index => $event)
                                                <tr>
                                                    <td>{{ $index + 1 }}</td>
                                                    <td>{{ $event->title }}</td>
                                                    <td>{{ $event->event_date }}</td>
                                                    <td>{{ $event->event_time }}</td>
                                                    <td>{{ $event->address }}</td>
                                                    <td>
                                                        @if($event->image)
                                                        <img src="{{ asset('images/event/' . $event->image) }}" alt="Event Image" width="80">
                                                        @else
                                                            <span class="text-muted">No image</span>
                                                        @endif
                                                    </td>
                                                    <td>
                                                        <a href="{{ route('events.edit', $event->id) }}" class="btn btn-sm btn-warning">Edit</a>
                                                        <form action="{{ route('events.destroy', $event->id) }}" method="POST" style="display:inline-block;" onsubmit="return confirm('Are you sure?');">
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
                                    {{-- {{ $events->links() }} --}}
                                </div>
                            @else
                                <p class="text-center">No events found.</p>
                            @endif
                        </div> <!-- /.card-body -->
                    </div> <!-- /.card -->
                </div> <!-- /.col-lg-12 -->
            </div> <!-- /.row -->
        </div> <!-- /.animated -->
    </div> <!-- /.container-fluid -->
@endsection
