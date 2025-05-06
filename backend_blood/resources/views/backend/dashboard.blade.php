@extends('backend.layouts.app')

@section('content')
    <!-- Breadcrumb -->
    <ol class="breadcrumb">
        <li class="breadcrumb-item">Dashboard</li>
    </ol>

    <div class="container-fluid">
        <div class="animated fadeIn">
            <div class="row">
                <!-- Active Donors -->
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body text-center">
                            <div class="icon mb-3" style="font-size: 40px; color: #f44336;">
                                <i class="fa fa-users"></i>
                            </div>
                            <h3 class="card-title">{{ number_format($activeDonors) }}+</h3>
                            <p class="card-text">Active Donors</p>
                        </div>
                    </div>
                </div>

                <!-- Lives Saved -->
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body text-center">
                            <div class="icon mb-3" style="font-size: 40px; color: #f44336;">
                                <i class="fa fa-tint"></i>
                            </div>
                            <h3 class="card-title">{{ number_format($livesSaved) }}+</h3>
                            <p class="card-text">Lives Saved</p>
                        </div>
                    </div>
                </div>

                <!-- Monthly Donations -->
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body text-center">
                            <div class="icon mb-3" style="font-size: 40px; color: #f44336;">
                                <i class="fa fa-calendar-alt"></i>
                            </div>
                            <h3 class="card-title">{{ number_format($monthlyDonations) }}+</h3>
                            <p class="card-text">Monthly Donations</p>
                        </div>
                    </div>
                </div>
            </div> <!-- /.row -->
        </div> <!-- /.animated -->
    </div> <!-- /.container-fluid -->
@endsection
