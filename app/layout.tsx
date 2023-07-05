import "./globals.css";
import Nav from "@/app/components/Nav";
import { mohave, quicksand } from "@/app/fonts";

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
    <html
      lang="en"
      className={`
      ${mohave.variable} ${quicksand.variable}
      `}
    >
      <body className="m-4">
        <Nav />
        {children}
      </body>
    </html>
  );
}
