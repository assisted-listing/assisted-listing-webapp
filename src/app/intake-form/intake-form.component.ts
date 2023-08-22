import { Component, ViewChild } from '@angular/core';
import { CollapsibleFormComponent } from './collapsible-form/collapsible-form.component';
import { MatAccordion } from '@angular/material/expansion';
import { OpenAiService } from '../services/open-ai.service';

/**
 * @title Accordion with expand/collapse all toggles
 */
export interface HousingSection {
  name: string;
  active: boolean;
  choices: string[];
  multiple: string;
  icon: string;
  locked: string
  selectedOptions: string[];

}
@Component({
  selector: 'intakeForm',
  templateUrl: './intake-form.component.html',
  styleUrls: ['./intake-form.component.scss'],
})
export class IntakeFormComponent {
  constructor(private openAIService: OpenAiService) { }
  responseMessage: string;
  


  sections: HousingSection[] = this.generate_sections()

  isActive(element: HousingSection, index: any, array: any): boolean {
    return (element.active);
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
    this.openAIService.getListing(this.createPrompt()).subscribe((res: any) => {
      this.responseMessage = res['choices'][0]['message']['content']
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





      // if (section.name === "Home Type"){prompt += "It is a " + section.selectedOptions[0] + ". "}
      // if (section.name === "Address"){prompt += "It is a " + section.selectedOptions[0] + ". "}
      // if (section.name === "# Bedrooms"){prompt += "It is a " + section.selectedOptions[0] + ". "}
      // if (section.name === "# Bathrooms"){prompt += "It is a " + section.selectedOptions[0] + ". "}
      // if (section.name === "Home Style"){prompt += "It is a " + section.selectedOptions[0] + ". "}
      // if (section.name === "Heating"){prompt += "It is a " + section.selectedOptions[0] + ". "}
      // if (section.name === "Air Conditioning"){prompt += "It is a " + section.selectedOptions[0] + ". "}
      // if (section.name === "Parking"){prompt += "It is a " + section.selectedOptions[0] + ". "}
      // if (section.name === "Square Feet"){prompt += "It is a " + section.selectedOptions[0] + ". "}
      // if (section.name === "Acreage"){prompt += "It is a " + section.selectedOptions[0] + ". "}
      // if (section.name === "Year"){prompt += "It is a " + section.selectedOptions[0] + ". "}
      // if (section.name === "Basement"){prompt += "It is a " + section.selectedOptions[0] + ". "}
      // if (section.name === "Stories"){prompt += "It is a " + section.selectedOptions[0] + ". "}
      // if (section.name === "Location"){prompt += "It is a " + section.selectedOptions[0] + ". "}
      // if (section.name === "Kitchen Features"){prompt += "It is a " + section.selectedOptions[0] + ". "}
      // if (section.name === "Bathroom Features"){prompt += "It is a " + section.selectedOptions[0] + ". "}
      // if (section.name === "Amenities"){prompt += "It is a " + section.selectedOptions[0] + ". "}
      


    
  }

  generate_sections(): HousingSection[] {
    return [
      {
        name: 'Home Type', //section header
        active: true, //active by default. Changes with check boxes
        choices: ['House', 'Condo', 'Apartment', 'Townhome', 'Multi-Family'], //options to display by default
        multiple: "false", //can you select more than one option?
        icon: "home", //icon name. Choose from this list https://www.angularjswiki.com/angular/angular-material-icons-list-mat-icon-list/
        locked: "true", //is this locked, so the user cannot remove it from the options list?
        selectedOptions: []
      },
      {
        name: '# Bedrooms',
        active: false,
        choices: ['1', '2', '3', '4'],
        multiple: "false",
        icon: "home",
        locked: "false",
        selectedOptions: []
      },
      {
        name: '# Bathrooms',
        active: false,
        choices: ['1', '1.5', '2', '2.5', '3', '3.5'],
        multiple: "false",
        icon: "home",
        locked: "false",
        selectedOptions: []
      },
      {
        name: 'Home Style',
        active: false,
        choices: ['Cape', 'Victorian', 'Ranch', 'Modern', 'Contemporary'],
        multiple: "false",
        icon: "home",
        locked: "false",
        selectedOptions: []
      },
      {
        name: 'Heating',
        active: true,
        choices: ['Natural Gas', 'Propane', 'Oil', 'Solar'],
        multiple: "false",
        icon: "home",
        locked: "true",
        selectedOptions: []
      },
      {
        name: 'Air Conditioning',
        active: false,
        choices: ['Central Air', 'Window Unit', 'Portable'],
        multiple: "false",
        icon: "home",
        locked: "false",
        selectedOptions: []
      },
      {
        name: 'Parking',
        active: false,
        choices: ['One Car Garage', 'Two Car Garage', 'Large Driveway'],
        multiple: "false",
        icon: "home",
        locked: "false",
        selectedOptions: []
      },
      {
        name: 'Square Feet',
        active: true,
        choices: [],
        multiple: "false",
        icon: "home",
        locked: "false",
        selectedOptions: []
      },
      {
        name: 'Acreage',
        active: true,
        choices: [],
        multiple: "false",
        icon: "home",
        locked: "false",
        selectedOptions: []
      },
      {
        name: 'Year',
        active: false,
        choices: [],
        multiple: "false",
        icon: "home",
        locked: "false",
        selectedOptions: []
      },
      {
        name: 'Basement',
        active: false,
        choices: ['Finished', 'Partially Finished'],
        multiple: "false",
        icon: "home",
        locked: "false",
        selectedOptions: []
      },
      {
        name: 'Stories',
        active: false,
        choices: ['1', '2', '3'],
        multiple: "false",
        icon: "home",
        locked: "false",
        selectedOptions: []
      },
      {
        name: 'Location',
        active: false,
        choices: ['Waterfront', 'City', 'Mountain', 'Woods', 'Rural'],
        multiple: "true",
        icon: "home",
        locked: "false",
        selectedOptions: []
      },
      {
        name: 'Amenities & Upgrades',
        active: true,
        choices: ['Recently rennovated construction', 'Remodeled Bathroom', 'New Tile', 'Jacuzzi', 'Shower + Tub', 'Kitchen Island', 'Stainless Steel Appliances', 'Gas Stove', 'Electric Stove', 'Pool', 'Hot Tub', 'Tennis Court', 'Basketball Court', 'Gas Fireplace', 'Fireplace', 'New Flooring', 'New Roof', 'New Lighting', 'Solar Panel'],
        multiple: "true",
        icon: "home",
        locked: "true",
        selectedOptions: []
      },
      {
        name: 'Writing Length',
        active: false,
        choices: ['1 Paragraph', '2 Paragraphs', '3 Paragraphs'],
        multiple: "false",
        icon: "home",
        locked: "false",
        selectedOptions: []
      },
      {
        name: 'Writing Style',
        active: false,
        choices: ['Formal', 'Casual', 'Bullet list'],
        multiple: "false",
        icon: "home",
        locked: "false",
        selectedOptions: []
      }
    ]
  }
}
