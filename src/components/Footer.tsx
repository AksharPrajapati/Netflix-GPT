const FOOTER_COLS = [
  ["FAQ", "Help Center", "Account", "Media Center"],
  ["Investor Relations", "Jobs", "Ways to Watch", "Terms of Use"],
  ["Privacy", "Cookie Preferences", "Corporate Information", "Contact Us"],
  ["Speed Test", "Legal Notices", "Only on Netflix", "Ad Choices"],
];

const SOCIALS = [
  {
    label: "Facebook",
    icon: "f",
    href: "#",
  },
  {
    label: "Instagram",
    icon: "▣",
    href: "#",
  },
  {
    label: "Twitter",
    icon: "𝕏",
    href: "#",
  },
  {
    label: "YouTube",
    icon: "▶",
    href: "#",
  },
];

function Footer() {
  return (
    <footer className="bg-black text-gray-500 px-6 md:px-14 py-12 border-t border-gray-800">
      <div className="max-w-5xl">
        {/* Social links */}
        <div className="flex gap-5 mb-6">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="text-gray-400 hover:text-white transition-colors text-lg"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-3 mb-8">
          {FOOTER_COLS.map((col, ci) =>
            col.map((link) => (
              <span
                key={`${ci}-${link}`}
                className="text-xs hover:underline cursor-pointer hover:text-gray-300 transition-colors"
              >
                {link}
              </span>
            ))
          )}
        </div>

        {/* Language selector */}
        <div className="mb-6">
          <select className="bg-transparent border border-gray-600 text-gray-400 text-xs px-3 py-1.5 rounded cursor-pointer hover:border-gray-400 transition-colors">
            <option>English</option>
            <option>हिन्दी</option>
            <option>Español</option>
          </select>
        </div>

        <p className="text-xs">
          © {new Date().getFullYear()} Netflix-GPT Clone. Built with React &amp; TMDB API.
          <span className="block mt-1 text-gray-600">
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
