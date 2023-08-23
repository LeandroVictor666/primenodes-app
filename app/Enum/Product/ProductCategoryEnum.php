<?php

namespace App\Enum\Product;

enum ProductCategoryEnum:string
{
    case GPU = 'GPU'; 
    case CPU = 'CPU';
    case VideoCard = 'Placa De Video'; 
    case Processor = 'Processador'; 
    case MotherBoard = 'Placa Mãe';
    case RAM = 'Memoria Ram'; 
    case SSD = 'SSD';
    case HDD = 'HDD';
    case PowerSupply = 'Fonte'; 
    case Cooler = 'Cooler';
    case Fans = 'Fans';
    case ComputerCase = 'Gabinete';
};

