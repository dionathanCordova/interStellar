// Interface for the transaction data within the ledger
interface LedgerTransactionDTO {
  hash: string;
  successful: boolean;
  created_at: string;
  fee_charged: string;
  operation_count: number;
}

// Interface for the main ledger data
export interface LedgerDTO {
  id: string;
  paging_token: string;
  hash: string;
  prev_hash: string;
  sequence: number;
  successful_transaction_count: number;
  failed_transaction_count: number;
  operation_count: number;
  tx_set_operation_count: number;
  closed_at: string;
  total_coins: string;
  fee_pool: string;
  base_fee_in_stroops: number;
  base_reserve_in_stroops: number;
  max_tx_set_size: number;
  protocol_version: number;
  header_xdr: string;
  transactions: LedgerTransactionDTO[];
}

// Class for transaction data within the ledger
export class LedgerTransaction {
  readonly hash: string;
  readonly successful: boolean;
  readonly createdAt: string;
  readonly feeCharged: string;
  readonly operationCount: number;

  constructor(data: LedgerTransactionDTO) {
    this.hash = data.hash;
    this.successful = data.successful;
    this.createdAt = data.created_at;
    this.feeCharged = data.fee_charged;
    this.operationCount = data.operation_count;
  }

  static fromDTO(dto: LedgerTransactionDTO): LedgerTransaction {
    return new LedgerTransaction(dto);
  }
}

// Main Ledger class
export class Ledger {
  readonly id: string;
  readonly pagingToken: string;
  readonly hash: string;
  readonly prevHash: string;
  readonly sequence: number;
  readonly successfulTransactionCount: number;
  readonly failedTransactionCount: number;
  readonly operationCount: number;
  readonly txSetOperationCount: number;
  readonly closedAt: string;
  readonly totalCoins: string;
  readonly feePool: string;
  readonly baseFeeInStroops: number;
  readonly baseReserveInStroops: number;
  readonly maxTxSetSize: number;
  readonly protocolVersion: number;
  readonly headerXdr: string;
  readonly transactions: LedgerTransaction[];

  constructor(data: LedgerDTO) {
    this.id = data.id;
    this.pagingToken = data.paging_token;
    this.hash = data.hash;
    this.prevHash = data.prev_hash;
    this.sequence = data.sequence;
    this.successfulTransactionCount = data.successful_transaction_count;
    this.failedTransactionCount = data.failed_transaction_count;
    this.operationCount = data.operation_count;
    this.txSetOperationCount = data.tx_set_operation_count;
    this.closedAt = data.closed_at;
    this.totalCoins = data.total_coins;
    this.feePool = data.fee_pool;
    this.baseFeeInStroops = data.base_fee_in_stroops;
    this.baseReserveInStroops = data.base_reserve_in_stroops;
    this.maxTxSetSize = data.max_tx_set_size;
    this.protocolVersion = data.protocol_version;
    this.headerXdr = data.header_xdr;
    this.transactions = data.transactions.map(tx => LedgerTransaction.fromDTO(tx));
  }

  static fromDTO(dto: LedgerDTO): Ledger {
    return new Ledger(dto);
  }
}