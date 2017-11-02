declare module 'stocklist_1d.json' {
    interface Stock {
        symbol: string;
    }
    interface Chartlist {
        volume: number;
        avg_price: number;
        current: number;
        time: string;
    }
    export interface RootObject {
        stock: Stock;
        success: string;
        chartlist: Chartlist[];
    }
}
