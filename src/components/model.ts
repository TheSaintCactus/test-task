export interface ITranc {
    ret: Ret[]
    signature: string[]
    txID: string
    net_usage: number
    raw_data_hex: string
    net_fee: number
    energy_usage: number
    block_timestamp: string
    blockNumber: string
    energy_fee: number
    energy_usage_total: number
    raw_data: RawData
    internal_transactions: any[]
  }
  
  export interface Ret {
    contractRet: string
  }
  
  export interface RawData {
    contract: Contract[]
    ref_block_bytes: string
    ref_block_hash: string
    expiration: number
    fee_limit: number
    timestamp: number
  }
  
  export interface Contract {
    parameter: Parameter
    type: string
  }
  
  export interface Parameter {
    value: Value
    type_url: string
  }
  
  export interface Value {
    data: string
    owner_address: string
    contract_address: string
  }
  