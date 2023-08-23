<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
        });
    }

    //Precisamos construir nossa propria render do erro, que cai no try catch do Validate do laravel, sem isso, não há resposta da API para o Client.
    

    /**
     * Precisamos construir nossa propria render do erro, que cai no try catch do Validate do laravel, sem isso, não há resposta da API para o Client.
     * Respondemos como JSON, para o Client processar a resposta.
     */
    public function render($request, Throwable $e)
    {
        $serverToClient = json_encode([
            'response' => $e->getMessage(),
            'isError' => 'true'
        ]);
        echo $serverToClient;
        http_response_code(400);
        exit();
    }
}
