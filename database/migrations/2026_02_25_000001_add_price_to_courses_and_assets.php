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
        Schema::table('courses', function (Blueprint $table) {
            $table->enum('access_type', ['free', 'premium'])->default('free')->after('is_featured');
            $table->unsignedInteger('price')->default(0)->after('access_type'); // Price in IDR
        });

        Schema::table('downloadable_assets', function (Blueprint $table) {
            $table->unsignedInteger('price')->default(0)->after('type'); // Price in IDR
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropColumn(['access_type', 'price']);
        });

        Schema::table('downloadable_assets', function (Blueprint $table) {
            $table->dropColumn('price');
        });
    }
};
