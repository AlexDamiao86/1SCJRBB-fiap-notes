import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/services/@types/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-form-note',
  templateUrl: './form-note.component.html',
  styleUrls: ['./form-note.component.css'],
})
export class FormNoteComponent implements OnInit {
  title = 'FIAP NOTES';
  logoImage = '/assets/logo.png';

  checkoutForm: FormGroup;
  subscription: Subscription;
  note = <Note>{};
  isEditing = false;

  constructor(
    private formBuilder: FormBuilder,
    private noteService: NoteService,
    private renderer: Renderer2
  ) {
    this.checkoutForm = this.formBuilder.group({
      textNote: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.subscription = this.noteService.editNoteProvider.subscribe(
      (note: Note) => {
        this.note = note;
        this.isEditing = true;
        this.textNote?.setValue(note.text);
        this.focusTextNote();
      }
    );
  }

  ngOnInit(): void {}

  sendNote() {
    // console.log(this.checkoutForm.get('textNote')?.errors);
    if (this.checkoutForm.valid) {
      if (!this.isEditing) {
        this.noteService.postNotes(this.checkoutForm.value.textNote).subscribe({
          //next é chamado quando as coisas dão certo
          next: (note) => {
            this.checkoutForm.reset();
            this.noteService.notifyNewNoteAdded(note);
          },
          //error é chamado no caso de excessões
          error: (error) => alert("Algo errado na inserção! " + error)
        });
      } else {
        this.note.text = this.checkoutForm.value.textNote;
        this.noteService.editNote(this.note).subscribe({
          next: () => {
            this.checkoutForm.reset();
            this.isEditing = false;
            this.noteService.notifyNoteEdited(this.note);
            this.note = <Note>{};
          },
          error: (error) => alert("Algo errado na atualização! " + error)
        });
      }
    }
  }

  get textNote() {
    return this.checkoutForm.get('textNote');
  }

  focusTextNote() {
    this.renderer.selectRootElement('#input-note').focus();
  }

}
