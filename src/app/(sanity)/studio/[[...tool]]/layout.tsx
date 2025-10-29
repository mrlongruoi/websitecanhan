import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mr Long",
  description: "Website cá nhân của mr Long",
};

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    )
};

export default Layout;