export type Product = {
    productID: number,
    productName: string,
    stock: number,
    sellingPrice: number,
    profitPerItem: number
}
export type Sales = {
    salesID: number,
    productID: number,
    productName: string,
    quantitySold: number,
    sellingPrice: number,
    totalProfit: number,
}