// Interface que define a estrutura dos dados retornados pela API
export interface TransactionDTO {
  id: string;
  paging_token: string;
  successful: boolean;
  hash: string;
  ledger: number;
  created_at: string;
  source_account: string;
  source_account_sequence: string;
  fee_account: string;
  fee_charged: string;
  max_fee: string;
  operation_count: number;
  envelope_xdr: string;
  result_xdr: string;
  result_meta_xdr: string;
  fee_meta_xdr: string;
  memo_type: string;
  signatures: string[];
}

export class Transaction {
  readonly id: string;
  readonly pagingToken: string;
  readonly successful: boolean;
  readonly hash: string;
  readonly ledger: number;
  readonly createdAt: string;
  readonly sourceAccount: string;
  readonly sourceAccountSequence: string;
  readonly feeAccount: string;
  readonly feeCharged: string;
  readonly maxFee: string;
  readonly operationCount: number;
  readonly envelopeXdr: string;
  readonly resultXdr: string;
  readonly resultMetaXdr: string;
  readonly feeMetaXdr: string;
  readonly memoType: string;
  readonly signatures: string[];

  constructor(data: TransactionDTO) {
    this.id = data.id;
    this.pagingToken = data.paging_token;
    this.successful = data.successful;
    this.hash = data.hash;
    this.ledger = data.ledger;
    this.createdAt = data.created_at;
    this.sourceAccount = data.source_account;
    this.sourceAccountSequence = data.source_account_sequence;
    this.feeAccount = data.fee_account;
    this.feeCharged = data.fee_charged;
    this.maxFee = data.max_fee;
    this.operationCount = data.operation_count;
    this.envelopeXdr = data.envelope_xdr;
    this.resultXdr = data.result_xdr;
    this.resultMetaXdr = data.result_meta_xdr;
    this.feeMetaXdr = data.fee_meta_xdr;
    this.memoType = data.memo_type;
    this.signatures = data.signatures;
  }

  static fromDTO(dto: TransactionDTO): Transaction {
    return new Transaction(dto);
  }
}