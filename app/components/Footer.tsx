import { MenuItem } from "@/types/menu";
import { ShopDetails } from "@/types/shopify";
import Link from "next/link";

const getPathName = (url: string) => {
  const urlParts = new URL(url);
  if (urlParts.hash) {
    return "#";
  }
  const pathName = urlParts.pathname.replace("/all", "");
  return pathName;
};

const footerLinksObject = (links: MenuItem[]): Record<string, MenuItem[]> => {
  let linkObj: Record<string, MenuItem[]> = {};
  links.map((item) => {
    linkObj[item.title] = item.items.map((subItem) => ({
      ...subItem,
      href: getPathName(subItem.url),
    }));
  });
  return linkObj;
};

const Footer = ({
  menus,
  shopDetails,
}: {
  menus: MenuItem[];
  shopDetails: ShopDetails;
}) => {
  const menuItems = footerLinksObject(menus);

  return (
    <footer>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold uppercase">
              {shopDetails && shopDetails.shop.name}
            </Link>
            {shopDetails && shopDetails.shop.description && (
              <p className="text-gray-500">
                {shopDetails && shopDetails.shop.description}
              </p>
            )}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>

          {Object.entries(menuItems).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold  tracking-wider uppercase mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href as string}
                      className="text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {link.title}
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
            © {new Date().getFullYear()} {shopDetails && shopDetails.shop.name}.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
