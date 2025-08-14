import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Contact Us", href: "/contact" }
  ],
  support: [
    { label: "Help & Support", href: "/help" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Refund Policy", href: "/refund" }
  ],
  features: [
    { label: "Gift Cards", href: "/gift-cards" },
    { label: "Corporate Bookings", href: "/corporate" },
    { label: "Offers", href: "/offers" },
    { label: "Loyalty Program", href: "/loyalty" }
  ]
};

const SOCIAL_LINKS = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" }
];

export const FooterLinks = () => {
  return (
    <footer className="bg-cinema-surface-elevated border-t border-border" data-testid="home-footer">
      <div className="container mx-auto px-4 py-8 md:py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-glow rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BM</span>
              </div>
              <span className="font-bold text-lg bg-gradient-glow bg-clip-text text-transparent">
                BookMyShow
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              India's largest platform for booking movie tickets and live events. 
              Experience entertainment like never before.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@bookmyshow.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 22 6127 9009</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.support.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Features Links */}
          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.features.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-border pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Social Media Links */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">Follow us:</span>
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:bg-cinema-surface"
                  data-testid={`social-link-${label.toLowerCase()}`}
                >
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <Icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} BookMyShow. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};