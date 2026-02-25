<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('order_id')->unique(); // Midtrans order_id
            $table->string('snap_token')->nullable();

            // Polymorphic relation to payable item (Course or DownloadableAsset)
            $table->string('payable_type'); // App\Models\Course or App\Models\DownloadableAsset
            $table->unsignedBigInteger('payable_id');

            $table->unsignedInteger('amount'); // Amount in IDR
            $table->enum('status', ['pending', 'paid', 'failed', 'expired', 'refunded'])->default('pending');
            $table->string('payment_type')->nullable(); // e.g. bank_transfer, gopay, credit_card
            $table->string('transaction_id')->nullable(); // Midtrans transaction_id
            $table->json('midtrans_response')->nullable(); // Full response from Midtrans

            $table->timestamp('paid_at')->nullable();
            $table->timestamp('expired_at')->nullable();
            $table->timestamps();

            $table->index(['payable_type', 'payable_id']);
            $table->index('status');
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
