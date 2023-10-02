import { Component, ViewChild } from '@angular/core';
import { AlBackendService } from '../services/al-backend.service';
  import { HousingSection, sections } from '../models/housingSections';

import {
  Router,
  NavigationExtras
} from '@angular/router';
import { Checkout } from '../models/checkout';

/**
 * @title Accordion with expand/collapse all toggles
 */

@Component({
  selector: 'intakeForm',
  templateUrl: './intake-form.component.html',
  styleUrls: ['./intake-form.component.scss'],
})
export class IntakeFormComponent {
  constructor(private router: Router, private alService: AlBackendService) { }
  responseMessage: string;
  progressValue= 50;

  


  sections: HousingSection[] = this.generate_sections()

  progress(): number{
    var activeCount = 0;
    var selectedCount = 0;
    this.sections.forEach((section) => {
      if (section.active) {activeCount++}
      if (section.selectedOptions.length > 0) {selectedCount++}

    })
    return 100 * selectedCount / activeCount
  }

  isActive(element: HousingSection, index: any, array: any): boolean {
    return (element.active);
  }

  homeFilter(element: HousingSection, index: any, array: any): boolean {
    return (element.category === 'Home' && element.locked === "false");
  }
  interiorFilter(element: HousingSection, index: any, array: any): boolean {
    return (element.category === 'Interior' && element.locked === "false");
  }
  propertyFilter(element: HousingSection, index: any, array: any): boolean {
    return (element.category === 'Property' && element.locked === "false");
  }

  writingFilter(element: HousingSection, index: any, array: any): boolean {
    return (element.category === 'Writing' && element.locked === "false");
  }

  updateSelections(selectedOptions: any, section: HousingSection) {
    section.selectedOptions = selectedOptions;
  }

  readyForSubmitValidation(): boolean {
    var res= false;
    this.sections.forEach((section) => {
      if (section.active && section.selectedOptions.length === 0){res= true}
      // TODO add MEMBER validations (can only use up to 8 total details)
    
    });
    return res
  }

  submitForm(){
    this.alService.createListing(this.createPrompt()).subscribe((res: Checkout) => {
      
      const navigationExtras: NavigationExtras = {
        queryParams: { checkoutID: res.checkoutID } ,
        state: {
          source: 'intake-form',
          message: 'dogs',
        }
      }
  
      this.router.navigate(['checkout'], navigationExtras)
    })
    
  }

  promptHelper(selectionMap: Map<string,string[]>, key: string, multiple: boolean = false, conditionPrefixText: string = " ", conditionSuffixText: string = " "){
    const res = selectionMap.get(key)
    
    if (res === undefined){
    if (multiple){
      return [];
    }
    return "";
  }

  if (multiple){
    return res;
  }

  return conditionPrefixText + res[0] + conditionSuffixText
  }

  createPrompt(): string{
    var selectionsMap = new Map();
    this.sections.filter(this.isActive).forEach((section) => {
      selectionsMap.set(section.name, section.selectedOptions)
    })

    var prompt = "Write me a " + this.promptHelper(selectionsMap, 'Writing Style')
    prompt = prompt + "real estate description " + this.promptHelper(selectionsMap, 'Writing Length', false, "that is ", " long ")
    prompt = prompt + "about a " + this.promptHelper(selectionsMap, 'Square Feet', false, "", "sqft, ")
    prompt = prompt + this.promptHelper(selectionsMap, "Home Style", false, "", "style ")
    prompt = prompt + this.promptHelper(selectionsMap, "Home Type", false, "", " ")
    prompt = prompt + "located in Manchester, Connecticut. "

    prompt = prompt + this.promptHelper(selectionsMap, "Year", false, "Built in", ", ")
    prompt = prompt + "This " + this.promptHelper(selectionsMap, "# Bedrooms", false, "", " bed, ")+ this.promptHelper(selectionsMap, "# Bathrooms", false, "", "bath ")
    prompt = prompt + "home "
    prompt = prompt + this.promptHelper(selectionsMap, "Stories", false, "with ", " stories, ")
    prompt = prompt + this.promptHelper(selectionsMap, "Basement", false, "including a ", " basement ")
    prompt = prompt + this.promptHelper(selectionsMap, "Heating", false, "with ", " heating and ")
    prompt = prompt + this.promptHelper(selectionsMap, "Air Conditioning", false, "cooled by ", ", ")

    prompt = prompt + "featuring "
    selectionsMap.get('Amenities & Upgrades').slice(0, -1).forEach((section: string) => {
      prompt = prompt + section + ", "
    })
  prompt = prompt + "and " + selectionsMap.get('Amenities & Upgrades').at(-1) + '.'

  prompt = prompt + this.promptHelper(selectionsMap, "Acreage", false, "It has ", " acres of land ")
  prompt = prompt + this.promptHelper(selectionsMap, "Location", false, "overlooking ", ", ")
  prompt = prompt + this.promptHelper(selectionsMap, "Parking", false, "In addition to having a ", " to provide plenty of parking")

  return prompt
  }

  generate_sections(): HousingSection[] {
    return sections
  }
}
