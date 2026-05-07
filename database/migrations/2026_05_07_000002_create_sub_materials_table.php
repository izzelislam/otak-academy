<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sub_materials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('material_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->enum('type', ['video', 'text', 'pdf', 'ebook', 'gmeet', 'document'])->default('text');
            $table->longText('content')->nullable();
            $table->integer('order_priority')->default(0);
            $table->timestamps();
        });

        Schema::table('user_progress', function (Blueprint $table) {
            $table->foreignId('sub_material_id')->nullable()->after('material_id')->constrained('sub_materials')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('user_progress', function (Blueprint $table) {
            $table->dropForeign(['sub_material_id']);
            $table->dropColumn('sub_material_id');
        });

        Schema::dropIfExists('sub_materials');
    }
};
