import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Settings } from "./pages/Settings";
import ErrorPage from "./pages/ErrorPage";
import Users from "./pages/Users";
import LoginPage from "./pages/LoginPage";
import { AnnouncementPage } from "./pages/AnnouncementPage";
import { MessagePage } from "./pages/MessagePage";
import { CustomerPage } from "./pages/CustomerPage";
import { CustomerDetailsPage } from "./pages/CustomerDetailsPage";
import { AnimalDetailsPage } from "./pages/AnimalDetailsPage";
import { DatabasePage } from "./pages/DatabasePage";
import { NewRegister } from "./pages/NewRegister";
import { NewRegisterById } from "./pages/NewRegisterById";
import { NewRegisterByOwner } from "./pages/NewRegisterByOwner";
import AnimalListsSearchOwner from "./components/AnimalListsSearchOwner";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "settings", element: <Settings /> },
        {
          path: "users",
          element: <Users />,
          // children: [{ path: "user/:id", element: <AnimalByOwnerId /> }],
        },
        // { path: "animals", element: <AnnouncementPage /> },
        { path: "announcements", element: <AnnouncementPage /> },
        { path: "messages", element: <MessagePage /> },
        { path: "customers", element: <CustomerPage /> },
        { path: "customers/:id", element: <CustomerDetailsPage /> },
        { path: "animals/:id", element: <AnimalDetailsPage /> },
        { path: "database", element: <DatabasePage /> },
        { path: "newRegister", element: <NewRegister /> },
        { path: "newRegisterbyid", element: <NewRegisterById /> },
        {
          path: "newRegisterbyowner",
          element: <NewRegisterByOwner />,
          children: [{ path: ":id", element: <AnimalListsSearchOwner /> }],
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ],
  {
    basename: "/projectTest",
  }
);

export default router;
