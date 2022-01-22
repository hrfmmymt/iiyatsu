import * as fs from 'fs';
import * as path from 'path';

export const CONFIG = {
  DEV_PORT: 4567 as const,
  CURRENT_YEAR: new Date().getFullYear(),
  POST_DIR: path.join(__dirname, '../post/'),
  POST_LIST: JSON.parse(fs.readFileSync(path.join(__dirname, '../post-list.json'), 'utf8')),
  GA_SUMMARY:
    'This website uses Google Analytics, a web analytics service provided by Google.' as const,
  GA_DETAILS:
    'Google Analytics uses "cookies", which are text files placed on your computer, to help the website analyse how users use the site.' as const,
};

export const META = {
  AUTHOR: 'hrfmmymt' as const,
  COPYRIGHT:
    `Copyright &copy; ${CONFIG.CURRENT_YEAR} iiyatsu of hrfmmymt All Rights Reserved.` as const,
  DESCRIPTION: "hrfmmymt's weblog" as const,
  OG_IMAGE: 'public/img/icon/icon.png' as const,
  FAVICON: 'public/img/icon/favicon.ico' as const,
  TITLE: "iiyatsu - hrfmmymt's weblog" as const,
  URL: 'https://iiyatsu.hrfmmymt.com/' as const,
};
