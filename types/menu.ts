export type MenuItem = {
  id: string;
  title: string;
  url: string;
  items: Array<MenuItem>;
};

export type Menus = {
    menu: {
      id: string;
      title: string;
      handle: string;
      items: Array<MenuItem>;
    };
};
