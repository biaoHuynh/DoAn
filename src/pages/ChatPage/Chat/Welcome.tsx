import styled from 'styled-components';
import HelloImage from '@app/assets/hello.gif';
import { useTranslation } from 'react-i18next';
interface WelcomeProps {
  currentUsername: string;
}

const Welcome: React.FC<WelcomeProps> = ({ currentUsername }) => {
  const { t } = useTranslation();
  return (
    <Container>
      <img src={HelloImage} alt="Dog saying Hi!" />
      <h1>
        {t('vb.welcome')}, <span>{currentUsername}!</span>
      </h1>
      <h3>{t('vb.selectchat')}</h3>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  text-align: center;
  position: relative;
  .logoutButton {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
  }
  img {
    height: 13rem;
    @media screen and (min-width: 720px) {
      height: 20rem;
    }
  }
  span {
    color: rgb(255, 82, 161);
  }
`;

export default Welcome;
