<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TransactionDetails extends Model
{
    use HasFactory;

    protected $table = 'transaction_details';

    protected $primaryKey = 'transaction_detail_id';

    protected $fillable = [
        'transaction_id',	
        'product_id',	
        'product_name',
        'unit_id',	
        'quantity',	
        'discount',	
        'subtotal',
    ];

    public function transaction() : BelongsTo
    {
        return $this->belongsTo(Transactions::class, 'transaction_id', 'transaction_id');
    }
}
