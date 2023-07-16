<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id('transaction_id');
            $table->integer('customer_id')->nullable();
            $table->integer('doctor_id')->nullable();
            $table->integer('payment_type_id')->nullable();
            $table->enum('status', ['draft', 'paid', 'credit', 'cancelled'])->default('draft');
            $table->string('bank_account_name', 50)->nullable();
            $table->string('bank_account_number', 25)->nullable();
            $table->float('subtotal_products');
            $table->float('discount_total')->default(0);
            $table->float('additional_costs')->default(0);
            $table->float('delivery_costs')->default(0);
            $table->float('grandtotal')->default(0);
            $table->float('amount_paid')->default(0);
            $table->integer('user_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
};
