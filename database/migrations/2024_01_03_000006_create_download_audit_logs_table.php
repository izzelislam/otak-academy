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
        Schema::create('download_audit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('asset_id')->nullable()->constrained('downloadable_assets')->nullOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('ip_address', 45)->index();
            $table->text('user_agent')->nullable();
            $table->string('action');
            $table->string('result');
            $table->json('details')->nullable();
            $table->boolean('is_suspicious')->default(false);
            $table->timestamps();

            $table->index('created_at');
            $table->index(['ip_address', 'created_at']);
            $table->index('is_suspicious');
            $table->index('action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('download_audit_logs');
    }
};
