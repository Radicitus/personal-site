import "./globals.css";
import Nav from "@/app/components/Nav";

export const metadata = {
  title: "Cam's Personal Site",
  description: "A peek into my life",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
