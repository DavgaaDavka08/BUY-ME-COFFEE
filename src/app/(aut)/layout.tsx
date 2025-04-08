import Photo from "./Components/Photo";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Photo />
      {children}
    </div>
  );
}
