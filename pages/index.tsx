import type { NextPage } from "next";
import { FormEvent, useState } from "react";
import Image from "next/image";
import styles from "../styles/Main.module.css";

const Home: NextPage = () => {
  const [text, setText] = useState("");
  const [pic, setPic] = useState("");
  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const data = await (await fetch(`/api/bili/${text}`)).json();
      setPic(data.data.pic);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bilibili 封面获取</h1>
      <form onSubmit={onSubmitHandler} className={styles.form}>
        <input
          type="text"
          onChange={(event) => setText(event.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Get
        </button>
      </form>
      {pic && (
        <div className={styles.result}>
          <Image src={pic} alt="pic" height={250} width={400} />
        </div>
      )}
      {pic && (
        <div className={styles.notice}>
          <a href={pic} target="_blank" rel="noreferrer">
            {pic}
          </a>
        </div>
      )}
    </div>
  );
};

export default Home;
