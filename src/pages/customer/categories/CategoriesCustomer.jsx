import Layout from "../../../components/common/layouts/LayoutCustomer";
import DashboardBanner from "./components/DashboardBanner";
import CategoryList from "./sections/CategoryList";

function CategoriesCustomer() {
  return (
    <Layout>
      <main className="flex flex-col gap-4 ">
        <div className="p-4">
          <DashboardBanner
            title="Welcome to our Categories"
            message="Hello! We're glad to have you here. Explore our wide range of products and manage your orders easily. If you need any help, feel free to reach out to our support team."
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
