import {Component, OnInit} from '@angular/core';
import {Group} from "../../core/models/group";
import {Router} from "@angular/router";
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {ModalGroupsComponent} from "./modal-groups/modal-groups.component";
import {GroupService} from "../../services/groups.service";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  groups!: Group[];
  selectedGroup!: Group;
  err: boolean = false;

  constructor(private router: Router,
              private groupService: GroupService,
              private modalService: MdbModalService) {
  }

  modalRef: MdbModalRef<ModalGroupsComponent> | null = null;

  ngOnInit(): void {
    this.groupService.getAllGroups().subscribe({
        next: (data) => {
          this.groups = data;
          console.log(data);
        },
        error: (err) => {
          this.err = true;
        }
      }
    );
  }

  openModalAddNew() {
    let existingNames = this.groups.map(x => x.name);
    this.modalRef = this.modalService.open(ModalGroupsComponent, {
      data: {
        title: "Добавить группу",
        existingNames: existingNames,
      }
    });
    this.modalRef.onClose.subscribe(data => {
      if (data) {
        this.groupService.createGroup(data.name).subscribe({
          next: group => {
            console.log(group);
            this.groups.push(group);
          },
          error: err1 => {
            console.log(this.groups);
            this.err = true;
          }
        });
      }
    });
  }

  deleteGroup(id:number) {
    this.groupService.deleteGroup(id).subscribe({
      next: data => {
        this.groups = this.groups.filter(obj => obj.id !== id);
      },
      error: err1 => {
        this.err = true;
      }
    });
  }

  groupsEmpty() {
    return (this.groups.length === 0);
  }
}
