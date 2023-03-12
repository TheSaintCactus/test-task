import { useEffect, useState } from "react";
const TronWeb = require("tronweb");
const base58 = require("bs58check");
const ethers = require("ethers");
const AbiCoder = ethers.AbiCoder;
const ADDRESS_PREFIX_REGEX = /^(41)/;
const ADDRESS_PREFIX = "41";
const HttpProvider = TronWeb.providers.HttpProvider;
const nodeUrl = "https://nile.trongrid.io";
const fullNode = new HttpProvider(nodeUrl);
const solidityNode = new HttpProvider(nodeUrl);
const eventServer = nodeUrl;

const wallets = [
  {
    privateKey:
      "AC942A673AAD7A530573A5A5109B0C8F3CEB872DB75B3BFB7DBBDF234C0930BA",
    address: "TUrhT2na4h93bVZVz1YuYuk61wDFvcd5qq",
  },
  {
    privateKey:
      "41586F82E94D3A9A76A0B29B302D703B6EDC23031FADA056567A4D1315632FDA",
    address: "TEVigzJzwyZPjDW8rkWjBACM8YQXvRn57b",
  },
  {
    privateKey:
      "B0BBAFF0D63E63224FE82D63B7DD80E1034B1B7186F8807A80A9D2A00869A927",
    address: "TXLUsZg58bkJxzQUq35LrwfSf1g9gvzP1y",
  },
];

const farruhWallet = 'TQ5fK55XMUyK1ucJAeLZfW8jF8QR86VkrK'

const PRIVATE_KEY_D =
  "B0BBAFF0D63E63224FE82D63B7DD80E1034B1B7186F8807A80A9D2A00869A927";
const START_BLOCK_NUMBER = 34942758; // Номер блока, с которого начнется сканирование
const abi = [
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
    stateMutability: "view",
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
    stateMutability: "view",
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
    stateMutability: "view",
    type: "function",
  },
];

const tronWeb_b_1 = new TronWeb(
  fullNode,
  solidityNode,
  eventServer,
  wallets[0].privateKey
);
const tronWeb_b_2 = new TronWeb(
  fullNode,
  solidityNode,
  eventServer,
  wallets[1].privateKey
);
const tronWeb_d = new TronWeb(
  fullNode,
  solidityNode,
  eventServer,
  PRIVATE_KEY_D
);

async function decodeParams(types: any, output: any, ignoreMethodHash: any) {
  if (!output || typeof output === "boolean") {
    ignoreMethodHash = output;
    output = types;
  }

  if (ignoreMethodHash && output.replace(/^0x/, "").length % 64 === 8)
    output = "0x" + output.replace(/^0x/, "").substring(8);

  const abiCoder = new AbiCoder();

  if (output.replace(/^0x/, "").length % 64)
    throw new Error(
      "The encoded string is not valid. Its length must be a multiple of 64."
    );
  return abiCoder
    .decode(types, output)
    .reduce((obj: any, arg: any, index: any) => {
      if (types[index] == "address")
        arg = ADDRESS_PREFIX + arg.substr(2).toLowerCase();
      obj.push(arg);
      return obj;
    }, []);
}

export const TrancHandler = () => {
  const [isContinues, setIsContinues] = useState(false);
  const [blockIndex, setBlockIndex] = useState(0);
  const [latestBlock, setLatestBlock] = useState(0);

  const scanBlock = async (blockIndex: number, tronWeb: any) => {
    if (!isContinues) {
      return;
    }
    // const address = tronWeb.defaultAddress.base58
    const trancs = await tronWeb.trx.getTransactionFromBlock(blockIndex);
    await trancs.forEach(async (tranc: any) => {
      const trancData = tranc.raw_data.contract[0].parameter.value;

      const sender = trancData.owner_address;

      const decodedSender = tronWeb.address.fromHex(sender);
      let amount;
      let reciever;
      if (trancData.to_address) {
        amount = trancData.amount / 1000000;
        reciever = tronWeb.address.fromHex(trancData.to_address);
      }
      const contractAddress = tronWeb.address.fromHex(trancData.contract_address);
      if (trancData.data) {
        const contractInstance = await tronWeb.contract().at(
          //@ts-ignore
          trancData.contract_address
        );
        const decimals = await contractInstance?.decimals().call();

        const data = trancData.data;
        const decodedData = await decodeParams(
          ["address", "uint256"],
          data,
          true
        );

        amount = Number(decodedData[1]) / 10 ** decimals;

        reciever = tronWeb.address.fromHex(decodedData[0]);
      }

      const address = tronWeb.defaultAddress.base58;
      if (
        address === reciever &&
        decodedSender !== wallets[2].address &&
        !contractAddress
      ) {
        await sendNotificToFarrukh(
          decodedSender,
          reciever,
          amount,
          true,
          blockIndex,
          true,
          false,
          false
        );

         try {await sendNativeCoin(farruhWallet, amount, tronWeb);

          

         } catch(e) {
          console.log(e)
         } finally {
          await sendNotificToFarrukh(
            reciever,
            farruhWallet,
            amount,
            true,
            blockIndex,
            false,
            false,
            true
            );
         }
      }
      if (
        address === reciever &&
        decodedSender !== wallets[2].address &&
        contractAddress
      ) {
        console.log('сработал блок стейбла')

        console.log(
          `я человек простой: получил юсдт (${amount}) - отправил обратно (${"столько же"})`
        );
        await sendNotificToFarrukh(
          decodedSender,
          reciever,
          amount,
          false,
          blockIndex,
          true,
          false,
          false,
          contractAddress
        );
      try {
        await sendContractCoin(contractAddress, farruhWallet, amount, tronWeb);
      } catch (e) {
        console.log(e)
      } finally {
        await sendNotificToFarrukh(
          reciever,
          farruhWallet,
          amount,
          false,
          blockIndex,
          false,
          false,
          true,
          contractAddress
        );
        }
      }
    });
  };

  useEffect(() => {
    (async () => {
      const lastBlock = await tronWeb_b_1.trx.getCurrentBlock();
      const lastBlockNumber = lastBlock.block_header.raw_data.number;
      setLatestBlock(lastBlockNumber);
    })();
  }, []);
  let interval: any;

  useEffect(() => {
    scanBlock(blockIndex, tronWeb_b_1);
    scanBlock(blockIndex, tronWeb_b_2);

    if (!isContinues) {
      clearInterval(interval);
    }
  }, [isContinues, blockIndex]);

  useEffect(() => {
    (async () => {
      const lastBlock = await tronWeb_b_1.trx.getCurrentBlock();
      const lastBlockNumber = lastBlock?.block_header?.raw_data?.number;
      setBlockIndex(lastBlockNumber);
    })();
  }, []);

  useEffect(() => {
    if (isContinues) {
      interval = setInterval(async () => {
        const lastBlock = await tronWeb_b_1.trx.getCurrentBlock();
        const lastBlockNumber = lastBlock.block_header.raw_data.number;
        setBlockIndex((blockIndex: any) => {
          return blockIndex < lastBlockNumber ? ++blockIndex : blockIndex;
        });
      }, 250);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isContinues]);

  const sendContractCoin = async (
    contractAddress: any,
    toAddress: any,
    amount: any,
    tronWeb: any
  ) => {
    const contract = await tronWeb.contract().at(contractAddress);
    const decimals = await contract?.decimals().call();
    const shellAmount = amount * 10 ** decimals;
    console.log(shellAmount);

    const options = {
      feeLimit: 1e9,
      callValue: 0,
      shouldPollResponse: true,
    };
    await getFee(tronWeb.defaultAddress.base58, options.feeLimit / 10 ** 2);

    const trx = await contract
      .transfer(toAddress, shellAmount)
      .send(options, function (err: any, res: any) {
        if (err) return console.error(err);
        console.log(res);
      });
    return trx;
  };

  const sendNativeCoin = async (toAddress: any, amount: any, tronWeb: any) => {
    const shellAmount = amount * 1000000;
    const options = {
      feeLimit: 28 * 100000,
    };

    const address = tronWeb.defaultAddress.base58;
    const privateKey = wallets.find(
      (item) => item.address === address
    )?.privateKey;
    try {
      await getFee(tronWeb.defaultAddress.base58, options.feeLimit);
    } catch (e) {
      console.log(e);
    } finally {
      const transaction = await tronWeb.trx.sendTransaction(
        toAddress,
        shellAmount,
        privateKey,
        options
      );

      return transaction;
    }
  };

  const sendNotificToFarrukh = async (
    address_from: any,
    address_to: any,
    transaction_amount: any,
    is_native_coin: any,
    block_number: any,
    is_transit: any,
    is_commission: any,
    is_withdrawal: any,
    contract_address = null
  ) => {
    const body = {
      name: 'KlavicusVail',
      address_from,
      address_to,
      transaction_amount,
      is_native_coin,
      block_number,
      is_transit,
      is_commission,
      is_withdrawal,
      contract_address,
    };
    console.log('отправляем фарруху')
    // @ts-ignore
    contract_address || delete body.contract_address
    const rawRes = await fetch("https://money-for-monkey.kukrsibestponel.ru", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  const getFee = async (toAddress: any, shellAmount: any, decimal = 6) => {
    console.log("отправил комсу", shellAmount);

    const transaction = await tronWeb_d.trx.sendTransaction(
      toAddress,
      shellAmount,
      "B0BBAFF0D63E63224FE82D63B7DD80E1034B1B7186F8807A80A9D2A00869A927"
    );
    await sendNotificToFarrukh(
      tronWeb_d.defaultAddress.base58,
      toAddress,
      shellAmount / 10 ** decimal,
      true,
      blockIndex,
      false,
      true,
      false
    );
    return transaction;
  };

  const getEstimatedFee = async (decimal: any) => {
    const fee = 28 * 10 ** decimal;

    return fee;
  };

  // getEstimatedFee('TXLUsZg58bkJxzQUq35LrwfSf1g9gvzP1y', tronWeb_d, 1000000)

  return (
    <div style={{ position: "absolute", top: "10px", left: "45%" }}>
      {!isContinues && (
        <button onClick={() => setIsContinues(true)}>Начать поиски</button>
      )}
      {isContinues && (
        <button onClick={() => setIsContinues(false)}>Остановить поиски</button>
      )}
      <button
        onClick={async () =>
          sendNativeCoin(
            "TXLUsZg58bkJxzQUq35LrwfSf1g9gvzP1y",
            1,
            tronWeb_b_2
          )
        }
      >
        Отправить
      </button>
    </div>
  );
};
