import axios from 'axios';
import fsPromises from 'fs/promises';
import path from 'path';

import { COMPATIBLE_VERSION } from '../util/constant.mjs';

async function createFilesFromSCodeFile(sCodeContent) {
  const versionMatch = sCodeContent.match(/---\s*Version:\s*(.*)\n/i);
  if (!versionMatch || versionMatch[1].trim() !== COMPATIBLE_VERSION) {
    console.error(
      `Versão incompatível ou ausente no arquivo sCode. Esperado: ${COMPATIBLE_VERSION}`
    );
    process.exit(1);
  }

  const files = sCodeContent.split(/---\s*Path:\s*/i).slice(1);

  if (files.length === 0) {
    console.error('Não foi encontrado nenhum arquivo para extração');
    process.exit(0);
  }

  for (const file of files) {
    const [filePathFromString, ...contentLines] = file.trim().split('\n');
    const filePath = path.join(process.cwd(), filePathFromString.trim());
    const content = contentLines.join('\n').trim();
    const dir = path.dirname(filePath);

    await fsPromises.mkdir(dir, { recursive: true });
    await fsPromises.writeFile(filePath, content);

    console.warn(`Importado: ${filePath}`);
  }
}

export async function importFiles(input) {
  try {
    const content =
      input.startsWith('http://') || input.startsWith('https://')
        ? (await axios.get(input)).data
        : await fsPromises.readFile(input, 'utf-8');

    await createFilesFromSCodeFile(content);
  } catch (error) {
    console.error(
      `Não foi possível carregar o conteúdo ${input}: ${error.message}`
    );
    process.exit(1);
  }

  console.log('Fim da importação');
  process.exit(0);
}
