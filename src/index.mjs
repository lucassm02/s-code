import { exportFiles, importFiles, showHelp } from './module/index.mjs';

function main() {
  const [command, ...args] = process.argv.slice(2);

  if (!command) {
    showHelp();
    process.exit(1);
  }

  switch (command) {
    case 'export':
      if (args.length < 1) {
        console.error('Por favor, forneça um diretório para exportar');
        process.exit(1);
      }
      const targetDirectory = args[0];
      const outputFilePath = args[1] || 'combined_file.scode';
      exportFiles(targetDirectory, outputFilePath);
      break;

    case 'import':
      if (args.length < 1) {
        console.error('Por favor, forneça um arquivo ou URL para importar');
        process.exit(1);
      }
      importFiles(args[0]);
      break;

    default:
      showHelp();
      process.exit(1);
  }
}

main();
