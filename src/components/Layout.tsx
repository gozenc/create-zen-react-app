import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <>
      <Header />
      <div className="max-w-5xl pt-16 px-3 m-auto">
        <Outlet />
      </div>
    </>
  );
}
