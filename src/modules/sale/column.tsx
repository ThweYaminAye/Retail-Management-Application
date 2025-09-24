"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Sales } from "@/shared/types"



export const columns: ColumnDef<Sales>[] = [
  {
    accessorKey: "salesID",
    header: "SaleID",
    cell: ({ row }) => <div>{row.original.salesID}</div>,
  },
  {
    accessorKey: "productName",
    header: "ProductName",
    cell: ({ row }) => <div>{row.original.productName}</div>,
  },
  {
    accessorKey: "quantitySold",
    header: "Quantity Sold",
    cell: ({ row }) => <div>{row.original.quantitySold}</div>,
  },
  {
    accessorKey: "sellingPrice",
    header: "SellingPrice",
    cell: ({ row }) => <div>{row.original.sellingPrice}</div>,
  },{
    accessorKey: "totalProfit",
    header: "Total Profit",
    cell: ({ row }) => <div>{row.original.totalProfit}</div>,
  },
]
