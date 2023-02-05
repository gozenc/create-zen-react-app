import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
	return (
		<>
			<Header />
			<div className="bg-white h-screen flex flex-col items-center justify-center dark:bg-slate-800">
				<Outlet />
			</div>
		</>
	);
}
