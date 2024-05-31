### sCode Description

The sCode aims to standardize the way code files are represented in documents, allowing multiple files to be defined and exported in a single text document. This is especially useful for documenting projects, sharing code examples, and organizing code blocks clearly and structuredly.

### sCode Syntax

## Versioning

The sCode standard includes a required --- Version: line at the beginning of the document that specifies the version of the sCode standard being used. This helps in tracking the standard's version and ensuring compatibility with tools and parsers.

#### Code Blocks

Each code block in sCode starts with the line `--- Path:`, followed by the file path. The file content is written directly below this line. This structure allows the code to be easily identified and exported to the specified path.

**Example:**

```scode
--- Version: 0.1
--- Path: /package.json
{
  "dependencies": {
    "axios": "^1.7.2"
  },
  "name": "s-code",
  "version": "0.1",
  "description": "The sCode standard is an approach developed to unify and export code files in a simple and efficient manner, using a specific syntax that facilitates the documentation, reading, and exporting of code blocks.",
  "main": "src/index.js",
  "repository": "https://github.com/lucassm02/s-code.git",
  "author": "Lucas Santos <lucassm02@gmail.com>",
  "license": "MIT",
  "private": false
}
```

### Comments

Comments within the code blocks follow the syntax of the programming language used. General comments, not inside code blocks, can be added outside the code blocks to describe the context or provide additional information.

**Example in JavaScript:**

```scode
--- Version: 0.1
--- Path: /src/model/user.js
// This is a comment in JavaScript
export class User {
  constructor(id, name, age) {
    this.id = id;
    this.name = name;
    this.age = age;
  }
}
```

## Directory Structure

The directory structure is implicit in the file path specified after --- Path:. This means that when exporting the files, the directory structure will be recreated as specified in the file paths.

## Complete Example

A complete sCode example demonstrates the definition of multiple files in different directories:

```scode
--- Version: 0.1
--- Path: /src/model/user.js
export class User {
  constructor(id, name, age) {
    this.id = id;
    this.name = name;
    this.age = age;
  }
}
--- Path: /src/infra/sqlite/database.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function init() {
  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER NOT NULL
    )
  `);

  return db;
}

export default init;
```

## sCode Benefits

* **Simplification in Project Documentation:** Facilitates the inclusion of multiple code files in a single document, promoting clearer and more organized documentation.
* **Ease of Reading and Navigation:** Helps in reading and navigating large codebases, allowing developers to quickly find relevant files.
* **Clear Organization and Structuring:** Promotes clear organization of files and directories, which is beneficial for maintaining well-structured and easy-to-maintain code projects.

The sCode is a valuable tool for developers who need to document, share, and organize their code projects efficiently and standardized.
