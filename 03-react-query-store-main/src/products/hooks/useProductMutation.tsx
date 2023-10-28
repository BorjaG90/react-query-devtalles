import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, productActions } from "..";

export const useProductMutation = () => {

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productActions.createProduct,

    onMutate: (product) => {
      console.log('Mutando - Optimistic update');

      //! Opcional hacer la invalidación de query
      // Optimistic product
      const optimisticProduct = { id: Math.random(), ...product };
      console.log(optimisticProduct);
      
      // Almacenar el producto en el cache del query client
      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: product.category}],
        (old) => {
          if ( !old ) return [optimisticProduct];

          return [...old, optimisticProduct];
        }
      );
    },

    onSuccess: (data) => {
      /** Invalidate query */
      // queryClient.invalidateQueries(
      //   ['products', {'filterKey': data.category}]
      // );

      /** Avoid invalidate query */
      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: data.category }],
        (old) => {
          if ( !old ) return [data];

          return [...old, data];
        }
      );

    },
  });

  return mutation;
}
