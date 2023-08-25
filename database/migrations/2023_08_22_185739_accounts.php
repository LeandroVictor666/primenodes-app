<?php

use App\Enum\AccountTypeEnum;
use App\Enum\EmailStatusEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Nette\Schema\Schema as SchemaSchema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('username', 40)->unique();
            $table->string("full_name", 170);
            $table->string("email", 255)->unique();
            $table->string("password", 255);
            $table->date("date_of_birth")->default('1000-01-01 00:00:00');
            $table->date("registration_date")->default(DB::raw('CURRENT_TIMESTAMP'));;
            $table->enum('email_status', array_column(EmailStatusEnum::cases(), 'name'));
            $table->enum('account_type', array_column(AccountTypeEnum::cases(), 'name'));
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

    }
};
