<?php

use App\Enum\Product\ProductCategoryEnum;
use App\Enum\Product\ProductStateEnum;
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
        Schema::create('products', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('name', 255);
            $table->string("description", 140);
            $table->enum('category', array_column(ProductCategoryEnum::cases(), 'name'));
            $table->enum('state', array_column(ProductStateEnum::cases(), 'name'));
            $table->string('vendor_name', 170);
            $table->string('price', 8);
            $table->date('release_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
