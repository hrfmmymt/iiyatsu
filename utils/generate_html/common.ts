import fs from 'fs';
import path from 'path';

export const minifierOption = {
  collapseInlineTagWhitespace: true,
  collapseWhitespace: true,
  minifyJS: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
};

export const logoTag = fs.readFileSync(
  path.join(__dirname, '../../templates/partial/logo.njk'),
  'utf8',
);
