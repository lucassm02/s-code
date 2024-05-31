export function showHelp() {
  console.log(`
Uso: node script.js <comando> <args>

Comandos:
  export <diretório> [output]    Exporta arquivos do diretório especificado para um arquivo sCode.
  import <file-path-or-url>      Importa arquivos a partir de um arquivo sCode ou URL.

Exemplos:
  node script.js export ./src combined_minified.scode
  node script.js import combined_minified.scode
  node script.js import http://example.com/combined_minified.scode
  `);
}
