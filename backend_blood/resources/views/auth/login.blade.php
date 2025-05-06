<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blood Donation Admin Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative">
        <div class="flex flex-col items-center mb-6">
            <img src="https://img.icons8.com/color/96/000000/blood-donation.png" alt="Blood Donation" class="w-16 h-16 mb-2">
            <h2 class="text-2xl font-bold text-red-600">Blood Donation Admin</h2>
            <p class="text-gray-500 mt-1">Sign in to manage donors and requests</p>
        </div>
        <form class="form" method="post" action="{{ route('adminLogin') }}" enctype="multipart/form-data">
            @csrf
            <div class="mb-4">
                <label class="block text-sm text-gray-700 mb-1" for="email">Email</label>
                <input type="email" name="email" id="email" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" required>
            </div>
            <div class="mb-6">
                <label class="block text-sm text-gray-700 mb-1" for="password">Password</label>
                <input type="password" name="password" id="password" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" required>
            </div>
            <button type="submit" class="w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition">Sign In</button>
        </form>
        <p class="text-center text-sm text-gray-400 mt-6">© {{ date('Y') }} BloodCare Admin Panel</p>
    </div>
</body>
</html>
