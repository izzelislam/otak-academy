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
        Schema::table('asset_codes', function (Blueprint $table) {
            $table->timestamp('last_download_at')->nullable()->after('download_count');
            $table->unsignedInteger('hourly_download_count')->default(0)->after('last_download_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('asset_codes', function (Blueprint $table) {
            $table->dropColumn(['last_download_at', 'hourly_download_count']);
        });
    }
};
