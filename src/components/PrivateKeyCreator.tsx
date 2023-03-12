import { useState } from "react"
const TronWeb = require('tronweb');
const HttpProvider = TronWeb.providers.HttpProvider;


export const AccountCreator = () => {

    const [newAcc, setNewAcc] = useState<any>()
    const [anotherAcc, setAnotherAcc] = useState<any>()
//@ts-ignore


const FULL_NODE_URL = 'https://nile.trongrid.io';
const SOLIDITY_NODE_URL = 'https://nile.trongrid.io';
const EVENT_SERVER_URL = 'https://nile.trongrid.io';


const tronWeb = new TronWeb(
    new HttpProvider(FULL_NODE_URL),
    new HttpProvider(SOLIDITY_NODE_URL),
    EVENT_SERVER_URL
  )

console.log(newAcc)
    return <div>
        <button type='button' onClick={async () => {
             const newAcc = await tronWeb.createAccount()
             const anotherAcc = await tronWeb.createAccount()
            setNewAcc(
                newAcc
            )
              setAnotherAcc(
                anotherAcc
              )
        }}>Сгенерировать ключ</button>
        <div style={{display: 'flex', flexDirection:'column', padding: '20px', gap: '40px'}}>
        <div>
        {newAcc?.privateKey && 'Адрес кошелька1:'}
        <div>{newAcc?.privateKey}</div> 

            <div>{newAcc?.address.base58}</div> 
        </div>
        <div>
        {anotherAcc?.privateKey && 'Адрес кошелька2:'}
        <div>{anotherAcc?.privateKey}</div> 

            <div>{anotherAcc?.address.base58}</div> 
        </div>
        </div>
    </div>
}