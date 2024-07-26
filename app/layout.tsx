import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ProtectedRoute>
          <AuthProvider>{children}</AuthProvider>
        </ProtectedRoute>
      </body>
    </html>
  );
}
