import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// Components
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

// Utils
import { useDebounce } from "../../../../common/hooks/useDebounce";

// Stores
import { useFilterStore } from "../../../../common/stores/filter-store";
import { useProductsStore } from "../../../../common/stores/products-store";

// Styles
import "./Search.scss";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchText = useFilterStore((state) => state.searchText);
  const setSearchText = useFilterStore((state) => state.setSearchText);
  const setPage = useFilterStore((state) => state.setPage);
  const setProducts = useProductsStore((state) => state.setProducts);

  const debouncedSearch = useDebounce(searchText, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchFromQuery = queryParams.get("search") || "";
    setSearchText(searchFromQuery);
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    if (debouncedSearch) {
      queryParams.set("search", debouncedSearch);
    } else {
      setProducts([]);
      setPage(1);

      queryParams.delete("search");
    }

    navigate(`?${queryParams.toString()}`, { replace: true });
  }, [debouncedSearch, navigate, location.search]);

  return (
    <div className="search">
      <Input
        className="search__input"
        placeholder="Search products..."
        value={searchText}
        onChange={handleChange}
        prefix={<SearchOutlined className="search__icon" />}
        allowClear
      />
    </div>
  );
};

export default Search;
