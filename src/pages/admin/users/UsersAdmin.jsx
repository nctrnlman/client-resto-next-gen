import DashboardBanner from "../../../components/common/cards/DashboardBanner";
import Layout from "../../../components/common/layouts/LayoutAdmin";
import UserList from "./sections/UserList";
function UsersAdmin() {
  return (
    <Layout>
      <main className="flex flex-col gap-4 ">
        <div className="p-4">
          <DashboardBanner
            title="Users Page"
            message="Hello! We're glad to have you here. Explore our wide range of products and manage your orders easily. If you need any help, feel free to reach out to our support team."
          />
        </div>
        <div className="px-4">
          <UserList />
        </div>
      </main>
    </Layout>
  );
}

export default UsersAdmin;
