<?php

namespace App\Helpers;


class SessionHelper
{

    public $AUTHENTICATION_KEY = 'AuthenticationToken';
    public $AUTHENTICATION_USERNAME = 'AuthenticationUsername';

    /**
     * Checa se o usuario esta logado fazendo checagens na super variavel $_SESSION, pois salvamos algumas informações lá
     * Pois a API não é persistente, então ao login ser disparado é automaticamente salvo as informações nessa variavel.
     * Pelo fato da aplicação ser monolita torna mais complicado para o Client enviar o Authorization Token
     * E até então, não achei muitas coisas de como colocar o JWT no Authorization dentro do Header.
     * Pensei em algumas formas, porém, essa aqui é a mais simples e direta.
     * Criando nosso proprio middleware + uma class que tenha a logica da autenticação.
     */
    public function checkAuthentication(): bool
    {
        session_start();
        if (!isset($_SESSION[$this->AUTHENTICATION_KEY])) {
            return false;
        }
        if (!isset($_SESSION[$this->AUTHENTICATION_USERNAME])) {
            return false;
        }

        return true;
    }
}
