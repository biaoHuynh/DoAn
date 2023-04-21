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
        } else {
          if (objDate.role === 'admin' ? false : true) {
            navTemp.push(nav);
          }
        }
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
    >
      {newNav.map((nav: any) =>
        nav.children && nav.children.length > 0 ? (
          <Menu.SubMenu
            key={nav.key}
            title={t(nav.title)}
            icon={nav.icon}
            onTitleClick={() => setCollapsed(false)}
            popupClassName="d-none"
          >
            {nav.children.map((childNav: any) => (
              <Menu.Item key={childNav.key} title="">
                <Link to={childNav.url || ''}>{t(childNav.title)}</Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={nav.key} title="" icon={nav.icon}>
            <Link to={nav.url || ''}>{t(nav.title)}</Link>
          </Menu.Item>
        ),
      )}
    </S.Menu>
  );
};

export default SiderMenu;
