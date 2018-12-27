import {Component} from '@angular/core';
import { Employee } from '../models/employee.model';
import { clearModulesForTest } from '@angular/core/src/linker/ng_module_factory_loader';
import { FormPoster } from '../services/form-poster.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  languages = [];
  model = new Employee('Daria', 'Johnson', true, '1099', 'default');

  constructor(private formPoster: FormPoster) {
    this.formPoster.getLanguages()
                    .subscribe(
                      data => this.languages = data.languages ,
                      err => console.log('get error: ',err)
                    );
  }

  submitForm(form: NgForm) {
    // validate form
    this.validatePrimaryLanguage(this.model.primaryLanguage);
    if (this.hasPreferedLanguageError)
      return;

    this.formPoster.postEmployeeForm(this.model)
      .subscribe(
        data => console.log("success", data),
        err => console.log("error", err)
      )
  }

  hasPreferedLanguageError = false;
  validatePrimaryLanguage (value) {
    if (value === 'default')
      this.hasPreferedLanguageError = true;
    else
      this.hasPreferedLanguageError = false;
  }

}
