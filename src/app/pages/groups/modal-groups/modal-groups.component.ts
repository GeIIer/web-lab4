import {Component, OnInit} from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {GroupService} from "../../../services/groups.service";
import {Observable, switchAll, switchMap} from "rxjs";
import {Group} from "../../../core/models/group";

@Component({
  selector: 'app-modal-groups',
  templateUrl: './modal-groups.component.html',
  styleUrls: ['./modal-groups.component.scss']
})
export class ModalGroupsComponent implements OnInit{
  name!: string;
  title!: string;
  existingNames!: string[];
  myForm!: FormGroup;

  constructor(public modalRef: MdbModalRef<ModalGroupsComponent>,
              private groupService: GroupService,
              private fb: FormBuilder) {
    this.myForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
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
    return this.name != "";
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

  ngOnInit(): void {
    this.groupService.getAllGroups().subscribe({
      next: groups => {
        this.existingNames = groups.map(x => x.name);
        this.myForm.get("name")?.setValidators(this.uniqueNameValidator(this.existingNames));
        this.myForm.updateValueAndValidity();
        console.log(this.existingNames);
      },
      error: err => {

      }
    });
  }
}
