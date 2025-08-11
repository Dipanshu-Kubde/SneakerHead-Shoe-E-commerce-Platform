import React from "react";
import "./footer.css";
import { FaInstagram, FaPinterest, FaFacebook, FaYoutube, FaDiscord } from "react-icons/fa";

const footerLinks = {
  About: ["About Ref", "Stores", "Careers", "Affiliates"],
  Help: ["FAQ", "Contact", "Size guide", "E‑gift cards"],
  Account: ["Sign in", "Returns & exchanges", "Order lookup", "India 🇮🇳"],
};

const social = [
  { name: "Instagram", href: "https://instagram.com", Icon: FaInstagram },
  { name: "Discord", href: "https://discord.com", Icon: FaDiscord },
  { name: "Pinterest", href: "https://pinterest.com", Icon: FaPinterest },
  { name: "Facebook", href: "https://facebook.com", Icon: FaFacebook },
  { name: "YouTube", href: "https://youtube.com", Icon: FaYoutube },
];

const bannerData = [
  {
    icon: "📦",
    title: "Free shipping",
    subtitle: "Oh, and we updated our return policy",
  },
  {
    icon: "📍",
    title: "Ref stores",
    subtitle: "We're all over the place",
  },
  {
    icon: "☁️",
    title: "Committed to climate action",
    subtitle: "And we have big plans",
  },
  {
    icon: "💌",
    title: "Customer love",
    subtitle: "We got you via email or text",
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__banners">
        {bannerData.map((b, i) => (
          <div key={i} className="banner-item">
            <div className="banner-emoji">{b.icon}</div>
            <h2>{b.title}</h2>
            <span>{b.subtitle}</span>
          </div>
        ))}
      </div>

      <div className="footer__nav-container">
        {Object.entries(footerLinks).map(([section, items]) => (
          <ul key={section} className="footer-links__list">
            {items.map((text) => (
              <li key={text}>
                <a href="#" className="link-secondary">
                  {text}
                </a>
              </li>
            ))}
          </ul>
        ))}

        <div className="footer__newsletter">
          <p className="small-text">We make great emails</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Give us your email" />
            <button type="submit">Sign up</button>
          </form>

          <div className="footer__icons">
      {social.map(({ name, href, Icon }) => (
        <a
          key={name}
          href={href}
          aria-label={name}
          className="social-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon size={20} />
        </a>
      ))}
    </div>
        </div>
      </div>

      <div className="footer__bottom">
        <ul className="footer-additional">
          {[
            "Do not sell or share my info",
            "Terms",
            "Privacy",
            "California Privacy Notice",
            "Sitemap",
            "Accessibility",
            "CA Supply Chain",
          ].map((text) => (
            <li key={text}>
              <a href="#" className="link-secondary small-text">
                {text}
              </a>
            </li>
          ))}
        </ul>
        <div className="footer__copyright small-text">
          © 2025 SneakerHead
        </div>
      </div>
    </footer>
  );
}
