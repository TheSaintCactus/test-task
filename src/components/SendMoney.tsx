import Web3 from "web3";
import { ethers } from "ethers";
import { useForm } from "react-hook-form";
import { useState } from "react";

// const Web3: Web3 = require("web3")

export const SendMoney = ({adress = '0x864fB1418FC1D6E1c5173F3B89C31483d145B5D5'}) => {

   const {register, handleSubmit} = useForm()

   const [msg, setMsg] = useState<any>()

   const web3 = new Web3('https://alien-quaint-thunder.ethereum-goerli.discover.quiknode.pro/14191b401f7502238a019e909890d6779a4ce5b9/');

    const sendTranc = async ({privKey, addressTo}: any) => {
      setMsg('')

      const wallet = new ethers.Wallet(privKey);
      const addressFrom = wallet.address;
  
        console.log(
            `Attempting to make transaction from ${addressFrom} to ${addressTo}`
         );
      
         const createTransaction = await web3.eth.accounts.signTransaction(
            {
               from: addressFrom,
               to: addressTo,
               value: web3.utils.toWei('0.001', 'ether'),
               gas: '150000',
               
            },
            privKey
         );

         // Deploy transaction
       try {  const createReceipt = await web3.eth.sendSignedTransaction(
            //@ts-ignore
            createTransaction.rawTransaction
         );
         setMsg(<div><div>Успешный успех</div>
         <a href={`https://goerli.etherscan.io/tx/${createReceipt.transactionHash}`}>Транзакция на etherscan</a>
         </div>)

         console.log(
            `Transaction successful with hash: ${createReceipt.transactionHash}`
         );
       }
       catch {
         setMsg('Не судьба')

       }
    }

     return (
      <form onSubmit={handleSubmit(sendTranc)}>
      <div className="wrapper">
      <h2 className="send-money-input-description">
      Отправить ETH
      </h2>
      <div className="send-money">
      <div className="send-money-inputs">
      <div className="send-money-input">
      <input type="text" placeholder="Введите ваш приватный ключ" {...register('privKey')} />
      <div className="send-money-input-description">
      Это абсолютно безопасно {'))'}
      </div>
      </div>
      <div className="send-money-input">
      <input type="text" placeholder="Введите адрес получателя" {...register('addressTo')} />
      </div>
      </div>
      <button type="submit">Отправить очень много денег</button>
      </div>
      <div className="send-money-input-description">
    {msg}
    </div>
      </div>
      </form>
      );
}