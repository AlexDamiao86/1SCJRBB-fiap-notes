import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from './@types/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private apiUrl: string;

  private newNoteSource = new Subject<Note>();
  private editNoteSource = new Subject<Note>();
  private editedNoteSource = new Subject<Note>();
  newNoteProvider = this.newNoteSource.asObservable();
  editNoteProvider = this.editNoteSource.asObservable();
  editedNoteProvider = this.editedNoteSource.asObservable();

  constructor(private http: HttpClient) {
    this.apiUrl = "https://fiap-notes-api.herokuapp.com";
  }

  // private notes = [
  //   {
  //     id: 1,
  //     date: new Date(),
  //     text: 'Um texto qualquer',
  //     urgent: false,
  //   },
  //   {
  //     id: 2,
  //     date: new Date(),
  //     text: 'Um texto qualquer 2',
  //     urgent: true,
  //   },
  //   {
  //     id: 3,
  //     date: new Date(),
  //     text: 'Um texto qualquer 3',
  //   },
  //   {
  //     id: 4,
  //     date: new Date(),
  //     text: 'Um texto qualquer 4',
  //     urgent: true,
  //   },
  // ];

  notifyNewNoteAdded(note: Note){
    this.newNoteSource.next(note);
    // this.newNoteSource.error("algum exception");
  }

  notifyNoteEditRequested(note: Note){
    this.editNoteSource.next(note);
  }

  notifyNoteEdited(note: Note) {
    this.editedNoteSource.next(note);
  }

  getNotes(){
    return this.http.get<Note[]>(`${this.apiUrl}/notes`);
  }

  removeNote(noteId: number){
    return this.http.delete(`${this.apiUrl}/notes/${noteId}`);
  }

  postNotes(textNote: string){
    return this.http.post<Note>(`${this.apiUrl}/notes`, {text: textNote});
  }

  editNote(note: Note) {
    return this.http.put(`${this.apiUrl}/notes/${note.id}`, {text: note.text});
  }

}
