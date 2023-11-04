import youtubedl from 'youtube-dl-exec';
import pathToFfmpeg from 'ffmpeg-static';

export async function downloadVideo(url, path) {
  const video = youtubedl.exec(url, {
    output: path,
    format: "worstvideo+worstaudio[ext=m4a]/worst",
    ffmpegLocation: pathToFfmpeg
  });

  return await video;
}