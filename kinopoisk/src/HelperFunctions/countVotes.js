export function countVotes(votes) {
  return Object.values(votes ?? {}).reduce((acc, votes) => (acc += votes), 0);
}