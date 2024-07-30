"use client";

import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import { Provider } from "react-redux";
import { store } from "./theme/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Provider store={store}>
          <ProtectedRoute>
            <AuthProvider>{children}</AuthProvider>
          </ProtectedRoute>
        </Provider>
      </body>
    </html>
  );
}
