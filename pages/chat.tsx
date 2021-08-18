import { NextPage } from "next";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { useAppContext } from "../state";
import Link from "next/link";
import styles from "../styles/main.module.scss";
import { serverEndPoint } from "../constants";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { Socket } from "socket.io-client";

interface Props {}

interface Message {
  content: string;
  fromMe: Boolean;
}
interface msg {
  name: string;
  msg: string;
}

const Chat: NextPage<Props> = () => {
  const { value, setValue, socket } = useAppContext();

  const [messages, setMessages] = useState<Message[]>([]);
  console.log(messages);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting, isValid },
  } = useForm<Message>({ mode: "onChange" });

  useEffect(() => {
    socket.on("message", (msg: any) => {
      setMessages((prev) => [...prev, { content: msg, fromMe: false }]);
    });
    return () => {};
  }, []);

  const SubmitMessage = (data: Message) => {
    socket.emit("message", { name: "yasser", message: data.content });
    reset();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(SubmitMessage)}>
        <label>
          message:
          <input type="text" {...register("content")} />
        </label>
        <button disabled={!isDirty || !isValid || isSubmitting} type="submit">
          submit
        </button>
      </form>

      {messages.map((el, index) => (
        <h4 key={index}>{el.content}</h4>
      ))}
      <Link passHref href="/">
        <h5>home</h5>
      </Link>
    </div>
  );
};

export default Chat;
