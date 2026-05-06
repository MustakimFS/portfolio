// Shared getter/setter for the session easter egg hash prefix
// PortfolioOS sets it once on mount; RaftBackground reads it
let _encoded = '[.......]'

export const setEasterHash = (encoded: string) => { _encoded = encoded }
export const getEasterHash = () => _encoded