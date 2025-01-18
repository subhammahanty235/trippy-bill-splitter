export function formatAmount(amount:number) {
    if (amount >= 100000) {
      return `~${Math.round(amount / 1000)}K`;
    } else if (amount >= 1000) {
      return `~${(amount / 1000).toFixed(1).replace(/\.0$/, '')}K`;
    } else {
      return `${amount}`;
    }
  }