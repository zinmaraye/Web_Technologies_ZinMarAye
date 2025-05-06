@extends('backend.layouts.app')

@section('content')
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{ route('donation_gallery.index') }}">Donation Gallery</a></li>
        <li class="breadcrumb-item active">Create New Gallery Item</li>
    </ol>

    <div class="container-fluid">
        <div class="animated fadeIn">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header">
                            <span><i class="fa fa-plus"></i> Create New Gallery Item</span>
                        </div>

                        <div class="card-body">
                            <form action="{{ route('donation_gallery.store') }}" method="POST" enctype="multipart/form-data">
                                @csrf

                                <div class="form-group">
                                    <label for="title">Title</label>
                                    <input type="text" name="title" id="title" class="form-control" value="{{ old('title') }}" required>
                                </div>

                                <div class="form-group">
                                    <label for="description">Description</label>
                                    <textarea name="description" id="description" class="form-control" rows="3" required>{{ old('description') }}</textarea>
                                </div>

                                <div class="form-group">
                                    <label for="thumbnail">Thumbnail Image</label>
                                    <input type="file" name="thumbnail" id="thumbnail" class="form-control-file" accept="image/*">
                                </div>

                                <div class="form-group">
                                    <label for="image">Image Gallery</label>
                                    <input type="file" name="images[]" id="image" class="form-control-file" accept="image/*" multiple required>
                                </div>

                                <div class="form-group">
                                    <label for="rank">Rank</label>
                                    <input type="number" name="rank" id="rank" class="form-control" value="{{ old('rank') }}" required>
                                </div>

                                <div class="form-group text-right">
                                    <button type="submit" class="btn btn-sm btn-primary">
                                        <i class="fa fa-save"></i> Save
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
