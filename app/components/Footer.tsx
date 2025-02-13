import Link from "next/link";

const Footer = () => {
    const footerLinks = {
      'Customer Service': [
        { name: 'Contact Us', href: '/contact' },
        { name: 'Shipping Policy', href: '/shipping' },
        { name: 'Returns & Exchanges', href: '/returns' },
        { name: 'FAQs', href: '/faqs' }
      ],
      'About Us': [
        { name: 'Our Story', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Careers', href: '/careers' },
        { name: 'Store Locations', href: '/locations' }
      ],
      'Legal': [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' }
      ]
    };
  
    return (
      <footer>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="text-2xl font-bold">
                Store
              </Link>
              <p className="text-gray-500">
                Your one-stop shop for quality products and exceptional service.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Facebook</span>
                </a>
              </div>
            </div>
  
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold  tracking-wider uppercase mb-4">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
  
          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-400 text-sm">
              © {new Date().getFullYear()} Store. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
export default Footer;