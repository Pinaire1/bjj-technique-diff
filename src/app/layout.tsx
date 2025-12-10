import "./globals.css";
import  { SupabaseProvider }  from "../components/SupabaseProvider";
import { AuthProvider } from "../context/AuthContext";
import { BeltProvider } from "@/context/BeltContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SupabaseProvider>
          <AuthProvider>
            <BeltProvider>
            {children}
            </BeltProvider>
          </AuthProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}

