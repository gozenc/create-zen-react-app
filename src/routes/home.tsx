import logo from "../logo.svg";
import "../styles/style.scss";

export default function Home() {
  return (
    <div className="flex flex-col w-full justify-center h-96 items-center">
      <img src={logo} className="app-logo h-48" alt="logo" />
      <p className="flex text-white">
        Edit <code className="mx-2"> src/routes/home.tsx </code>{" "}
      </p>
      <a
        className="text-cyan-500"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <h5 className="bg-gradient-to-r from-cyan-500 to-blue-100 text-transparent text-sm bg-clip-text font-bold">
        created with Create Zen App
      </h5>
    </div>
  );
}
