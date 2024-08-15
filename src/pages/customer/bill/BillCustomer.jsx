import DashboardBanner from "../../../components/common/cards/DashboardBanner";
import Layout from "../../../components/common/layouts/LayoutCustomer";
import BillCard from "./components/BillCard";

function BillCustomer() {
  return (
    <Layout>
      <main className="flex flex-col gap-4 ">
        <div className="p-4">
          <DashboardBanner
            title="Bill Page"
            message="Hello! We're glad to have you here. Explore our wide range of products and manage your orders easily. If you need any help, feel free to reach out to our support team."
          />
        </div>
        <div>
          <BillCard />
        </div>
      </main>
    </Layout>
  );
}

export default BillCustomer;
