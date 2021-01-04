import * as fs from 'fs';

export function checkFileExistence({ filePath, reply }: { filePath: string; reply: any }) {
  try {
    fs.statSync(filePath);
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') {
      reply.code(404).view('./templates/page/404.njk');
      return false;
    }
  }
}
