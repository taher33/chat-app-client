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
  user: string;
}
interface msg {
  name: string;
  msg: string;
}
const me = "1";
const Chat: NextPage<Props> = () => {
  const { value, setValue, socket } = useAppContext();

  const [messages, setMessages] = useState<Message[]>([
    {
      content: "hey dude",
      user: "2",
    },
    {
      content: "u there ?",
      user: "2",
    },
    {
      content:
        "hey dude hey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dude",
      user: "1",
    },
    {
      content:
        "hey dude hey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dude",
      user: "1",
    },
    {
      content:
        "hey dude hey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dude",
      user: "1",
    },
    {
      content:
        "hey dude hey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dude",
      user: "1",
    },
    {
      content:
        "hey dude hey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dude",
      user: "1",
    },
    {
      content:
        "hey dude hey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dude",
      user: "1",
    },
    {
      content:
        "hey dude hey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dude",
      user: "1",
    },
    {
      content:
        "hey dude hey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dude",
      user: "1",
    },
    {
      content:
        "hey dude hey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dude",
      user: "1",
    },
    {
      content:
        "hey dude hey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dudehey dude",
      user: "1",
    },
  ]);
  console.log(messages);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting, isValid },
  } = useForm<Message>({ mode: "onChange" });

  useEffect(() => {
    socket.on("message", (msg: any) => {
      setMessages((prev) => [...prev, { content: msg, user: "1" }]);
    });
    return () => {};
  }, [socket]);

  const SubmitMessage = (data: Message) => {
    socket.emit("message", { name: "yasser", message: data.content });
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
            <div className={styles.card}>
              {
                // eslint-disable-next-line @next/next/no-img-element
                <img src="user.jpg" alt="user-img" />
              }
              <div className={styles.cardDetails}>
                <h4>john Doe</h4>
                <p>hey dude u good ...</p>
              </div>
            </div>
            <div className={styles.card}>
              {
                // eslint-disable-next-line @next/next/no-img-element
                <img src="user.jpg" alt="user-img" />
              }
              <div className={styles.cardDetails}>
                <h4>john Doe</h4>
                <p>hey dude u good ...</p>
              </div>
            </div>
          </div>
          <div className={styles.breakLine}></div>
        </div>
        <div className={styles.chatWrapper}>
          <h2>john doe</h2>
          <div className={styles.chat}>
            <div className={styles.messagesWrapper}>
              {messages.map((message, index) => {
                if (message.user === me) {
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
            <form>
              <input placeholder="type your message" type="text" />
              <button onClick={(e) => e.preventDefault()}>
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
