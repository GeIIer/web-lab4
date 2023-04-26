import {Component, OnInit} from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-modal-groups',
  templateUrl: './modal-groups.component.html',
  styleUrls: ['./modal-groups.component.scss']
})
export class ModalGroupsComponent {
  name!: string;
  title!: string;
  existingNames!: string[];
  myForm: FormGroup;

  constructor(public modalRef: MdbModalRef<ModalGroupsComponent>,
              private fb: FormBuilder) {
    this.myForm = fb.group({
      name: [this.uniqueNameValidator(this.existingNames)]
    })
  }

  close() {
    this.modalRef.close();
  }

  save() {
    let newGroup = {
      name: this.name,
    }
    this.modalRef.close(newGroup);
  }

  checkNull() {
    return this.name != null;
  }

  get nameControl() {
    return this.myForm.get('name');
  }

  private uniqueNameValidator(existingNames: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const name = control.value;
      const isDuplicate = existingNames.includes(name);
      return isDuplicate ? { 'duplicateName': { value: name } } : null;
    };
  }
}
