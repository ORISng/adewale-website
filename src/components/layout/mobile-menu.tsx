"use client";

interface MobileMenuProps {
  links: Array<{ label: string; href: string }>;
  onClose: () => void;
}

export default function MobileMenu({ links, onClose }: MobileMenuProps) {
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className="fixed top-18 left-0 right-0 z-50 bg-[#0A0F1E] border-b border-[#E8A020] md:hidden">
      <div className="flex flex-col gap-4 p-6">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-medium tracking-widest uppercase text-[#F0EAD8] hover:text-[#E8A020] transition-colors duration-200"
            onClick={handleLinkClick}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#partner"
          className="text-sm font-bold tracking-widest uppercase bg-[#E8A020] text-[#0A0F1E] px-5 py-2 text-center hover:bg-[#F5C55A] transition-colors duration-200"
          onClick={handleLinkClick}
        >
          Partner With Us
        </a>
      </div>
    </div>
  );
}
