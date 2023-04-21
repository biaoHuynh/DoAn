import { useEffect, useState } from 'react';
import { ExpertInfo } from './ProfilePage';

const ExpertInfoPage: React.FC<ExpertInfo> = ({ jobTitle, specialist, workPlace, rating, descriptions }) => {
  const [expertInfo, setExpertInfo] = useState({ jobTitle, specialist, workPlace, rating, descriptions });

  const descriptionRender = (des: Map<string, string[]>) => {
    console.log(Object.keys(des));

    let keys = Array.from(Object.keys(des));

    return keys.map((key: string) => {
      const keyStr = `<li>${key}</li>`;
      const descriptionsByKey = des[key];
      return (
        <>
          <li>{key}</li>
          <li>
            <ul>
              {descriptionsByKey?.map((description) => {
                return <li>{description}</li>;
              })}
            </ul>
          </li>
        </>
      );
    });
  };

  return (
    <>
      <div>
        <ul>
          {expertInfo.jobTitle && <li>{expertInfo.jobTitle}</li>}
          {expertInfo.specialist && <li>{expertInfo.specialist}</li>}
          {expertInfo.workPlace && <li>{expertInfo.workPlace}</li>}
          {expertInfo.rating && <li>{expertInfo.rating}</li>}
          {expertInfo.descriptions && descriptionRender(expertInfo.descriptions)}
        </ul>
      </div>
    </>
  );
};

export default ExpertInfoPage;
