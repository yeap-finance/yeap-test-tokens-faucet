import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
// Internal pages
import { Mint } from "@/pages/Mint";

function Layout() {
  return (
    <>
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Mint />,
      },
      // {
      //   path: "create-asset",
      //   element: <CreateFungibleAsset />,
      // },
      // {
      //   path: "my-assets",
      //   element: <MyFungibleAssets />,
      // },
    ],
  },
]);

function App() {
  return (
    <>
      {/* {IS_DEV && <TopBanner />} */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
