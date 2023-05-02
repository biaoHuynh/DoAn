import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import chatService from './ChatService';
import ChatInput from './ChatInput';
import { v4 as uuidv4 } from 'uuid';
import loading from '@app/assets/loader.gif';
import moment from 'moment';
import 'moment/locale/vi';
import {
  StompSessionProvider,
  useStompClient,
  useSubscription,
  withStompClient,
  withSubscription,
} from 'react-stomp-hooks';

import defaultAvatar from '@app/assets/DefaultAvatar.png';

interface ChatContainerProps {
  currentChat: any;
  currentUser: User | undefined;
  socket: any;
  topicContactId: any;
}
export interface Message {
  fromSelf: boolean;
  content: string;
  image?: string;
  user: User | undefined;
  isFile: boolean;
}

export interface User {
  username: string;
  email: string;
  isAvatarImageSet: boolean;
  id: string;
  password: string;
  __v?: number;
  avatarImage: string;
  topicId: string;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<Message>();
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stompClient = useStompClient();

  function daysIntoYear(date: Date) {
    return (
      (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) /
      24 /
      60 /
      60 /
      1000
    );
  }

  useEffect(() => {
    const getMsg = async () => {
      if (currentChat && currentUser) {
        const response = await chatService.getAllMessages(currentChat.topicContactId);
        response.data?.map((item: Message) => {
          if (item?.user?.id === currentUser?.id) {
            item.fromSelf = true;
          }
        });
        setMessages(response.data);
      }
      setIsLoading(false);
    };
    getMsg();
    //
  }, [currentChat, currentChat._id, currentUser]);

  useSubscription(`/topic/chat/${currentChat.topicContactId}`, (message: any) => {
    const body = JSON.parse(message.body);
    console.log(body);
    if (body.data.isFile) {
      setArrivalMessage({
        fromSelf: body.data.user.id === currentUser?.id ? true : false,
        content: '',
        image: `http://localhost:8081/local-store/${body.data.content}`,
        user: body.data.user.id,
      });
    } else {
      setArrivalMessage({
        fromSelf: body.data.user.id === currentUser?.id ? true : false,
        content: body.data.content,
        user: body.data.user.id,
      });
    }
  });
  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-recieve', (msg: string) => {
        console.log(msg);
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (msg: string, image: string) => {
    console.log(image, msg);

    if (currentUser) {
      if (stompClient) {
        //Send Message
        if (image === '' || image === null) {
          stompClient.publish({
            destination: '/app/chat/' + currentChat.topicContactId,
            body: JSON.stringify({
              userId: currentUser.id,
              content: msg,
              chatParent: null,
              isFile: false,
            }),
          });
        } else {
          console.log(JSON.stringify({ userId: currentUser.id, content: image, chatParent: null, isFile: true }));
          stompClient.publish({
            destination: '/app/chat/' + currentChat.topicContactId,
            body: JSON.stringify({ userId: currentUser.id, content: image, chatParent: null, isFile: Boolean(true) }),
          });
        }
      }
    }

    //setMessages((msgs) => [...msgs, { fromSelf: true, content: msg, image, user: currentUser }]);
  };

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={
                currentChat?.userFriend?.imageUrl
                  ? `http://localhost:8081/local-store/${currentChat?.userFriend?.imageUrl}`
                  : defaultAvatar
              }
              alt="current Chat avatar"
            />
          </div>
          <div className="username">
            <h3>{currentChat?.userFriend?.name}</h3>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="loading-messages">
          <img src={loading} alt="loader" className="loader" />
        </div>
      ) : (
        <div className="chat-messages">
          {messages?.map((message, index, messages) => {
            const dateCurrentMessage = new Date(message.createAt);
            const dateNow = new Date();
            let isPaging = false;
            let timeDeplay = '';
            if (index > 0) {
              const datePreviousMessage = new Date(messages[index - 1].createAt);
              isPaging = dateCurrentMessage.getTime() - datePreviousMessage.getTime() >= 7200000;
            }
            if (isPaging) {
              const nowDay = daysIntoYear(dateNow);
              const currentMessageDay = daysIntoYear(dateCurrentMessage);
              if (nowDay - currentMessageDay == 0) {
                timeDeplay = moment(dateCurrentMessage).locale('vi').format('hh:mm');
              } else if (nowDay - currentMessageDay > 0 && nowDay - currentMessageDay <= 7) {
                timeDeplay = moment(dateCurrentMessage).locale('vi').format('dddd hh:mm');
              } else {
                timeDeplay = moment(dateCurrentMessage).locale('vi').format('hh:mm, DD MMMM YYYY');
              }
            }
            if (message.isFile) {
              return (
                <>
                  <div style={{ margin: 'auto', padding: '5px 0' }}>{isPaging && timeDeplay}</div>
                  <div ref={scrollRef} key={uuidv4()}>
                    <div className={`message ${message.fromSelf ? 'sended' : 'recieved'}`}>
                      {message.content && (
                        <div className="content-image">
                          <img src={`http://localhost:8081/local-store/${message.content}`} alt="sended" />
                        </div>
                      )}
                    </div>
                  </div>
                </>
              );
            }
            return (
              <>
                <div style={{ margin: 'auto', padding: '5px 0' }}>{isPaging && timeDeplay}</div>
                <div ref={scrollRef} key={uuidv4()}>
                  <div className={`message ${message.fromSelf ? 'sended' : 'recieved'}`}>
                    {message.content && (
                      <div className="content ">
                        <p>{message.content}</p>
                      </div>
                    )}
                    {message.image && (
                      <div className="content-image">
                        <img src={message.image} alt="sended" />
                      </div>
                    )}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      )}
      <ChatInput handleSendMessage={handleSendMessage} />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  /* gap: 0.1rem; */
  overflow: hidden;
  border-left: 1px black solid;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    border-bottom: 1px solid #ffffff15;
    -webkit-box-shadow: 0px 17px 20px -26px rgba(66, 68, 90, 1);
    -moz-box-shadow: 0px 17px 20px -26px rgba(66, 68, 90, 1);
    box-shadow: 0px 17px 20px -26px rgba(66, 68, 90, 1);
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3.1rem;
        }
      }
      .username {
        h3 {
          color: var(--text-main-color);
        }
      }
    }
    @media screen and (min-width: 720px) {
      .avatar {
        img {
          height: 3rem;
        }
      }
    }
  }

  .loading-messages {
    text-align: center;
    margin-top: 35vh;
    img {
      width: 120px;
      height: 120px;
    }
  }

  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 70%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 0.9rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) {
          max-width: 50%;
          font-size: 1.1rem;
        }
      }
      .content-image {
        max-width: 70%;
        /* justify-self: flex-end; */
        img {
          max-width: 300px;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: rgb(255, 82, 161);
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: rgb(0, 135, 255);
      }
    }
  }
  @media screen and (max-width: 900px) and (orientation: landscape) {
    grid-template-rows: 15% 70% 15%;

    .chat-header {
      .user-details {
        .avatar {
          img {
            height: 2.6rem;
          }
        }
      }
    }
  }
`;

export default ChatContainer;
