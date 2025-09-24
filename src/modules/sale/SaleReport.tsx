import api from "@/api";
import { DataTable } from "@/components/datatable/data-table";
import DatePicker from "@/components/datepicker/DatePicker";
import { columns } from "@/modules/sale/column";
import { useState } from "react";


const SaleReport = () => {
  const { data : saledata } = api.sale.getSaleRecord.useQuery({
    notifyOnChangeProps: "all",
  });

  const [selectedDate, setSelectedDate] = useState<string | undefined>();

 
  const   {data : filterData} = api.sale.filterSaleRecord.useQuery(selectedDate, {
    notifyOnChangeProps: 'all', 
  });
  console.log(filterData?.salesList)

  const displayData = selectedDate ? filterData?.salesList : saledata;
  
  return (
    <>
      <div className="container mx-auto py-10 p-10 mt-20">
        <div className="flex  font-semibold text-2xl mb-5">
          <h2>Sale Reports</h2>
          <div className="ml-auto">
              <DatePicker onDateChange={setSelectedDate}/>
          </div>
        </div>
         <DataTable columns={columns} data={displayData || []} />
        
      </div>
    </>
  );
};

export default SaleReport;
