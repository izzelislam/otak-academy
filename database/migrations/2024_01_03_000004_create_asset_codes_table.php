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
        Schema::create('asset_codes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('asset_id')->constrained('downloadable_assets')->cascadeOnDelete();
            $table->string('code_hash');
            $table->string('code_prefix', 10)->index();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->boolean('is_used')->default(false);
            $table->timestamp('used_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->unsignedInteger('download_count')->default(0);
            $table->unsignedInteger('max_downloads')->default(3);
            $table->timestamps();

            $table->index(['asset_id', 'is_used']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asset_codes');
    }
};
