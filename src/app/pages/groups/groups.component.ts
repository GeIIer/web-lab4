import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GroupsService} from "../../services/groups.service";
import {Group} from "../../core/models/group";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit{
  columns: string[] = [
    "Название",
  ]

  groups!: Group[];
  errors = false;

  constructor(private router: Router, private groupsService: GroupsService){

  }

  ngOnInit(): void {
    this.groupsService.getGroups().subscribe(
      result => {
        this.groups = result;
      },
      error => {
        this.errors = true;
      },
      () => {

      }
    );
  }

}
