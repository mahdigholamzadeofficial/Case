import { useEffect, useRef, useState } from "react";

// Components
import Search from "../components/Search/Search";
import { Loading } from "../../../common/components/Loading";
import ProductCard from "../components/ProductCard/ProductCard";
import { Empty } from "antd";

// Types
import { IGetProductListRequest } from "../services/types/get-product-list-request.type";
import { IProduct } from "../services/types/get-product-list-response.type";

// Services
import { fetchProductList } from "../services/requests/fetch-products";

// Stores
import { useFilterStore } from "../../../common/stores/filter-store";
import { useProductsStore } from "../../../common/stores/products-store";

// Styles
import "./ProductList.scss";

const ProductListContainer = () => {
  const fetchedTimeout = useRef(0);
  const lastElement = useRef<HTMLSpanElement>(null);
  const [loading, setLoading] = useState(false);

  const selectedCategories = useFilterStore((state) => state.categories);
  const searchText = useFilterStore((state) => state.searchText);
  const products = useProductsStore((state) => state.products);
  const page = useFilterStore((state) => state.page);

  const setPage = useFilterStore((state) => state.setPage);
  const addProducts = useProductsStore((state) => state.addProducts);
  const setProducts = useProductsStore((state) => state.setProducts);

  const shouldFetchAll = Boolean(searchText || selectedCategories.size);

  const filteredProducts = (prodcuts: IProduct[]): IProduct[] => {
    const filteredProductList = prodcuts.filter((product: IProduct) => {
      const matchesCategory =
        selectedCategories.size === 0 ||
        selectedCategories.has(product.category);
      const matchesSearch =
        !searchText ||
        product.title.toLowerCase().includes(searchText.toLowerCase().trim());

      return matchesCategory && matchesSearch;
    });

    return filteredProductList;
  };

  const fetchMoreProducts = () => {
    clearTimeout(fetchedTimeout.current);
    setLoading(true);

    fetchedTimeout.current = setTimeout(async () => {
      try {
        const params: Partial<IGetProductListRequest> = {};

        if (!shouldFetchAll) {
          params["_page"] = page;
          params["_per_page"] = 12;
        }

        const newProducts = await fetchProductList(params);
        if (newProducts)
          if (!shouldFetchAll) {
            addProducts(newProducts.data);
            setPage(page + 1);
          } else {
            // Had to use @ts-expect-error, beacuse json-server does not return the data as the
            // value of data property in response while we are trying to fetch all of the data.
            // @ts-expect-error
            setProducts(filteredProducts(newProducts));
          }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !shouldFetchAll) {
          fetchMoreProducts();
        }
      });
    });
    if (lastElement.current) {
      observer.observe(lastElement.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [loading, lastElement.current]);

  useEffect(() => {
    fetchMoreProducts();
  }, [selectedCategories, searchText]);

  return (
    <div className="product-list-container">
      <Search />

      <main className="product-list">
        {products.map((product: IProduct) => (
          <ProductCard key={`${product.id}-${product.title}`} {...product} />
        ))}
      </main>

      {!shouldFetchAll && (
        <span ref={lastElement} className="product-list-empty-element" />
      )}

      {!loading && !products.length && (
        <Empty description="No Products Found" />
      )}

      {loading && <Loading />}
    </div>
  );
};

export default ProductListContainer;
