export enum ProductCategory
{
    GPU = 'GPU', 
    CPU = 'CPU',
    VideoCard = 'Placa De Video', 
    Processor = 'Processador', 
    MotherBoard = 'Placa Mãe',
    RAM = 'Memoria Ram', 
    SSD = 'SSD',
    HDD = 'HDD',
    PowerSupply = 'Fonte', 
    Cooler = 'Cooler',
    Fans = 'Fans',
    ComputerCase = 'Gabinete',
}
export enum ProductState
{
    New = 'New',
    Used = 'Used'
}
export interface Product
{
    id:BigInteger;
    name:string;
    description:string;
    category:ProductCategory;
    state:ProductState;
    vendor_name:string;
    price:string;
    release_date:string | Date;

}    