import React, { useEffect, useState } from 'react';
import { BasicTable } from '../BasicTable/BasicTable';
import { useTranslation } from 'react-i18next';
import * as S from './Tables.styles';
import { PointHistoryTable } from '../PointModal/PointHistory';

export const UserManagement: React.FC = () => {
  const { t } = useTranslation();
  const [admin, setAdmin] = useState<boolean>(false);

  useEffect(() => {
    const getData: any = localStorage.getItem('UserData');
    const objDate = JSON.parse(getData);

    if (getData != null) {
      const isAdmin = objDate.role === 'admin' ? true : false;
      setAdmin(isAdmin);
      console.log(objDate, isAdmin);
    }
  }, []);
  return (
    <>
      <S.TablesWrapper>
        <S.Card id="basic-table" title={'User Management'} padding="1.25rem 1.25rem 0">
          {admin ? <BasicTable /> : <div />}
          {admin ? <div /> : <PointHistoryTable />}
        </S.Card>
      </S.TablesWrapper>
    </>
  );
};
