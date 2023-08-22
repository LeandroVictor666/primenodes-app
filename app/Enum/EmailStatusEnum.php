<?php

namespace App\Enum;

enum EmailStatusEnum: string
{
    case Unverified = 'Unverified';
    case Verified = 'Verified';
    case Ghost = 'Ghost';
}