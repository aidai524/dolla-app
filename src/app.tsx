import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "./components/loading";
import MainLayout from "./layouts/main";
import WalletProvider from "./contexts/wallet";
import { AuthProvider } from "./contexts/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@rainbow-me/rainbowkit/styles.css";

const LazyNft = lazy(() => import("./views/nft"));
const LazyBtc = lazy(() => import("./views/btc"));
const LazyNftCreate = lazy(() => import("./views/nft-create"));
const LazyBtcCreate = lazy(() => import("./views/btc-create"));
const LazyProfilePlayer = lazy(() => import("./views/profile/player"));
const LazyProfileSeller = lazy(() => import("./views/profile/seller"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/btc" replace />
      },
      {
        path: "nft",
        element: <LazyNft />
      },
      {
        index: true,
        path: "btc",
        element: <LazyBtc />
      },
      {
        path: "nft/create",
        element: <LazyNftCreate />
      },
      {
        path: "btc/create",
        element: <LazyBtcCreate />
      },
      {
        path: "portfolio",
        children: [
          {
            index: true,
            element: <Navigate to="player" replace />
          },
          {
            path: "player",
            element: <LazyProfilePlayer />
          },
          {
            path: "seller",
            element: <LazyProfileSeller />
          }
        ]
      }
    ]
  },
  // {
  //   path: "/cards",
  //   element: <Temp />
  // },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <WalletProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </WalletProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        theme="light"
        toastStyle={{ backgroundColor: "transparent", boxShadow: "none" }}
        newestOnTop
        rtl={false}
        pauseOnFocusLoss
        closeButton={false}
      />
    </Suspense>
  );
}

export default App;
