import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CATEGORIES } from "../../../constants/constant";
import { useFilterStore } from "../../stores/filter-store";
import "./CategoryFilter.scss";
import { useProductsStore } from "../../stores/products-store";

const CategoryFilter = () => {
  const categories = useFilterStore((state) => state.categories);
  const setCategories = useFilterStore((state) => state.setCategories);
  const setPage = useFilterStore((state) => state.setPage);
  const setProducts = useProductsStore((state) => state.setProducts);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoriesFromQuery = queryParams.getAll("category");

    setCategories(new Set(categoriesFromQuery));
  }, []);

  const handleCategoryChange = (category: string) => {
    const prevCategories = new Set(categories);
    if (prevCategories.has(category)) {
      prevCategories.delete(category);
      if (prevCategories.size) {
        setProducts([]);
      } else {
        setPage(1);
      }
    } else {
      prevCategories.add(category);
    }
    setCategories(prevCategories);
  };

  const handleFilter = () => {
    const queryParams = new URLSearchParams();

    categories.forEach((category) => {
      queryParams.append("category", category);
    });

    navigate(`?${queryParams.toString()}`);
  };

  useEffect(() => {
    handleFilter();
  }, [categories]);
  return (
    <div className="category-filter">
      <h4>Categories</h4>

      {CATEGORIES.map((category) => (
        <div key={category} className="category-filter__item">
          <input
            type="checkbox"
            id={`category-${category}`}
            checked={categories.has(category)}
            onChange={() => handleCategoryChange(category)}
          />
          <label htmlFor={`category-${category}`}>{category}</label>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
