@extends('backend.layouts.app')

@section('content')
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{ route('donation_gallery.index') }}">Donation Gallery</a></li>
        <li class="breadcrumb-item active">Edit Gallery Item</li>
    </ol>

    <div class="container-fluid">
        <div class="animated fadeIn">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header">
                            <span><i class="fa fa-edit"></i> Edit Gallery Item</span>
                        </div>

                        <div class="card-body">
                            <form action="{{ route('donation_gallery.update', $galleryItem->id) }}" method="POST" enctype="multipart/form-data">
                                @csrf
                                @method('PUT')

                                <div class="form-group">
                                    <label for="title">Title</label>
                                    <input type="text" name="title" id="title" class="form-control" value="{{ old('title', $galleryItem->title) }}" required>
                                </div>

                                <div class="form-group">
                                    <label for="image">Full Image</label>
                                    <input type="file" name="image" id="image" class="form-control-file" accept="image/*">
                                    @if($galleryItem->image)
                                        <div class="mt-2">
                                            <img src="{{ asset('storage/' . $galleryItem->image) }}" alt="Full Image" width="80">
                                        </div>
                                    @else
                                        <p class="text-muted">No image uploaded</p>
                                    @endif
                                </div>

                                <div class="form-group">
                                    <label for="rank">Rank</label>
                                    <input type="number" name="rank" id="rank" class="form-control" value="{{ old('rank', $galleryItem->rank) }}" required>
                                </div>

                                <div class="form-group text-right">
                                    <button type="submit" class="btn btn-sm btn-primary">
                                        <i class="fa fa-save"></i> Update
                                    </button>
                                    <a href="{{ route('donation_gallery.index') }}" class="btn btn-sm btn-secondary">
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
