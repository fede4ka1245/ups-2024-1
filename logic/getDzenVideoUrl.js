import cheerio from "cheerio";

// copy pasted from https://github.com/nagayev/zen-downloader/blob/master/downloader.mjs
export const getDzenVideoUrl = async (url) => {
  const response = await fetch(url, { method:'POST' });
  const body = await response.text();
  const $ = cheerio.load(body);
  const contentDiv = $('.content');
  let result = contentDiv.next().html();
  const mpd = result.indexOf('mpd');
  let pos = mpd;
  if (pos===-1){
    throw new Error(`Couldn't find mpd url`)
  }
  while (result[pos]+result[pos-1]+result[pos-2]+result[pos-3]!=="ptth"){
    pos--;
  }
  return result.slice(pos-3,mpd+3);
}