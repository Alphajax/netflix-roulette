export const shortenString = (str: string, maxLength: number) =>
  str.length < maxLength ? str : `${str.slice(0, maxLength)}...`
