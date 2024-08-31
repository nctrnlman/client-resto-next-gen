import DashboardBanner from "../../../components/common/cards/DashboardBanner";
import Layout from "../../../components/common/layouts/LayoutCustomer";
import CategoryList from "./sections/CategoryList";

function CategoriesCustomer() {
  return (
    <Layout>
      <main className="flex flex-col gap-4 ">
        <div className="p-4">
          <DashboardBanner
            title="Categories"
            message="Explore our diverse menu categories. From appetizers to desserts, find the perfect dish for your taste."
            page="categories"
          />
        </div>
        <div>
          <CategoryList />
        </div>
      </main>
    </Layout>
  );
}

export default CategoriesCustomer;
