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



export class Product
{
    Name:string;
    Description:string;
    Category:ProductCategory;
    State:ProductState;
    VendorName:string;
    Price:string;
    SellDate:Date;

}    