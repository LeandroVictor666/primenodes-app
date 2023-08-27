<?php

namespace App\Http\Middleware;

use App\Helpers\SessionHelper;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PrimeNodesAuthentication
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $sessionHelper = new SessionHelper();
        if (!$sessionHelper->checkAuthentication()){
            return redirect('login');
            exit();
        };
        return $next($request);
        exit();
    }
}
