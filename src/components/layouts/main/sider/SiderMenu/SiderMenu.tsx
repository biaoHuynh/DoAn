import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import * as S from './SiderMenu.styles';
import { sidebarNavigation, SidebarNavigationItem } from '../sidebarNavigation';
import { Button, Menu } from 'antd';

interface SiderContentProps {
  setCollapsed: (isCollapsed: boolean) => void;
  admin: boolean;
}

const sidebarNavFlat = sidebarNavigation.reduce(
  (result: SidebarNavigationItem[], current) =>
    result.concat(current.children && current.children.length > 0 ? current.children : current),
  [],
);

const SiderMenu: React.FC<SiderContentProps> = ({ setCollapsed, admin }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [newNav, setNewNav] = useState<any>([]);
  useEffect(() => {
    {
      const getData: any = localStorage.getItem('UserData');
      const objDate = JSON.parse(getData);
      let ThatAdmin = true;
      if (getData != null) {
        const isAdmin = objDate.role === 'admin' ? true : false;
        ThatAdmin = isAdmin;
        console.log(objDate, isAdmin);
      }
      const navTemp: any = [];
      sidebarNavigation.forEach((nav) => {
        console.log(123, admin, nav.adminCheck);
        if (nav.adminCheck) {
          if (objDate.role === 'admin' ? true : false) {
            navTemp.push(nav);
          }
        } else navTemp.push(nav);
      });
      console.log(navTemp);

      setNewNav(navTemp);
    }
  }, []);
  const currentMenuItem = sidebarNavFlat.find(({ url }) => url === location.pathname);
  const defaultSelectedKeys = currentMenuItem ? [currentMenuItem.key] : [];

  const openedSubmenu = sidebarNavigation.find(({ children }) =>
    children?.some(({ url }) => url === location.pathname),
  );
  const defaultOpenKeys = openedSubmenu ? [openedSubmenu.key] : [];

  return (
    <S.Menu
      mode="inline"
      defaultSelectedKeys={defaultSelectedKeys}
      defaultOpenKeys={defaultOpenKeys}
      onClick={() => setCollapsed(true)}
      items={sidebarNavigation.map((nav) => {
        const isSubMenu = nav.children?.length;

        return {
          key: nav.key,
          title: t(nav.title),
          label: isSubMenu ? t(nav.title) : <Link to={nav.url || ''}>{t(nav.title)}</Link>,
          icon: nav.icon,
          children:
            isSubMenu &&
            nav.children &&
            nav.children.map((childNav) => ({
              key: childNav.key,
              label: <Link to={childNav.url || ''}>{t(childNav.title)}</Link>,
              title: t(childNav.title),
            })),
        };
      })}
    />
  );
};

export default SiderMenu;
