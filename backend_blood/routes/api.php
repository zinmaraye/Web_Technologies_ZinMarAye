<?php

use Illuminate\Http\Request;
use App\Http\Controllers\API\APIController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/event/list', [APIController::class, 'eventList']);
Route::get('/donation/gallery/list', [APIController::class, 'donationGallery']);
Route::get('/urgent/blood/list', [APIController::class, 'urgentBloodList']);
Route::post('/user/appointments', [APIController::class, 'appointment_store']);
Route::post('register', [APIController::class, 'register']);
Route::post('login', [APIController::class, 'login']);
Route::get('/user/{userId}/donations', [APIController::class, 'getUserDonations']);

// Route::get('event/list', 'APIController@eventList');
