import { useEffect, useState } from 'react';
import { ExpertInfo } from './ProfilePage';

const ExpertInfoPage: React.FC<ExpertInfo> = ({ jobTitle, specialist, workPlace, rating }) => {
  const [expertInfo, setExpertInfo] = useState({ jobTitle, specialist, workPlace, rating });

  return (
    <>
      <div>
        <ul>
          {expertInfo.jobTitle && <li>{expertInfo.jobTitle}</li>}
          {expertInfo.specialist && <li>{expertInfo.specialist}</li>}
          {expertInfo.workPlace && <li>{expertInfo.workPlace}</li>}
          {expertInfo.rating && <li>{expertInfo.rating}</li>}
        </ul>
      </div>
    </>
  );
};

export default ExpertInfoPage;
