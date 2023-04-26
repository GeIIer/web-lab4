import {Component} from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {Group} from "../../../../core/models/group";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-modal-student',
  templateUrl: './modal-student.component.html',
  styleUrls: ['./modal-student.component.scss']
})
export class ModalStudentComponent {
  title!: string;
  firstname!: string;
  lastname!: string;
  birthdate!: Date;
  number!: number;

  selectedGroup!: Group;
  change: boolean = false;
  groups!: Group[];

  myForm: FormGroup;

  constructor(public modalRef: MdbModalRef<ModalStudentComponent>,
              private formBuilder: FormBuilder) {
    this.myForm = new FormGroup({
      firstname: new FormControl('', [Validators.required,]),
      lastname: new FormControl('', [Validators.required],),
      number: new FormControl(NaN),
      date: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/),]
      )
    });
  }

  close() {
    this.modalRef.close();
  }

  save() {
    if (this.change) {
      let newStudent = {
        firstname: this.firstname,
        lastname: this.lastname,
        birthdate: this.birthdate,
        number: this.number,
        groupId: this.selectedGroup.id
      }
      this.modalRef.close(newStudent);
    } else {
      let newStudent = {
        firstname: this.firstname,
        lastname: this.lastname,
        birthdate: this.birthdate,
        number: this.number,
      }
      this.modalRef.close(newStudent);
    }
  }

  checkNull() {
    return this.firstname != ""
      && this.lastname != ""
      && this.birthdate != null
      && this.number != null;
  }
}
