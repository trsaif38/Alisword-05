export interface UserStats {
  coins: number;
  totalEarned: number;
  withdrawals: WithdrawalRequest[];
}

export interface WithdrawalRequest {
  id: string;
  amount: number;
  method: string;
  status: 'pending' | 'completed' | 'rejected';
  date: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  reward: number;
  icon: string;
  color: string;
}
