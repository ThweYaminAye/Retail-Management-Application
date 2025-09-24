import api from '@/api';
import { DataTable } from '@/components/datatable/data-table';
import { columns } from '@/modules/stock/column';
import type { newProductPayload } from '@/api/allproducts/types';
import { useState } from 'react';




const Stock = () => {
  const { data } = api.product.getAllProducts.useQuery({
    notifyOnChangeProps: "all",
  });

  const {mutate:addNewProduct} = api.product.addNewProduct.useMutation({
  })  

  

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [productName, setProductName] = useState("");
  const [stock, setStock] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [profitPerItem, setProfitPerItem] = useState(0);

  const handleAddNewProduct = () => {

    if (!productName || stock <= 0 || sellingPrice <= 0 || profitPerItem <= 0) {
      alert("Please fill all fields correctly!");
      return;
    }

    const newProduct: newProductPayload = {
      productName,
      stock,
      sellingPrice,
      profitPerItem,
    };

    addNewProduct(newProduct);

    setProductName("");
    setStock(0);
    setSellingPrice(0);
    setProfitPerItem(0);
    setIsFormVisible(false);
  };

  
  const handleCancel = () => {
    setIsFormVisible(false); 
  };




  return (
      <>
      
      <div className="container mx-auto py-10 p-10 mt-20 ">
          <div className='text-center font-semibold text-2xl mb-5'>
          <h2 >All Stocks</h2>
          </div>
          <div className='flex '>
          <button onClick={() => setIsFormVisible(true)} className='px-5 ml-auto py-2 mb-3 border border-rounded text-black rounded-lg text-semibold'>+ Add New Product</button>
          </div>
          
          {isFormVisible && (
          <div className="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="modal-content bg-indigo-200 p-6 rounded-lg w-96 z-50">
              <h3 className="text-center font-semibold text-xl mb-4">
                Add New Product
              </h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Stock</label>
                <input
                  type="number"
                  className="mt-1 p-2 w-full border rounded"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  min="0"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Selling Price</label>
                <input
                  type="number"
                  className="mt-1 p-2 w-full border rounded"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(Number(e.target.value))}
                  min="0"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Profit Per Item</label>
                <input
                  type="number"
                  className="mt-1 p-2 w-full border rounded"
                  value={profitPerItem}
                  onChange={(e) => setProfitPerItem(Number(e.target.value))}
                  min="0"
                />
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={handleAddNewProduct}
                  className="px-5 py-2 bg-indigo-500 text-white rounded-lg"
                >
                  Add
                </button>
                <button
                  onClick={handleCancel}
                  className="px-5 py-2 bg-gray-500 text-white rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          )}
          
          <DataTable columns={columns} data={data || []}   /> 
              
      </div>
      </>
    )
};

export default Stock;