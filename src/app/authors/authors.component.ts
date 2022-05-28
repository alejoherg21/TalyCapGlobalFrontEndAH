import { AfterViewInit, Component, Injectable, OnInit, OnDestroy,ViewChild   } from '@angular/core';
import { AuthorsService } from '../Services/AuthorsService';
import { NgbDatepicker, NgbDatepickerKeyboardService, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookFilter } from '../Models/BookFilter';
import { BoolFilterResponse } from '../Models/BoolFilterResponse';
import { AuthorsResponse } from '../Models/AuthorsList';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

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

export class AuthorsComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any = {};

  dtTrigger = new Subject<any>();

  authorsResponse: AuthorsResponse[]
  form: FormGroup;
  bookFilter: BookFilter
  boolFilterResponse: BoolFilterResponse[]

  data: any;
  display = true;

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
    this.display = true;

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      this.display = true;
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
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
      this.display = true;

      //inicializa el data table
      this.boolFilterResponse=data;
      this.rerender()
    })
  }

}
