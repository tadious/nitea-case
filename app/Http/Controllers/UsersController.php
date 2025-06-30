<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Http\RedirectResponse;
use App\Http\Requests\UserUpdateRequest;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UserStoreRequest;

class UsersController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Users/Index', [
            'users' => User::orderBy('id', 'DESC')->get(),
        ]);
    }

    public function edit(Request $request): Response
    {
        return Inertia::render('Users/Edit', [
            'user' => User::find($request->user),
        ]);
    }

    public function update(UserUpdateRequest $request): RedirectResponse
    {
        if (!$request->password) {
            unset($request['password']);
        }

        User::find($request->user)->update($request->all());

        return Redirect::route('users.index');
    }

    public function delete(Request $request): RedirectResponse
    {
        User::find($request->user)->delete();

        return Redirect::route('users.index');
    }

    public function create(): Response
    {
        return Inertia::render('Users/Create');
    }

    public function store(UserStoreRequest $request): RedirectResponse
    {
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return Redirect::route('users.index');
    }
}
