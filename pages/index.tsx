import type { NextPage } from "next";
import { FormEvent, useState } from "react";
import Image from "next/image";

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
    <div>
      <form onSubmit={onSubmitHandler}>
        <input type="text" onChange={(event) => setText(event.target.value)} />
        <button type="submit">Get</button>
        {pic === "" ? (
          <></>
        ) : (
          <div>
            <Image src={pic} alt="pic" height={100} width={160} />
          </div>
        )}
      </form>
    </div>
  );
};

export default Home;
