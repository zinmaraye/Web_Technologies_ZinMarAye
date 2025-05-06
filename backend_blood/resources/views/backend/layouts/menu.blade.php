<li class="nav-item {{ Request::is('dashboard*') ? 'active' : '' }}">
    <a class="nav-link" href="{{ route('dashboard.index') }}">
        <i class="nav-icon bi bi-house-door"></i>
        <span>Dashboard</span>
    </a>
</li>
<li class="nav-item {{ Request::is('urgent_bloods*') ? 'active' : '' }}">
    <a class="nav-link" href="{{ route('urgent_blood.list') }}">
        <i class="nav-icon bi bi-shield-lock"></i>
        <span>Urgent Blood</span>
    </a>
</li>
<li class="nav-item {{ Request::is('user_donations*') ? 'active' : '' }}">
    <a class="nav-link" href="{{ route('user_donation.list') }}">
        <i class="nav-icon bi bi-shield-lock"></i>
        <span>User Donation</span>
    </a>
</li>
<li class="nav-item {{ Request::is('donation_galleries*') ? 'active' : '' }}">
    <a class="nav-link" href="{{ route('donation_gallery.index') }}">
        <i class="nav-icon bi bi-shield-lock"></i>
        <span>Donation Gallery</span>
    </a>
</li>

<li class="nav-item {{ Request::is('events*') ? 'active' : '' }}">
    <a class="nav-link" href="{{ route('events.index') }}">
        <i class="nav-icon bi bi-calendar"></i>
        <span>Events</span>
    </a>
</li>

{{-- Role-based Admin Section --}}
{{-- @if (Auth::user() && Auth::user()->hasRole('root-admin')) --}}
<li class="nav-item {{ Request::is('admins*') ? 'active' : '' }}">
    <a class="nav-link" href="{{ route('admins.index') }}">
        <i class="nav-icon bi bi-person"></i>
        <span>Admin</span>
    </a>
</li>
{{-- @endif --}}
