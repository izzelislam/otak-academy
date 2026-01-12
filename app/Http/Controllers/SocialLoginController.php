<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use Exception;

class SocialLoginController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
            
            // Check if user already exists
            $user = User::where('email', $googleUser->email)->first();

            if ($user) {
                // If user exists, update google_id and avatar if missing
                if (!$user->google_id) {
                    $user->update([
                        'google_id' => $googleUser->id,
                        'avatar' => $googleUser->avatar,
                    ]);
                }
                
                Auth::login($user);
                
                return redirect()->intended(route('dashboard'));
            } else {
                // Create new user
                $newUser = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'google_id' => $googleUser->id,
                    'avatar' => $googleUser->avatar,
                    'password' => encrypt('google_dummy_password'), // Secure dummy password
                    'email_verified_at' => now(), // Assume verified by Google
                ]);

                Auth::login($newUser);

                return redirect()->intended(route('dashboard'));
            }

        } catch (Exception $e) {
            return redirect(route('login'))->with('error', 'Something went wrong with Google Login. Please try again.');
        }
    }
}
