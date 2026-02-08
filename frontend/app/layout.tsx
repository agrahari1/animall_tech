import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <nav>
          <a href="/">Home</a> | <a href="/history">History</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
