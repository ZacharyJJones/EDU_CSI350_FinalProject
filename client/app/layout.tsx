import "./globals.css";

// This is like the outer frame that the page content gets put into
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="subarea">
          <h1><em>Zack J's Final Project Spring 2025</em></h1>
          <nav>
            <a className="navlink" href="/">Home</a>
            <a className="navlink" href="/fooditems">Food Items</a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
