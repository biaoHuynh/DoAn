import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import chatService from './ChatService';
import Contacts from './Contacts';
import Welcome from './Welcome';
import ChatContainer from './ChatContainer';

export interface User {
  username: string;
  email: string;
  isAvatarImageSet: boolean;
  _id: string;
  password: string;
  __v?: number;
  avatarImage: string;
}

function Chat() {
  const { state } = useLocation();

  const [contacts, setContacts] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const [currentChat, setCurrentChat] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const setUser = async () => {
      if (!localStorage.getItem('UserData')) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('UserData')!));
      }
    };
    setUser();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
    }
  }, [currentUser]);

  useEffect(() => {
    chatService.getListFriends().then((data: any) => {
      const newdata = data.data;
      if (state) {
        if (newdata) {
          const found = newdata.find((item: any) => item.topicContactId === state.topicContactId);

          if (!found) {
            newdata.unshift({
              topicContactId: state.topicContactId,
              userFriend: { name: state.name, imageUrl: state.imageUrl },
            });
          }
        }

        newdata.map((contact: any, index: any) => {
          if (contact.topicContactId == state.topicContactId) {
            setCurrentChat(contact);
          }
        });
        setContacts(newdata);
      } else {
        setContacts(newdata);
      }
    });
  }, []);

  const handleChatChange = (chat: any) => {
    setCurrentChat(chat);
  };
  const handleChatUpdate = (update: boolean) => {
    if (update) {
      chatService.getListFriends().then((data: any) => {
        const newdata = data.data;
        if (state) {
          if (newdata) {
            const found = newdata.find((item: any) => item.topicContactId === state.topicContactId);

            if (!found) {
              newdata.unshift({
                topicContactId: state.topicContactId,
                userFriend: { name: state.name, imageUrl: state.imageUrl },
              });
            }
          }

          newdata.map((contact: any, index: any) => {
            if (contact.topicContactId == state.topicContactId) {
              setCurrentChat(contact);
            }
          });
          setContacts(newdata);
        } else {
          setContacts(newdata);
        }
      });
    }
  };
  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome currentUsername={currentUser?.username || ''} />
          ) : (
            <ChatContainer
              handleChatUpdate={handleChatUpdate}
              currentChat={currentChat}
              currentUser={currentUser}
              socket={'a'}
            />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: -webkit-fill-available;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: var(--layout-sider-bg-color);
  .container {
    width: 84vw;
    height: 87vh;
    background-color: var(--layout-header-bg-color);
    display: grid;
    grid-template-columns: 20% 80%;

    @media screen and (min-width: 720px) {
      grid-template-columns: 35% 65%;
      grid-template-rows: none;
      width: 84vw;
      height: 87vh;
    }
    @media screen and (min-width: 1100px) {
      grid-template-columns: 28% 72%;
    }
  }
`;

export default Chat;
