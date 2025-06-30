<?php

namespace App\Models;

use App\Models\Category;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Product extends Model
{
    protected $fillable = [
        'name',
        'image',
        'price',
    ];
    
    public function categories() {
        return $this->belongsToMany(Category::class, 'product_category', 'product_id', 'category_id');
    }

    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => url('product-images/'.$value),
        );
    }
}
