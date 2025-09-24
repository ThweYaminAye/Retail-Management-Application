import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  // useQueryClient,
  type UseQueryOptions,
  // useMutation,
  // type UseMutationOptions
} from "@tanstack/react-query";
import axi from "@/configs/axios";
import type { Product } from "@/shared/types";
import { newProductPayload } from "./types";

export const getAllProducts = {
  useQuery: (
    opt?: Partial<UseQueryOptions<unknown, Error, Array<Product>>>
  ) => {
    return useQuery({
      queryKey: ["allProducts"],
      queryFn: async () => {

        try {
          const response = await axi.get("/Products/GetAllProducts/");
          const data = response.data;
          return data;
        } catch {
          throw new Error("Error");
        }
      },
      ...opt,
    });
  },
};




export const addNewProduct = {
  useMutation: (opt?: UseMutationOptions<unknown, Error, newProductPayload, unknown>) => {
      const queryClient = useQueryClient()
      return useMutation({
          mutationKey: ['addNewProduct'],
          mutationFn: (payload: newProductPayload) => {
              return axi.post('/Products/AddNewProduct/', payload)
          },
          onSuccess: async () => {
              await queryClient.invalidateQueries(({
                  queryKey: ['allProducts']
              }))
          },
          ...opt
      })
  }
}

export const updateProduct = {
  useMutation: (opt?: UseMutationOptions<unknown, Error,Product, unknown>) => {
      const queryClient = useQueryClient()
      return useMutation({
          mutationKey: ['updateProduct'],
          mutationFn: (payload) => {
              return axi.put('/Products/UpdateProductById/?id='+ payload.productID , payload)
          },
          onSuccess: async () => {
              await queryClient.invalidateQueries(({
                  queryKey: ['allProducts']
              }))
          },
          ...opt
      })
  }

}

export const deleteProduct = {
  useMutation: (opt?: UseMutationOptions<unknown, Error, unknown>) => {
      const queryClient = useQueryClient()
      return useMutation({
          mutationKey: ['updateProduct'],
          mutationFn: (payload) => {
              return axi.delete('/Products/DeleteProductById/?id='+ payload)
          },
          onSuccess: async () => {
              await queryClient.invalidateQueries(({
                  queryKey: ['allProducts']
              }))
          },
          ...opt
      })
  }

}