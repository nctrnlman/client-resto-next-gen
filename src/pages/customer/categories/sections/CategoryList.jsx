import useCategories from "../../../../hooks/useCategories";
import CategoryCard from "../../../../components/common/cards/CategoryCard";

const CategoryList = () => {
  const { categories, status, error } = useCategories();

  let content;

  if (status === "loading") {
    content = <div>Loading...</div>;
  } else if (status === "succeeded") {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    );
  } else if (status === "failed") {
    content = (
      <div>{error ? error.join(", ") : "Failed to fetch categories"}</div>
    );
  }

  return <div>{content}</div>;
};

export default CategoryList;
