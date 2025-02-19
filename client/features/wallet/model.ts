// Interfaces for nested objects
export interface Balance {
  balance: string;
  limit?: string;
  buying_liabilities: string;
  selling_liabilities: string;
  last_modified_ledger?: number;
  is_authorized?: boolean;
  is_authorized_to_maintain_liabilities?: boolean;
  asset_type: string;
  asset_code?: string;
  asset_issuer?: string;
}

interface Thresholds {
  low_threshold: number;
  med_threshold: number;
  high_threshold: number;
}

interface Flags {
  auth_required: boolean;
  auth_revocable: boolean;
  auth_immutable: boolean;
  auth_clawback_enabled: boolean;
}

interface Signer {
  weight: number;
  key: string;
  type: string;
}

// Main DTO interface
export interface AccountDTO {
  id: string;
  account_id: string;
  sequence: string;
  sequence_ledger: number;
  sequence_time: string;
  subentry_count: number;
  last_modified_ledger: number;
  last_modified_time: string;
  thresholds: Thresholds;
  flags: Flags;
  balances: Balance[];
  signers: Signer[];
  data: Record<string, never>;
  num_sponsoring: number;
  num_sponsored: number;
  paging_token: string;
}

export class Account {
  readonly id: string;
  readonly accountId: string;
  readonly sequence: string;
  readonly sequenceLedger: number;
  readonly sequenceTime: string;
  readonly subentryCount: number;
  readonly lastModifiedLedger: number;
  readonly lastModifiedTime: string;
  readonly thresholds: Thresholds;
  readonly flags: Flags;
  readonly balances: Balance[];
  readonly signers: Signer[];
  readonly data: Record<string, never>;
  readonly numSponsoring: number;
  readonly numSponsored: number;
  readonly pagingToken: string;

  constructor(data: AccountDTO) {
    this.id = data.id;
    this.accountId = data.account_id;
    this.sequence = data.sequence;
    this.sequenceLedger = data.sequence_ledger;
    this.sequenceTime = data.sequence_time;
    this.subentryCount = data.subentry_count;
    this.lastModifiedLedger = data.last_modified_ledger;
    this.lastModifiedTime = data.last_modified_time;
    this.thresholds = data.thresholds;
    this.flags = data.flags;
    this.balances = data.balances;
    this.signers = data.signers;
    this.data = data.data;
    this.numSponsoring = data.num_sponsoring;
    this.numSponsored = data.num_sponsored;
    this.pagingToken = data.paging_token;
  }

  static fromDTO(dto: AccountDTO): Account {
    return new Account(dto);
  }

  // Helper method to get native balance
  getNativeBalance(): string {
    const nativeBalance = this.balances.find(b => b.asset_type === 'native');
    return nativeBalance ? nativeBalance.balance : '0';
  }

  // Helper method to get balance for a specific asset
  getAssetBalance(assetCode: string): string | null {
    const assetBalance = this.balances.find(b => b.asset_code === assetCode);
    return assetBalance ? assetBalance.balance : null;
  }
}