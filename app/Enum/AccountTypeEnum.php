<?php

namespace App\Enum;


enum AccountTypeEnum: string
{
    case Normal = 'Normal';
    case Admin = "Admin";
    case ShadowBanned = "ShadowBanned";
    case BannedUser = 'Banned';
}