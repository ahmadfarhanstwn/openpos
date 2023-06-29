<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductUnit extends Model
{
    use HasFactory;

    protected $fillable = ['unit_name'];

    protected $primaryKey = 'unit_id';

    public $timestamps = false;

    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'unit_id', 'unit_id');
    }
}
