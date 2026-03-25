export interface FundingCartItem {
  id: string;
  challengeType: '1-step' | '2-step';
  stepsCount: 1 | 2;
  accountSize: number;
  price: number;
  label: string;
}

export function getFundingCart(): FundingCartItem[];

export function addToFundingCart(item: Omit<FundingCartItem, 'id' | 'stepsCount'>): void;

export function removeFromFundingCart(id: string): void;

export function clearFundingCart(): void;

export function getFundingCartItemCount(): number;
