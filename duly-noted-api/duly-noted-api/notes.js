import { promises as fs } from "fs";
 
export async function saveNotes(notes) {
 try {
   const stringNotes = JSON.stringify(notes);
   await fs.writeFile('data.json', stringNotes);
 } catch (err) {
   return;
 }
}
 
export async function getNotes() {
 try {
   const notes = await fs.readFile("data.json");
   const newNotes = JSON.parse(notes);
   return newNotes; 
 } catch (err) {
   const noNotes = [];
   return noNotes;
 }
}