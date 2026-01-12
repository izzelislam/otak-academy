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
        Schema::create('materials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('session_id')->constrained('course_sessions')->cascadeOnDelete();
            $table->string('title');
            $table->enum('type', ['video', 'text', 'pdf', 'ebook', 'gmeet']);
            $table->longText('content')->nullable();
            $table->integer('order_priority')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('materials');
    }
};
