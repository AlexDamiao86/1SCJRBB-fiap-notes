import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from 'src/app/services/@types/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input()
  noteProp = {} as Note;

  @Input()
  titleProp: any;

  @Output()
  notifyDelete = new EventEmitter();

  @Output()
  notifyEdit = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  confirmRemove(){
    if(confirm("Deseja realmente apagar?"))
      this.notifyDelete.emit();
  }

  edit() {
    alert(`Favor alterar o texto no campo "Nota" ao lado`);
    this.notifyEdit.emit();
  }

}
