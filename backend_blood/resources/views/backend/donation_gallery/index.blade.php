@extends('backend.layouts.app')

@section('content')
    <ol class="breadcrumb">
        <li class="breadcrumb-item">Donation Gallery</li>
    </ol>

    <div class="container-fluid">
        <div class="animated fadeIn">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <span><i class="fa fa-align-justify"></i> Donation Gallery List</span>
                            <a class="btn btn-sm btn-primary" href="{{ route('donation_gallery.create') }}">
                                <i class="fa fa-plus"></i> Add New Gallery Item
                            </a>
                        </div>

                        <div class="card-body">
                            @if($galleryItems->count())
                                <div class="table-responsive">
                                    <table class="table table-bordered table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>Thumbnail</th>
                                                <th>Image</th>
                                                <th>Rank</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @foreach($galleryItems as $index => $item)
                                                <tr>
                                                    <td>{{ $index + 1 }}</td>
                                                    <td>{{ $item->title }}</td>
                                                    <td>{{ $item->description }}</td>
                                                    <td>
                                                        @if($item->thumbnail)
                                                            <img src="{{ asset('storage/' . $item->thumbnail) }}" alt="Thumbnail" width="80">
                                                        @else
                                                            <span class="text-muted">No thumbnail</span>
                                                        @endif
                                                    </td>
                                                    <td>
                                                        @if($item->image)
                                                            {{-- Decode the JSON array of image paths --}}
                                                            @php
                                                                $images = json_decode($item->image, true);
                                                            @endphp

                                                            {{-- Loop through each image path and display the images --}}
                                                            @foreach($images as $image)
                                                                <img src="{{ asset('storage/' . $image) }}" alt="Image" width="80" class="mb-2">
                                                            @endforeach
                                                        @else
                                                            <span class="text-muted">No image</span>
                                                        @endif
                                                    </td>
                                                    <td>{{ $item->rank }}</td>
                                                    <td>
                                                        <a href="{{ route('donation_gallery.edit', $item->id) }}" class="btn btn-sm btn-warning">Edit</a>
                                                        <form action="{{ route('donation_gallery.destroy', $item->id) }}" method="POST" style="display:inline-block;" onsubmit="return confirm('Are you sure?');">
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
                                    {{-- {{ $galleryItems->links() }} --}}
                                </div>
                            @else
                                <p class="text-center">No gallery items found.</p>
                            @endif
                        </div> <!-- /.card-body -->
                    </div> <!-- /.card -->
                </div> <!-- /.col-lg-12 -->
            </div> <!-- /.row -->
        </div> <!-- /.animated -->
    </div> <!-- /.container-fluid -->
@endsection
