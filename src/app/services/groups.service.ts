import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Group} from "../core/models/group";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  constructor(private http:HttpClient) {}

  private groupsUrl = 'http://localhost:8080/api/groups';

  public getGroups() {
    return this.http.get<Group[]>(this.groupsUrl + "/all");
  }

  public getGroupsById(id:number) {
    return this.http.get<Group>(this.groupsUrl + "/" + id);
  }
}
