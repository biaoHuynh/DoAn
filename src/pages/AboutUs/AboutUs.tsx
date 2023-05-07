import React, { useEffect, useState } from 'react';

import { Card } from 'components/common/Card/Card';
import AdminImg from '@app/assets/AdminAboutUs.png';
import NormalImg from '@app/assets/NormalAboutUs.png';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';

const AboutUs: React.FC = () => {
  const [admin, setAdmin] = useState<boolean>(false);
  useEffect(() => {
    {
      const getData: any = localStorage.getItem('UserData');

      if (getData != null) {
        const isAdmin = getData.role === 'admin' ? true : false;
        setAdmin(isAdmin);
      }
    }
  }, []);
  return (
    <>
      <PageTitle>About Us</PageTitle>

      <Card bodyStyle={{ display: 'flex', justifyContent: 'center' }}>
        {admin ? <img src={AdminImg} /> : <img src={NormalImg} />}
      </Card>
    </>
  );
};

export default AboutUs;
