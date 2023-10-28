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
      
      // Almacenar el producto en el cache del query client
      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: product.category}],
        (old) => {
          if ( !old ) return [optimisticProduct];

          return [...old, optimisticProduct];
        }
      );

      return {
        optimisticProduct
      }
    },

    onSuccess: (product, variables, context) => {
      
      /** Invalidate query */
      // queryClient.invalidateQueries(
      //   ['products', {'filterKey': product.category}]
      // );

      queryClient.removeQueries(
        ["product", context?.optimisticProduct.id]
      );

      /** Avoid invalidate query */
      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: product.category }],
        (old) => {
          if ( !old ) return [product];

          return old.map(cachedProduct => (
            cachedProduct.id === context?.optimisticProduct.id
              ? product
              : cachedProduct
          ));
        }
      );
    },

    onError: (error, variables, context) => {
      console.log({error, variables, context});

      queryClient.removeQueries(
        ["product", context?.optimisticProduct.id]
      );

      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: variables.category }],
        (old) => {
          if ( !old ) return [];

          return old.filter(cachedProduct => (
            cachedProduct.id !== context?.optimisticProduct.id
          ));
        }
      );
    },
  });

  return mutation;
}
