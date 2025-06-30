<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Http\RedirectResponse;
use App\Http\Requests\CategoryStoreRequest;
use Illuminate\Support\Facades\Redirect;

class CategoriesController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Categories/Index', [
            'categories' => Category::all(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Categories/Create');
    }

    public function store(CategoryStoreRequest $request): RedirectResponse
    {
        Category::create([
            'name' => $request->name,
        ]);

        return Redirect::route('categories.index');
    }
}
