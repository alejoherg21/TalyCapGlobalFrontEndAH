import { Component, Injectable, OnInit, TemplateRef, ViewChildren } from '@angular/core';
import { AuthorsService } from '../Services/AuthorsService';
import { NgbDatepicker, NgbDatepickerKeyboardService, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookFilter } from '../Models/BookFilter';
import { BoolFilterResponse } from '../Models/BoolFilterResponse';
import { AuthorsResponse } from '../Models/AuthorsList';
import { Subject } from 'rxjs';

const Key = {
  PageUp: 'PageUp',
  PageDown: 'PageDown',
  End: 'End',
  Home: 'Home'
};
@Injectable()
export class CustomKeyboardService extends NgbDatepickerKeyboardService {
  processKey(event: KeyboardEvent, dp: NgbDatepicker) {
    const state = dp.state;
    switch (event.code) {
      case Key.PageUp:
        dp.focusDate(dp.calendar.getPrev(state.focusedDate, event.altKey ? 'y' : 'm'));
        break;
      case Key.PageDown:
        dp.focusDate(dp.calendar.getNext(state.focusedDate, event.altKey ? 'y' : 'm'));
        break;
      case Key.End:
        dp.focusDate(event.altKey ? state.maxDate : state.lastDate);
        break;
      case Key.Home:
        dp.focusDate(event.altKey ? state.minDate : state.firstDate);
        break;
      default:
        super.processKey(event, dp);
        return;
    }
    event.preventDefault();
    event.stopPropagation();
  }
}

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})

export class AuthorsComponent implements OnInit {
  authorsResponse: AuthorsResponse[]
  form: FormGroup;
  bookFilter: BookFilter
  boolFilterResponse: BoolFilterResponse[]

  mostrar: boolean=false

  dtOptions: any = {};
  dtTrigger = new Subject<any>();
  data: any;
  displayStyle = "none";

  model1: NgbDateStruct;
  model2: NgbDateStruct;
  constructor(private Api: AuthorsService,private fb: FormBuilder,) {
    this.form = this.fb.group({
      idAuthor: ['', [Validators.required]],
      InitialpublishDate: ['', [Validators.required, Validators.minLength(8)]],
      FinalpublishDate: ['', [Validators.required, Validators.minLength(8)]],
    })

  }

  ngOnInit(): void {
    this.GetAuthors ()
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json'
      },
      dom: 'Bfrtip',
      buttons: [
        'excel'
      ]
    };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  GetAuthors (){
    this.Api.GetAuthors().subscribe ((data: AuthorsResponse[]) =>{
      console.log(data)
      this.authorsResponse=data;
    })
  }


  GetBookFilter (){
    this.Api.GetAuthors().subscribe ((data: AuthorsResponse[]) =>{
      console.log(data)
      this.authorsResponse=data;
    })
  }

  functionname(value: any){
    console.log(value);
  }

  Buscar(){
    console.log(this.form)

    this.bookFilter = {
      idAuthor: this.form.get('idAuthor')?.value,
      InitialpublishDate: new Date(this.model1.year,this.model1.month-1,this.model1.day),
      FinalpublishDate: new Date(this.model2.year,this.model2.month-1,this.model2.day)
    }

    this.Api.GetBookFilter(this.bookFilter).subscribe ((data:BoolFilterResponse[]) =>{
      console.log(data)
      this.mostrar=true

      //inicializa el data table
      this.boolFilterResponse=data;
      this.dtTrigger.next();
      this.displayStyle = "block";
    })
  }

}
