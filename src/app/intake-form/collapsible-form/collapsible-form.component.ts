import { Component, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';


@Component({
  selector: 'app-collapsible-form',
  templateUrl: './collapsible-form.component.html',
  styleUrls: ['./collapsible-form.component.scss'],
  
})
export class CollapsibleFormComponent {

  @Input() itemTypes: string[] =[];
  @Input() multiple: string='';
  @Input() title: string='';
  @Input() icon: string='home';
  selectedOptions: string[] = [];
  @Output() formSelections = new EventEmitter<any>();

  addingOption: boolean = false;
  newOption: string = "";

  emitSelections() {
    this.formSelections.emit(this.selectedOptions);
  }

  updateOptions() {
    this.itemTypes.push(this.newOption)

    if (this.multiple || this.selectedOptions.length === 0){
      this.selectedOptions.push(this.newOption);
    this.emitSelections()}


    this.newOption = ""
    this.addingOption = false
  }




}
