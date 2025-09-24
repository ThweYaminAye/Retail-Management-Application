export type SaleRecordPayload = {
    productID : number,
    quantity : number,
}

export type filterSaleRecordType = {
    salesList : Sales[],
    totalRevenue : number,
    totalProfit : number,
}