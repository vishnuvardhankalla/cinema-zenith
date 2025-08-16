import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Contact", href: "/contact" }
    ]
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", href: "/help" },
      { name: "Safety Information", href: "/safety" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" }
    ]
  },
  {
    title: "Services",
    links: [
      { name: "Movies", href: "/movies" },
      { name: "Events", href: "/events" },
      { name: "Gift Cards", href: "/gift-cards" },
      { name: "Corporate Bookings", href: "/corporate" }
    ]
  }
];

const SOCIAL_LINKS = [
  { name: "Facebook", href: "https://facebook.com/tickethub", icon: Facebook },
  { name: "Twitter", href: "https://twitter.com/tickethub", icon: Twitter },
  { name: "Instagram", href: "https://instagram.com/tickethub", icon: Instagram },
  { name: "YouTube", href: "https://youtube.com/tickethub", icon: Youtube }
];

export const MoviesFooter = () => {
  return (
    <footer className="bg-background border-t border-border mt-12" data-testid="movies-footer" aria-label="Footer">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">TH</span>
              </div>
              <span className="text-xl font-bold">TicketHub</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Your one-stop destination for movie tickets, events, and entertainment experiences across India.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                  aria-label={`Follow us on ${name}`}
                  data-testid={`footer-social-${name.toLowerCase()}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {FOOTER_LINKS.map(({ title, links }) => (
            <div key={title}>
              <h3 className="font-semibold mb-4 text-foreground">{title}</h3>
              <ul className="space-y-3">
                {links.map(({ name, href }) => (
                  <li key={name}>
                    <a
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`footer-link-${name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2024 TicketHub. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="/terms" className="hover:text-foreground transition-colors">
              Terms & Conditions
            </a>
            <span>•</span>
            <a href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="/cookies" className="hover:text-foreground transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};