import { NODE_URL } from "../components/consts";

export const getTransactionByContractAddress = async (address) => {
  const rawRes = await fetch(
    `${NODE_URL}/v1/contracts/${address}/transactions?limit=200&only_confirmed=true&order_by=block_timestamp,desc`
  );

  const res = await rawRes.json();
  return res;
};
