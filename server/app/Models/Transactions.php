<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Transactions extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',	
        'doctor_id',
        'payment_type_id',	
        'status',
        'bank_account_name',
        'bank_account_number',
        'discount_total',
        'additional_costs',	
        'delivery_costs',
        'grandtotal',
        'paid_amount',
        'change_amount',
        'user_id'
    ];

    protected $table = 'transactions';

    protected $primaryKey = 'transaction_id';

    public function details() : HasMany
    {
        return $this->hasMany(TransactionDetails::class, 'transaction_id', 'transaction_id');
    }
}
