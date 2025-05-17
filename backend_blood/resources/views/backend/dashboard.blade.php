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
                <div class="col-md-3">
                    <div class="card">
                        <div class="card-body text-center">
                            <div class="icon mb-3" style="font-size: 40px; color: #f44336;">
                                <i class="fa fa-users"></i>
                            </div>
                            <h3 class="card-title">{{ number_format($activeDonors) }}</h3>
                            <p class="card-text">Active Donors</p>
                        </div>
                    </div>
                </div>

                <!-- Completed Appointments -->
                <div class="col-md-3">
                    <div class="card">
                        <div class="card-body text-center">
                            <div class="icon mb-3" style="font-size: 40px; color: #4caf50;">
                                <i class="fa fa-calendar-check-o"></i>
                            </div>
                            <h3 class="card-title">{{ number_format($completedAppointments) }}</h3>
                            <p class="card-text">Completed Appointments</p>
                        </div>
                    </div>
                </div>

                <!-- Upcoming Events -->
                <div class="col-md-3">
                    <div class="card">
                        <div class="card-body text-center">
                            <div class="icon mb-3" style="font-size: 40px; color: #2196f3;">
                                <i class="fa fa-calendar"></i>
                            </div>
                            <h3 class="card-title">{{ number_format($upcomingEvents) }}</h3>
                            <p class="card-text">Upcoming Events</p>
                        </div>
                    </div>
                </div>

                <!-- Active Urgent Needs -->
                <div class="col-md-3">
                    <div class="card">
                        <div class="card-body text-center">
                            <div class="icon mb-3" style="font-size: 40px; color: #ff9800;">
                                <i class="fa fa-exclamation-triangle"></i>
                            </div>
                            <h3 class="card-title">{{ number_format($activeUrgentNeeds) }}</h3>
                            <p class="card-text">Active Urgent Needs</p>
                        </div>
                    </div>
                </div>
            </div> <!-- /.row -->
        </div> <!-- /.animated -->
    </div> <!-- /.container-fluid -->
@endsection
