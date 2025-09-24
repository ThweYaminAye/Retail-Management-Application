import {
    useQuery,
    useQueryClient,
    type UseQueryOptions,
    useMutation,
    type UseMutationOptions
  } from "@tanstack/react-query";
import axi from "@/configs/axios";
import type { Sales } from "@/shared/types";
import { filterSaleRecordType, SaleRecordPayload } from "./types";
  
  export const getSaleRecord = {
    useQuery: (
      opt?: Partial<UseQueryOptions<unknown, Error, Array<Sales>>>
    ) => {
      return useQuery({
        queryKey: ["Sales"],
        queryFn: async () => {
          try {
            const response = await axi.get("/Sales/ViewSalesReport/");
            const data = response.data.data;
            return data;
          } catch {
            throw new Error("Error");
          }
        },
        ...opt,
      });
    },
  };

export const addSaleRecord = {
    useMutation: (opt?: UseMutationOptions<unknown, Error, SaleRecordPayload, unknown>) => {
        const queryClient = useQueryClient()
        return useMutation({
            mutationKey: ['addSaleRecord'],
            mutationFn: (payload: SaleRecordPayload) => {
                const { productID, quantity } = payload;
                return axi.post(`/Sales/BuyProducts?id=${productID}&quantity=${quantity}`)
            },
            onSuccess: async () => {
                await queryClient.invalidateQueries(({
                    queryKey: ['Sales']
                }))
            },
            ...opt
        })
    }

}


export const filterSaleRecord = {
  useQuery: (
    date?: string,
    opt?: Partial<UseQueryOptions<unknown, Error , filterSaleRecordType>>
  ) => {
    return useQuery({
      queryKey: ["filterSaleRecord", date],
      queryFn: async () => {
        try {
          const response = await axi.get(`/Sales/SalesByDate?inputDate=${date}`);
          const data = response.data.data;
          return data;
        } catch {
          throw new Error("Error");
        }
      },
      ...opt,
    });
  },
};