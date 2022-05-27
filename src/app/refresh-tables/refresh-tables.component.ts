import { Component, OnInit } from '@angular/core';
import { TablesUpdatesService } from '../Services/TablesUpdates';

@Component({
  selector: 'app-refresh-tables',
  templateUrl: './refresh-tables.component.html',
  styleUrls: ['./refresh-tables.component.css']
})
export class RefreshTablesComponent implements OnInit {

  authorsState="Pendiente"
  booksState="Pendiente"
  usersState="Pendiente"
  displayStyle = "none";
  errorStatus:boolean = false;
  errorMsj: any = "";

  constructor(private Api: TablesUpdatesService ) { }

  ngOnInit(): void {
  }

  UpdateAuthors (){
    this.authorsState='Proceso'
    this.Api.UpdateTable("Authors").subscribe (data =>{
      console.log(data)
         if (data.message == "Success") {
          this.authorsState="Actualizado"
          this.errorStatus = true;
          this.errorMsj= data.message
          this.UpdateBooks()
      }
    })
  }

  UpdateBooks (){
    this.booksState='Proceso'
    this.Api.UpdateTable("Books").subscribe (data =>{
      console.log(data)
         if (data.message == "Success") {
          this.booksState="Actualizado"
          this.errorStatus = true;
          this.errorMsj= data.message
          this.UpdateUsers()
      }
    })
  }

  UpdateUsers (){
    this.usersState='Proceso'
    this.Api.UpdateTable("Books").subscribe (data =>{
      console.log(data)
         if (data.message == "Success") {
          this.usersState="Actualizado"
          this.errorStatus = true;
          this.errorMsj= data.message
          this.openPopup()
      }
    })
  }

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
}
