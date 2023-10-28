import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productActions } from "..";

export const useProductMutation = () => {

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onSuccess: (data) => {
      console.log('Producto creado');
      queryClient.invalidateQueries(
        ['products', {'filterKey': data.category}]
      )

    },
  });

  return mutation;
}
