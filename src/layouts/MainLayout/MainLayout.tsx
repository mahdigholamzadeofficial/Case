import { Outlet } from "react-router-dom";
import "./MainLayout.scss";
import { useErrorStore } from "../../common/stores/error-store";
import { Header } from "../../common/components/Header";

export const MainLayout = () => {
  const { errorData } = useErrorStore();

  if (errorData.errorStatus) {
    return <div>{errorData.errorUserMessage}</div>;
  }

  return (
    <main className="main-layout">
      <Header />
      <Outlet />
    </main>
  );
};
