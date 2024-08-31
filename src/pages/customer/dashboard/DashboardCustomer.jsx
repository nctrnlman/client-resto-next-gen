import DashboardBanner from "../../../components/common/cards/DashboardBanner";
import Layout from "../../../components/common/layouts/LayoutCustomer";

import ProductList from "./sections/ProductList";

function DashboardCustomer() {
  return (
    <Layout>
      <main className="flex flex-col gap-4 ">
        <div className="p-4">
          <DashboardBanner
            title="Welcome to Our Resto"
            message="Hello! We're glad to have you here. Explore our wide range of products and manage your orders easily. If you need any help, feel free to reach out to our support team."
            page="home"
          />
        </div>
        <div>
          <ProductList />
        </div>
      </main>
    </Layout>
  );
}

export default DashboardCustomer;
