<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\DonationGalleryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UrgentBloodController;
use App\Http\Controllers\UserDonationController;
use App\Http\Controllers\UserAppointmentController;
use App\Http\Controllers\Auth\AdminLoginController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::group(['prefix' => 'admin', 'middleware' => 'auth-admin'], function () {
    Route::get('/dashboard', [HomeController::class, 'dashboard'])->name('dashboard.index');
    //events
    Route::get('/events/index', [EventController::class, 'index'])->name('events.index');
    Route::get('/events/create', [EventController::class, 'create'])->name('events.create');
    Route::post('/events/store', [EventController::class, 'store'])->name('events.store');
    Route::get('/events/edit/{id}', [EventController::class, 'edit'])->name('events.edit');
    Route::post('/events/update/{id}', [EventController::class, 'update'])->name('events.update');
    Route::get('/events/delete/{id}', [EventController::class, 'destroy'])->name('events.destroy');
    //events
    //urgent_blood
    Route::get('/urgent_blood/list', [UrgentBloodController::class, 'list'])->name('urgent_blood.list');
    Route::get('/urgent_blood/create', [UrgentBloodController::class, 'create'])->name('urgent_blood.create');
    Route::post('/urgent_blood/store', [UrgentBloodController::class, 'store'])->name('urgent_blood.store');
    Route::get('/urgent_blood/edit/{id}', [UrgentBloodController::class, 'edit'])->name('urgent_blood.edit');
    Route::post('/urgent_blood/update/{id}', [UrgentBloodController::class, 'update'])->name('urgent_blood.update');
    Route::delete('/urgent_blood/delete/{id}', [UrgentBloodController::class, 'destroy'])->name('urgent_blood.destroy');

    //urgent_blood
    //user_donation
    Route::get('/user_donation/list', [UserDonationController::class, 'list'])->name('user_donation.list');
    //user_donation
    //user_appointment
    Route::get('/user_appointment/list', [UserAppointmentController::class, 'list'])->name('user_appointment.list');
    Route::get('/user_appointment/create', [UserAppointmentController::class, 'create'])->name('user_appointment.create');
    Route::post('/user_appointment/store', [UserAppointmentController::class, 'store'])->name('user_appointment.store');
    Route::get('/user_appointment/edit/{id}', [UserAppointmentController::class, 'edit'])->name('user_appointment.edit');
    Route::post('/user_appointment/update/{id}', [UserAppointmentController::class, 'update'])->name('user_appointment.update');
    Route::delete('/user_appointment/delete/{id}', [UserAppointmentController::class, 'destroy'])->name('user_appointment.destroy');
    //user_appointment
    //donation_gallery
    Route::get('/donation_gallery/index', [DonationGalleryController::class, 'index'])->name('donation_gallery.index');
    Route::get('/donation_gallery/create', [DonationGalleryController::class, 'create'])->name('donation_gallery.create');
    Route::post('/donation_gallery/store', [DonationGalleryController::class, 'store'])->name('donation_gallery.store');
    Route::get('/donation_gallery/edit/{id}', [DonationGalleryController::class, 'edit'])->name('donation_gallery.edit');
    Route::post('/donation_gallery/update/{id}', [DonationGalleryController::class, 'update'])->name('donation_gallery.update');
    Route::get('/donation_gallery/delete/{id}', [DonationGalleryController::class, 'destroy'])->name('donation_gallery.destroy');
    //donation_gallery
    //admin
    Route::get('admin/index', [AdminController::class, 'index'])->name('admins.index');
    Route::get('admin/create', [AdminController::class, 'create'])->name('admins.create');
    Route::post('admin/store', [AdminController::class, 'store'])->name('admins.store');
    Route::get('admin/edit/{id}', [AdminController::class, 'edit'])->name('admins.edit');
    Route::post('admin/update/{id}', [AdminController::class, 'update'])->name('admins.update');
    //admin
});

Route::get('/', function () {
    return view('auth.login');
})->name('login');
Route::get('admin/login', [AdminLoginController::class, 'showAdminLoginForm'])->name('admin-login');
Route::post('/admin/login/post', [AdminLoginController::class, 'adminLogin'])->name('adminLogin');
Route::get('/logout', [AdminLoginController::class, 'logout'])->name('admin.logout');

