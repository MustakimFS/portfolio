// Shared getter/setter for the session easter egg hash prefix
// PortfolioOS sets it once on mount; RaftBackground reads it
let _hash = '........'

export const setEasterHash = (h: string) => { _hash = h }
export const getEasterHash = () => _hash
