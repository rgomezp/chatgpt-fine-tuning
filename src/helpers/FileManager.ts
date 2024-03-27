import * as fs from 'fs';

/**
 * FileManager contains static *awaitable* file-system functions
 */
export class FileManager {
  static async readFile(path: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      fs.readFile(path, 'utf8', (err, data) => {
        if (err || !data) {
          console.error("Couldn't read file:" + path);
          reject(err);
          return;
        }
        resolve(data);
      });
    });
  }

  static async writeFile(path: string, contents: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      fs.writeFile(path, contents, 'utf8', (err) => {
        if (err) {
          console.error("Couldn't write file:" + path);
          reject(err);
          return;
        }
        resolve();
      });
    });
  }

  static async copyFile(path1: string, path2: string): Promise<void> {
    const fileContents = await FileManager.readFile(path1);
    await FileManager.writeFile(path2, fileContents);
  }

  static dirExists(path: string): boolean {
    return fs.existsSync(path)
  }

  /**
   * Writes a line to a file. Creates the file if it doesn't exist, or appends if it does.
   * @param path The path to the file
   * @param line The line to write to the file
   */
  static async writeLine(path: string, line: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const stream = fs.createWriteStream(path, { flags: 'a' });
      stream.write(line + '\n', 'utf8', (err) => {
        if (err) {
          console.error("Couldn't write line to file:" + path);
          reject(err);
          return;
        }
        stream.end(resolve);
      });
    });
  }
}