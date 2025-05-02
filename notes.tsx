import { promises as fs } from "fs";

const filePath = "./data.json";

export async function getNotes() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function saveNotes(notes: any[]) {
  const json = JSON.stringify(notes, null, 2);
  await fs.writeFile(filePath, json, "utf-8");
}
