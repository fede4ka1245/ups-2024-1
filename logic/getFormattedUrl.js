export const getFormattedUrl = (url) => {
  let formatted = url;

  if (!formatted.includes('https://') && !formatted.includes('http://')) {
    formatted = 'https://' + formatted;
  }

  return formatted;
}