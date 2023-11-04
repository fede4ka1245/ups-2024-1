import 'dotenv/config';
import { Telegraf } from 'telegraf';
import {isUrl, getDzenVideoUrl, getFormattedUrl, downloadVideo, RegExp} from "./logic/index.js";
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const bot = new Telegraf(process.env.BOT_TOKEN);

const reply = async (url, context) => {
  if (!isUrl(getFormattedUrl(url))) {
    await context.reply("It's not valid link. Send link to: vk, dzen, youtube").catch(err => null);
    return;
  }

  const file = `${uuidv4()}.mp4`;
  const filePath = `${__dirname}/files/${file}`;
  const msg = await context.replyWithAnimation({
    source: `${__dirname}/files/loading.gif`
  }, {
    reply_to_message_id: context.message.message_id,
    caption: 'Loading ur video'
  });

  try {
    await downloadVideo(url, filePath);

    await context.telegram.editMessageMedia(msg.chat.id, msg.message_id, null, {
      type: 'video',
      media: { source: filePath },
      caption: 'Here is your video'
    });

    fs.unlink(filePath, () => {});
  } catch {
    await context.telegram.editMessageText(msg.chat.id, msg.message_id, null, "Unexpected Error. Probably ur video is too large or u trying download video from not supported website");
  }
}

bot.hears(RegExp.yt, async (context) => {
  await reply(context.message.text, context);
});

bot.hears(RegExp.vk, async (context) => {
  await reply(context.message.text, context);
});

bot.hears(RegExp.dzen, async (context) => {
  const videoSrc = await getDzenVideoUrl(getFormattedUrl(context.message.text));
  await reply(videoSrc, context);
})

bot.on('text', async (context) => {
  await context.reply("Hey! Send link to: VK video, YouTube or Dzen =)");
});

bot.launch();