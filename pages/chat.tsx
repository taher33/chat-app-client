import { NextPage } from "next";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { useAppContext } from "../state";
import { NavBar } from "../components/NavBar";
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
}

const Chat: NextPage<Props> = () => {
  const { user, socket } = useAppContext();

  const [messages, setMessages] = useState<Message[]>([]);
  const [conectedUsers, setConectedUsers] = useState<ConectedUsers[]>([]);
  const [reciever, setReciever] = useState<string>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting, isValid },
  } = useForm<Message>({ mode: "onChange" });
  console.log(conectedUsers);
  console.log(reciever);
  // in case of not logedin user gets access to this page
  useEffect(() => {
    socket.on("connect_error", (err) => {
      console.log("connect error plz login", err);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("user connecting", (users) => {
      setConectedUsers(users);
    });
  }, [socket]);
  // if I recieve a message
  // ! check if this works properly
  useEffect(() => {
    socket.on("private message", (message) => {
      setMessages((prev) => {
        prev.push(message!);
        return prev;
      });
    });
  }, [socket]);

  // get the active users for now
  useEffect(() => {
    socket.on("user connecting", (users) => {
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
      if (res.error) return; //! implement the error for this
      const message = res.message;
      setMessages((prev) => {
        prev.push(message!);
        return prev;
      });
    });
    reset();
  };

  return (
    <>
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
                    <p>hey dude u good ...</p>
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
              <button>
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
