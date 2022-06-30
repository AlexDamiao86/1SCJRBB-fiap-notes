import { Component, OnInit } from '@angular/core';
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

  constructor(
    private formBuilder: FormBuilder,
    private noteService: NoteService
  ) {
    this.checkoutForm = this.formBuilder.group({
      textNote: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.subscription = this.noteService.editNoteProvider.subscribe(
      (note: Note) => {
        this.textNote?.setValue(note.text);
      }
    );
  }

  ngOnInit(): void {}

  sendNote() {
    // console.log(this.checkoutForm.get('textNote')?.errors);
    if (this.checkoutForm.valid) {
      this.noteService.postNotes(this.checkoutForm.value.textNote).subscribe({
        //next é chamado quando as coisas dão certo
        next: (note) => {
          this.checkoutForm.reset();
          this.noteService.notifyNewNoteAdded(note);
        },
        //error é chamado no caso de excessões
        error: (error) => alert("Algo errado na inserção! " + error)
      });
    }
  }

  get textNote() {
    return this.checkoutForm.get('textNote');
  }

}
