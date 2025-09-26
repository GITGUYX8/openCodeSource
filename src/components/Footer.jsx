import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    const socialLinks = [
        { href: "https://github.com", icon: FaGithub, 'aria-label': 'GitHub' },
        { href: "https://twitter.com", icon: FaTwitter, 'aria-label': 'Twitter' },
        { href: "https://linkedin.com", icon: FaLinkedin, 'aria-label': 'LinkedIn' },
    ];

    const footerLinks = [
        { href: "#", text: "Privacy" },
        { href: "#", text: "Terms" },
        { href: "#", text: "Contact" },
    ];

    return (
      <footer className="bg-gray-900 text-gray-400 mt-10">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-center md:text-left">
                <h2 className="text-lg font-semibold text-white">OpenSource Campus</h2>
                <p className="text-sm">Fostering the next generation of open-source contributors.</p>
            </div>
            <div className="flex gap-6">
                {footerLinks.map((link) => (
                    <a key={link.text} href={link.href} className="hover:text-white transition-colors duration-300">{link.text}</a>
                ))}
            </div>
          </div>
          <hr className="my-6 border-gray-700" />
          <div className="flex flex-col-reverse md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-center md:text-left">© {new Date().getFullYear()} OpenSource Campus. All rights reserved.</p>
            <div className="flex gap-4">
                {socialLinks.map((link) => (
                    <a key={link['aria-label']} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link['aria-label']} className="hover:text-white transition-colors duration-300"><link.icon size={20} /></a>
                ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }