"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Product } from "@/shared/types"
import { Button } from "@/components/ui/button";
import api from "@/api";
import { useState } from "react";
import { ArrowUpDown } from "lucide-react"


export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "productId",
    header: "ProductID",
    cell: ({ row }) => <div>{row.original.productID}</div>,
  },
  {
    accessorKey: "productName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.original.productName}</div>,
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => <div>{row.original.stock}</div>,
  },
  {
    accessorKey: "sellingPrice",
    header: "SellingPrice",
    cell: ({ row }) => <div>{row.original.sellingPrice}</div>,
  },{
    accessorKey: "profitPerItem",
    header: "profitPerItem",
    cell: ({ row }) => <div>{row.original.profitPerItem}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [editableProduct, setEditableProduct] = useState<Product | null>(null);

      
      const {mutate:editProduct} = api.product.updateProduct.useMutation({
      })
      const {mutate:removeProduct} = api.product.deleteProduct.useMutation({
      })

      const handleEdit = () => {
        setEditableProduct(product);
        setIsModalOpen(true);
      };

      const handleCancel = () => {
        setIsModalOpen(false);
      };
      const handleSave = () => {
        
        editProduct(editableProduct as Product)

        console.log("Saving product", editableProduct?.productID);
        setIsModalOpen(false); 
      };

      const handleDelete =()=>{
        removeProduct(product.productID)
      }
      
      return (
        <div className="flex jusity-between items-center gap-6">
          <Button variant="outline" size="sm" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            Delete
          </Button>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
              <div className="bg-indigo-200 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl mb-4">Edit Product</h2>

                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Product Name</label>
                    <input
                      type="text"
                      value={editableProduct?.productName || ""}
                      onChange={(e) => setEditableProduct({ ...editableProduct!, productName: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium">Stock</label>
                    <input
                      type="number"
                      value={editableProduct?.stock || ""}
                      onChange={(e) => setEditableProduct({ ...editableProduct!, stock: Number(e.target.value) })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium">Selling Price</label>
                    <input
                      type="number"
                      value={editableProduct?.sellingPrice || ""}
                      onChange={(e) => setEditableProduct({ ...editableProduct!, sellingPrice: Number(e.target.value) })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium">Profit Per Item</label>
                    <input
                      type="number"
                      value={editableProduct?.profitPerItem || ""}
                      onChange={(e) => setEditableProduct({ ...editableProduct!, profitPerItem: Number(e.target.value) })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex justify-between gap-4">
                    <Button variant="outline" onClick={handleCancel} className="text-white bg-gray-500">Cancel</Button>
                    <Button onClick={handleSave} className="text-white bg-indigo-500">Save</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    },
  },
  
]
