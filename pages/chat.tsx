import { NextPage } from "next";
import { useState, useEffect, FC } from "react";
import { useForm } from "react-hook-form";

import { useAppContext } from "../state";
import { NavBarChat } from "../components/Navbar-chat";
import Link from "next/link";

import { FiSend } from "react-icons/fi";
import { VscTriangleDown } from "react-icons/vsc";
import styles from "../styles/chat.module.scss";

interface Props {}

interface Message {
  content: string;
  sender: string;
  reciever: string;
}
interface response {
  error: string | undefined;
  message: Message | undefined;
}

interface getMsgResponse {
  error: string | undefined;
  message: Message[] | undefined;
}
interface ConectedUsers {
  name: string;
  id: string;
  email: string;
  lastMessage: string;
}

const Chat: FC<Props> = () => {
  const { user, setUser, socket } = useAppContext();

  const [messages, setMessages] = useState<Message[]>([]);
  const [conectedUsers, setConectedUsers] = useState<ConectedUsers[]>([]);
  const [reciever, setReciever] = useState<string>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting, isValid },
  } = useForm<Message>({ mode: "onChange" });

  // in case of not logedin user gets access to this page
  useEffect(() => {
    socket.on("connection_error", (err) => {
      console.log("connect error plz login", err);
    });
  }, [socket]);

  useEffect(() => {
    socket.emit("connect to server", (users: ConectedUsers[], client: any) => {
      setUser(client);

      users = users.filter((el) => el.id !== user?.id);
      setConectedUsers(users);
    });
  }, [setUser, socket, user?.id]);
  // if I recieve a message
  // ! check if this works properly
  useEffect(() => {
    socket.on("private message", (message: Message) => {
      if (reciever === message.sender) {
        //if the selected reciever sends me a message we push it to the visible chat
        let newMessages = [...messages];
        newMessages.push(message);
        setMessages(newMessages);
      } else {
        //else another user sent me a message
        //so it should not apper in the chat but rather as a notification on the user =>(chats)
        setConectedUsers((prev) => {
          const [sender] = prev.filter((el) => el.id === message.sender);
          const userArr = prev.filter((el) => el.id !== message.sender);
          sender.lastMessage = message.content;
          return [sender, ...userArr];
        });
      }
    });
  }, [messages, reciever, socket]);

  // get the active users and set the client data in case of refreshing the page
  useEffect(() => {
    socket.on("user connecting", (users) => {
      console.log(users);
      setConectedUsers(users);
    });
  }, [socket, reciever]);

  //todo: get messages for the selected chat (backend now)
  const selectUser = (selectedUser: ConectedUsers) => {
    const payload = {
      id: selectedUser.id,
    };

    setReciever(selectedUser.email);
    socket.emit("get previous messages", payload, (res: getMsgResponse) => {
      if (res.error) return console.log(res.error);
      setMessages(() => {
        const prevMessages = res.message as Message[];
        return prevMessages;
      });
    });
  };
  // send the message
  const SubmitMessage = (data: any) => {
    const payload = {
      email: reciever,
      message: data.content,
    };
    socket.emit("private message", payload, (res: response) => {
      if (res.error) return console.error(res.error); //! implement the error for this
      let newMessages = [...messages, res.message as Message];
      setMessages(newMessages);
      console.log("112", messages);
    });
    reset();
  };

  return (
    <>
      <NavBarChat />

      <div className={styles.container}>
        <div className={styles.usersWrapper}>
          <h2>
            Chats
            <VscTriangleDown />
          </h2>
          <div className={styles.filters}>
            <span>new</span>
            <span>favorites</span>
            <span>friends</span>
          </div>
          <div className={styles.cardsWrapper}>
            {conectedUsers.map((element) => {
              return (
                <div
                  key={element.id}
                  onClick={() => selectUser(element)}
                  className={styles.card}
                >
                  {
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src="user.jpg" alt="user-img" />
                  }
                  <div className={styles.cardDetails}>
                    <h4>{element.name}</h4>
                    <p>{element.lastMessage}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.breakLine}></div>
        </div>
        <div className={styles.chatWrapper}>
          <h2>john doe</h2>
          <div className={styles.chat}>
            <div className={styles.messagesWrapper}>
              {messages.map((message, index) => {
                if (message.sender === user!.id) {
                  return (
                    <div
                      key={index}
                      className={`${styles.messageClient} ${styles.red}`}
                    >
                      <p>{message.content}</p>
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className={styles.messageSender}>
                      {
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src="./user.jpg" alt="user-img" />
                      }
                      <p>{message.content}</p>
                    </div>
                  );
                }
              })}
            </div>
            <form onSubmit={handleSubmit(SubmitMessage)}>
              <input
                placeholder="type your message"
                type="text"
                {...register("content")}
              />
              <button
                className={!reciever ? styles.disabledBtn : undefined}
                disabled={!reciever}
              >
                send <FiSend />
              </button>
            </form>
          </div>
        </div>

        <div className={styles.chatUsers}>
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img src="user.jpg" alt="user-img" />
          }
          <h2>john doe</h2>
          <p>an engenieer at google</p>
        </div>
      </div>
    </>
  );
};

export default Chat;
