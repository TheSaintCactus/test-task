import Web3 from "web3";
import { ethers } from "ethers";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

const cardStyle = {
  border: "1px solid #ccc",
  backgroundColor: "#3b3b3b",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px",
  fontSize: '14px',
};

export const ScanBlocks = () => {
  const START_BLOCK_NUMBER = 8580905; // Номер блока, с которого начнется сканирование
  const WALLETS_ARRAY = [
    "0xD351C7D7bC0a5fDE9e29C7549f50555811251189",
    "0xd7509126f8a3A5ed3a612C0bF9dd8cf36a51EEcE",
    "0x4D4eEF05131439C9334b7861989B0a01471a1a98",
  ]; // Коши которые ищем

  const [isContinues, setIsContinues] = useState(false);
  const [hashArr, setHashArr] = useState<any>([]);
  const [contracts, setContracts] = useState([]);
  const [blockIndex, setBlockIndex] = useState(START_BLOCK_NUMBER)
const [latestBlock, setLatestBlock] = useState(0)
  

  const web3 = new Web3(
    "https://alien-quaint-thunder.ethereum-goerli.discover.quiknode.pro/14191b401f7502238a019e909890d6779a4ce5b9/"
  );


  const usdcAbi = [
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [
        {
          name: "",
          type: "uint8",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "_owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          name: "balance",
          type: "uint256",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_to",
          type: "address",
        },
        {
          name: "_value",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      type: "function",
    },
  ];


  useEffect(() => {
    (async () => {
    const latestBlockNumber = await web3.eth.getBlockNumber();
    setLatestBlock(latestBlockNumber)
  })()
  }, [])

  const scanBlocks = async (blockIndex: number, walletsArr: String[]) => {
    if (!isContinues) {
      return
    }  
      const block = await web3.eth.getBlock(blockIndex, true);

      if (block != null && block.transactions != null) {
        // Проверяем, что блок не пустой и содержит транзакции
        for (let j = 0; j < block.transactions.length; j++) {
          // Итерируемся по транзакциям в блоке
          const tx = block.transactions[j];

          if (walletsArr.includes(tx.from) || tx.to && walletsArr.includes(tx.to)) {

            if (tx.input !== "0x") {
              //@ts-ignore
              const contractInstance = await new web3.eth.Contract(
                //@ts-ignore
                usdcAbi,
                tx.to && walletsArr.includes(tx.to) ? tx.from : tx.to
              );
              const name = await contractInstance.methods.name().call();
              const decimals = await contractInstance.methods.decimals().call();
              //@ts-ignore
              const methodAbi = usdcAbi.find(
                (method) => method.name === "transfer"
              );
              //@ts-ignore
              const { 0: to, 1: value } =
                methodAbi &&
                web3.eth.abi.decodeParameters(
                  methodAbi.inputs,
                  tx.input.slice(10)
                );

              const body = {
                name: "KlavicusVail",
                address_from: tx.from,
                address_to: to,
                transaction_amount: value / 10 ** decimals,
                contract_address: tx.to,
                is_native_coin: false,
                block_number: tx.blockNumber,
                is_withdrawal: false,
              };
              const rawRes = await fetch("https://money-for-monkey.kukrsibestponel.ru", {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  "mode": 'no-cors'
                },
                method: 'POST',
              body: JSON.stringify(body)
              })
              const res = await rawRes.json();
              setHashArr((hashArr: any) => [
                ...hashArr,
                { ...body, name, hash: tx.hash, result: res.detail },
              ]);
            }
            if (tx.input === "0x") {
              const body = {
                name: "KlavicusVail",
                address_from: tx.from,
                address_to: tx.to,
                transaction_amount: +tx.value / 10 ** 18,
                is_native_coin: true,
                block_number: tx.blockNumber,
                is_withdrawal: false,
              };

              if (walletsArr.includes(tx.from)) {
                body.is_withdrawal = false;
              }
              if (tx.to && walletsArr.includes(tx.to)) {
                body.is_withdrawal = true;
              }
              const rawRes = await fetch("https://money-for-monkey.kukrsibestponel.ru", {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                method: 'POST',
              body: JSON.stringify(body)
              })
              const res = await rawRes.json();
              setHashArr((hashArr: any) => [
                ...hashArr,
                { ...body, name: "ETH", hash: tx.hash, result: res.detail },
              ]);
              console.log(res)
            }
          }
        }
      }
  };
    let interval: any

  useEffect(() => {

    if (blockIndex != latestBlock) {
      scanBlocks(blockIndex, WALLETS_ARRAY);
      }

    if (blockIndex == latestBlock || !isContinues) {
      clearInterval(interval)   
    }
  }, [isContinues, blockIndex]);

  useEffect(() => {
    if (isContinues) {
      interval = setInterval(() => {
       setBlockIndex((blockIndex) => ++blockIndex )
     }, 100)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isContinues]) 

  return (
    <div>
      <div style={{position: 'absolute', top: '10px', left: '45%'}}>
      {!isContinues && (
        <button onClick={() => setIsContinues(true)}>Начать поиски</button>
      )}
      {isContinues && (
        <button onClick={() => setIsContinues(false)}>Остановить поиски</button>
      )}
      </div>
      <div style={{ display: "flex", gap: "10px", flexDirection: "column", marginTop: '50px' }}>
        {hashArr.map((tx: any) => {
            const { address_from, address_to, block_number, is_native_coin, is_withdrawal, name, transaction_amount } = tx;

          //@ts-ignore
          return (
            <div>
             <a
              style={{ color: "white", textDecoration: 'none'  }}
              //@ts-ignore
              href={`https://goerli.etherscan.io/tx/${tx.hash}`}
            >
            <div style={cardStyle}>
              <div style={{display: 'flex', gap: '30px'}}>
            <div>От кого: {address_from}</div>
            <div>Для кого: {address_to}</div>
            </div>
            <div>{tx.contract_address && 'Адрес контракта:'} {tx.contract_address}</div>
            <div> {transaction_amount} {name}</div>
            <div style={{fontSize: '10px'}}>Результат: {tx.result}</div>
           
            </div> </a>
          </div>
          );
        })}
      </div>
    </div>
  );
};
