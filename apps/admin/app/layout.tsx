export const metadata = {
  title: 'PORTECOS Admin',
  description: 'Painel de administração PORTECOS ACADEMIC IA',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}