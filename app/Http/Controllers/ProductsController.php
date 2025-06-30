<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Http\RedirectResponse;
use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Http\Requests\ProductCategoryUpdateRequest;
use App\Http\Requests\ProductImageUpdateRequest;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;

class ProductsController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Products/Index', [
            'products' => Product::with('categories')->orderBy('id', 'DESC')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Products/Create');
    }

    public function store(ProductStoreRequest $request): RedirectResponse
    {
        $filename = time().'.'.$request->image->extension();  
        $request->image->move(public_path('product-images'), $filename);

        Product::create([
            'name' => $request->name,
            'image' => $filename,
            'price' => $request->price,
        ]);

        return Redirect::route('products.index');
    }

    public function edit(Request $request): Response
    {
        return Inertia::render('Products/Edit', [
            'product' => Product::with('categories')->find($request->product),
            'categories' => Category::all(),
        ]);
    }

    public function update(ProductUpdateRequest $request): RedirectResponse
    {
        if (!$request->image) {
            unset($request['image']);
        }
        Product::find($request->product)->update($request->all());

        return Redirect::route('products.index');
    }

    public function image(ProductImageUpdateRequest $request) {
        // TODO: delete current image
        
        $filename = time().'.'.$request->image->extension();  
        $request->image->move(public_path('product-images'), $filename);

        Product::find($request->product)->update(['image' => $filename]);
        return response()->json(['product' => Product::with('categories')->find($request->product)], 200);
    }

    public function categories(ProductCategoryUpdateRequest $request) {
        $product = Product::with('categories')->find($request->product);
        $product->categories()->sync($request->categoryIds);

        return response()->json(['product' => Product::with('categories')->find($request->product)], 200);
    }

    public function delete(Request $request): RedirectResponse
    {
        Product::find($request->product)->delete();

        return Redirect::route('products.index');
    }
}
