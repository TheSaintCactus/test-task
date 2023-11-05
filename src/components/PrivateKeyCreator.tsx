import Worker from "./Worker.worker";
import React, { useEffect, useState } from "react";
const TronWeb = require("tronweb");
const HttpProvider = TronWeb.providers.HttpProvider;

export const AccountCreator = () => {
  const [newAcc, setNewAcc] = useState<any>();
  const [suffix, setSuffix] = useState<string>("");
  const [workers, setWorkers] = useState<Worker[]>([]);

  const [triggerTerminate, setTriggerTerminate] = useState<boolean>(false);

  useEffect(() => {
    if (triggerTerminate) {
      workers.forEach((worker: Worker) => {
        worker.terminate();
      });
    }
  }, [triggerTerminate]);

  const FULL_NODE_URL = "https://nile.trongrid.io";
  const SOLIDITY_NODE_URL = "https://nile.trongrid.io";
  const EVENT_SERVER_URL = "https://nile.trongrid.io";
  const tronWeb = new TronWeb(
    new HttpProvider(FULL_NODE_URL),
    new HttpProvider(SOLIDITY_NODE_URL),
    EVENT_SERVER_URL
  );

  const generateAccount = async () => {
    //@ts-ignore
    const worker = new Worker();
    setWorkers([...workers, worker]);
    worker.postMessage(suffix);
    worker.onmessage = endFinder;
    console.log(worker);
    // const newAcc = await tronWeb.createAccount();
    // setNewAcc(newAcc);
    // const suffixArr = suffix.split(" ");

    // for (let i = 0; i < suffixArr.length; i++) {
    //   const suffix = suffixArr[i];
    //   if ((newAcc?.address.base58 as string).endsWith(suffix)) {
    //     console.log("FOUND", newAcc?.address.base58, suffix);
    //     return;
    //   }
    // }

    // console.log("NOT FOUND", newAcc?.address.base58, suffixArr);

    // setTimeout(() => {
    //   generateAccount();
    // }, 10);
  };

  const endFinder = (message: any) => {
    setNewAcc(message.data);
    setTriggerTerminate(true);
    workers.forEach((worker: Worker) => {
      console.log("terminate");
      worker.terminate();
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div>
        {workers.length !== 0 && "Активно потоков" + " " + workers.length}{" "}
      </div>
      Введите желаемый суффикс
      <input
        placeholder="укажите желаемые суффиксы через пробел"
        onChange={(e) => setSuffix(e.target.value)}
      />
      <button
        type="submit"
        onClick={async (e) => {
          generateAccount();
        }}
      >
        {workers.length !== 0 ? "Добавить поток" : "Сгенерировать ключ"}
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          gap: "40px",
        }}
      >
        <div>
          {newAcc?.privateKey && "Адрес кошелька:"}
          <div>{newAcc?.privateKey}</div>

          <div>{newAcc?.address.base58}</div>
        </div>
      </div>
    </form>
  );
};
