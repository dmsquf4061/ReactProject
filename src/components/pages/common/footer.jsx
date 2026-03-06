const footerVariant = {
  light: {
    bg: "bg-[#F8F8F8]",
    text: "text-[var(--primary-foreground)]",
    muted: "text-[var(--muted-foreground)]",
  },
  dark: {
    bg: "bg-[#111111]",
    text: "text-[var(--muted-foreground)]",
    muted: "text-[var(--primary-foreground)]",
  },
};

function Footer({ variant = "light" }) {
  const v = footerVariant[variant];

  return (
    <footer className={`${v.bg}`}>
      <div className="py-10 px-4 sm:px-10 md:px-20 md:text-left">
        <div className="flex flex-col gap-5 md:gap-10 md:flex-row items-center md:justify-between">
          <div className="max-w-sm">
            <div className={`text-lg font-bold ${v.text}`}>The B</div>
            <p className={`mt-2 text-sm ${v.muted}`}>
              Web Publisher focused on clean UI implementation and responsive web experiences.
            </p>
          </div>

          <nav className={`flex gap-5 md:gap-10 text-xs ${v.text}`}>
            <a className="hover:opacity-80">D</a>
            <span>|</span>
            <a className="hover:opacity-80">Bs</a>
            <span>|</span>
            <a className="hover:opacity-80">Process</a>
            <span>|</span>
            <a className="hover:opacity-80">Contact</a>
          </nav>
        </div>

        <div className={`mt-8 text-xs ${v.muted}`}>
          © {new Date().getFullYear()} The B. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;