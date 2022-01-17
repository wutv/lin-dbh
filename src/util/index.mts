import { opendir } from "fs/promises";
import { resolve } from "path";

export async function* getCommands(path: string): Command {
    const dirents = await opendir(path);

    for await (const dirent of dirents) {
      const res = resolve(path, dirent.name);
      
      if (dirent.isDirectory())
        yield* getCommands(res);
      else yield await import(res);
    };
  }