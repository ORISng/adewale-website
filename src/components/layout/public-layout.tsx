import Navbar from "./navbar";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      <Navbar />
      <main className="pt-18">
        {children}
      </main>
    </div>
  );
}
