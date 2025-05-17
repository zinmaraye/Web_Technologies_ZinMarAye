<li class="nav-item {{ Request::is('dashboard*') ? 'active' : '' }}">
    <a class="nav-link" href="{{ route('dashboard.index') }}">
        <i class="nav-icon bi bi-house-door"></i>
        <span>Dashboard</span>
    </a>
</li>
<li class="nav-item {{ Request::is('events*') ? 'active' : '' }}">
    <a class="nav-link" href="{{ route('events.index') }}">
        <i class="nav-icon bi bi-calendar"></i>
        <span>Events</span>
    </a>
</li>
<li class="nav-item {{ Request::is('urgent_bloods*') ? 'active' : '' }}">
    <a class="nav-link" href="{{ route('urgent_blood.list') }}">
        <i class="nav-icon bi bi-shield-lock"></i>
        <span>Urgent Blood Request</span>
    </a>
</li>
<li class="nav-item {{ Request::is('donation_galleries*') ? 'active' : '' }}">
    <a class="nav-link" href="{{ route('donation_gallery.index') }}">
        <i class="nav-icon bi bi-shield-lock"></i>
        <span>Donation Gallery</span>
    </a>
</li>

<li class="nav-item {{ Request::is('users*') ? 'active' : '' }}">
    <a class="nav-link" href="{{ route('user.list') }}">
        <i class="nav-icon bi bi-shield-lock"></i>
        <span>User List</span>
    </a>
</li>
<li class="nav-item {{ Request::is('appointments*') ? 'active' : '' }}">
    <a class="nav-link" href="{{ route('user_appointment.list') }}">
        <i class="nav-icon bi bi-shield-lock"></i>
        <span>User Appointment List</span>
    </a>
</li>

<li class="nav-item {{ Request::is('admins*') ? 'active' : '' }}">
    <a class="nav-link" href="{{ route('admin.index') }}">
        <i class="nav-icon bi bi-person"></i>
        <span>Admin</span>
    </a>
</li>
