export interface MonthlyPrice{

    date: string;
    region: 'NORTE' | 'NORDESTE' | 'SUL' | 'SUDESTE';
    price: number;
}