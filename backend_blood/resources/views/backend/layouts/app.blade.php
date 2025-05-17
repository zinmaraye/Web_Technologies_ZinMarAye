<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="google-site-verification" content="4CSDdnT7Hs71BsySiS9ECUFr6p_IpIlq6crjmQlLWuE" />
    <title>{{ config('app.name') }} | Dashboard</title>
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>

    <meta property="og:image" content="/images/favicon/favicon-32x32.png" alt="GPIS Global Pathways Academy Myanmar" />

    <link rel="apple-touch-icon" sizes="180x180" href="/images/life_share_logo.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/images/life_share_logo.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/images/life_share_logo.png">
    <link rel="manifest" href="/images/favicon/site.webmanifest">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">

    <!-- CDN Styles -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@coreui/coreui@2.1.16/dist/css/coreui.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/css/simple-line-icons.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.3.0/css/flag-icon.min.css">
    <link href="https://cdn.jsdelivr.net/npm/@coreui/icons/css/coreui-icons.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
    <!-- Add the Flatpickr CDN link for CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">

<!-- Add the Flatpickr CDN link for JS -->
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    <style>
        .sidebar .nav-link.active {
            color: #fff;
            background: #a51d1d;
        }

        .sidebar .nav-link:hover {
            background: #d15454;
        }

        .sidebar .nav-link.active .nav-icon {
            color: #fff !important;
        }

        a {
            color: #d15454;
        }

        body {
            background-color: rgb(204, 204, 204);
        }

        .badge-primary {
            background-color: #d15454 !important;
        }
        .create_btn{
            background-color: #fc1313 !important;
            color: white !important;
        }
    </style>
    @yield('css')
</head>

<body class="app header-fixed sidebar-fixed aside-menu-fixed sidebar-lg-show">
    <header class="app-header navbar">
        {{-- <button class="navbar-toggler sidebar-toggler d-lg-none mr-auto" type="button" data-toggle="sidebar-show">
            <span class="navbar-toggler-icon"></span>
        </button>
        <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" data-toggle="sidebar-lg-show">
            <span class="navbar-toggler-icon"></span>
        </button> --}}
        <a class="navbar-brand" href="#">
            <img class="navbar-brand-full" src="{{ asset('images/logo.png') }}" style="width: 100%;" alt="gpis">
        </a>

        <ul class="nav navbar-nav ml-auto">
            <li class="nav-item dropdown">
                <a class="nav-link" style="margin-right: 10px" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                   {{-- {{ Auth::user()->name }} --}}
                    <img src="{{ asset('images/profile.png') }}" alt="" class="img-fluid rounded-circle" style="width: 30px; height: 30px;">
                </a>
                <div class="dropdown-menu dropdown-menu-right">
                    <a href="{{ url('/admin/logout') }}" class="dropdown-item btn btn-default btn-flat"
                        onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                        <i class="fa fa-lock"></i> Logout
                    </a>
                    <form id="logout-form" action="{{ route('admin.logout') }}" method="POST" style="display: none;">
                        @csrf
                    </form>
                </div>
            </li>
        </ul>
    </header>

    <div class="app-body">
        @include('backend.layouts.sidebar')
        <main class="main">
            @yield('content')
        </main>
    </div>

    <footer class="app-footer">
        <div>
            <a href="https://gpis.strategyfirst.edu.mm/">Blood Donation </a>
            <span>&copy; 2025 Blood Donation.</span>
        </div>
        <div class="ml-auto">
            <span>Powered by</span>
            <a href="#">Zin Mar Aye</a>
        </div>
    </footer>

    <!-- CDN Scripts -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@coreui/coreui@2.1.16/dist/js/coreui.min.js"></script>

    @yield('scripts')
    @stack('scripts')
</body>

</html>
