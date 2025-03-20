export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return <section className="w-full min-h-screen p-10 flex justify-center items-center">{children}</section>;
  }