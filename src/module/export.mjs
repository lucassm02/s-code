import fs from 'fs';
import path from 'path';

import { COMPATIBLE_VERSION } from '../util/constant.mjs';

function readAndCombineFiles(dir, combinedContent = '', filePaths = []) {
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      ({ combinedContent, filePaths } = readAndCombineFiles(
        fullPath,
        combinedContent,
        filePaths
      ));
      continue;
    }
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    combinedContent += `--- Path: ${fullPath}\n${fileContent}\n`;
    filePaths.push(fullPath);
  }
  return { combinedContent, filePaths };
}

function convertToSCode(content, outputPath) {
  const sCodeContent = `--- Version: ${COMPATIBLE_VERSION}\n${content}`;
  fs.writeFileSync(outputPath, sCodeContent, 'utf8');
}

export function exportFiles(targetDirectory, outputFilePath) {
  const { combinedContent } = readAndCombineFiles(targetDirectory);
  convertToSCode(combinedContent, outputFilePath);
  console.log(`Exportação concluída, arquivo: ${outputFilePath}`);
}
