export interface HousingSection {
    name: string;
    category: string;
    active: boolean;
    choices: string[];
    multiple: string;
    icon: string;
    locked: string
    selectedOptions: string[];
  
  }

export const sections: HousingSection[] = [{
    name: 'Home Type', //section header,
    category: 'Home',
    active: true, //active by default. Changes with check boxes
    choices: ['House', 'Condo', 'Apartment', 'Townhome', 'Multi-Family'], //options to display by default
    multiple: "false", //can you select more than one option?
    icon: "home", //icon name. Choose from this list https://www.angularjswiki.com/angular/angular-material-icons-list-mat-icon-list/
    locked: "true", //is this locked, so the user cannot remove it from the options list?
    selectedOptions: []
  },
  {
    name: '# Bedrooms',
    category: 'Interior',
    active: false,
    choices: ['1', '2', '3', '4'],
    multiple: "false",
    icon: "home",
    locked: "false",
    selectedOptions: []
  },
  {
    name: '# Bathrooms',
    category: 'Interior',
    active: false,
    choices: ['1', '1.5', '2', '2.5', '3', '3.5'],
    multiple: "false",
    icon: "home",
    locked: "false",
    selectedOptions: []
  },
  {
    name: 'Home Style',
    category: 'Home',
    active: false,
    choices: ['Cape', 'Victorian', 'Ranch', 'Modern', 'Contemporary'],
    multiple: "false",
    icon: "home",
    locked: "false",
    selectedOptions: []
  },
  {
    name: 'Heating',
    category: 'Interior',
    active: true,
    choices: ['Natural Gas', 'Propane', 'Oil', 'Solar'],
    multiple: "false",
    icon: "home",
    locked: "false",
    selectedOptions: []
  },
  {
    name: 'Air Conditioning',
    category: 'Interior',
    active: false,
    choices: ['Central Air', 'Window Unit', 'Portable'],
    multiple: "false",
    icon: "home",
    locked: "false",
    selectedOptions: []
  },
  {
    name: 'Parking',
    category: 'Property',
    active: false,
    choices: ['One Car Garage', 'Two Car Garage', 'Large Driveway'],
    multiple: "false",
    icon: "home",
    locked: "false",
    selectedOptions: []
  },
  {
    name: 'Square Feet',
    category: 'Home',
    active: true,
    choices: [],
    multiple: "false",
    icon: "home",
    locked: "false",
    selectedOptions: []
  },
  {
    name: 'Acreage',
    category: 'Property',
    active: true,
    choices: [],
    multiple: "false",
    icon: "home",
    locked: "false",
    selectedOptions: []
  },
  {
    name: 'Year',
    category: 'Home',
    active: false,
    choices: [],
    multiple: "false",
    icon: "home",
    locked: "false",
    selectedOptions: []
  },
  {
    name: 'Basement',
    category: 'Interior',
    active: false,
    choices: ['Finished', 'Partially Finished'],
    multiple: "false",
    icon: "home",
    locked: "false",
    selectedOptions: []
  },
  {
    name: 'Stories',
    category: 'Home',
    active: false,
    choices: ['1', '2', '3'],
    multiple: "false",
    icon: "home",
    locked: "false",
    selectedOptions: []
  },
  {
    name: 'Location',
    category: 'Property',
    active: false,
    choices: ['Waterfront', 'City', 'Mountain', 'Woods', 'Rural'],
    multiple: "true",
    icon: "home",
    locked: "false",
    selectedOptions: []
  },
  {
    name: 'Amenities & Upgrades',
    category: 'Property',
    active: true,
    choices: ['Recently rennovated construction', 'Remodeled Bathroom', 'New Tile', 'Jacuzzi', 'Shower + Tub', 'Kitchen Island', 'Stainless Steel Appliances', 'Gas Stove', 'Electric Stove', 'Pool', 'Hot Tub', 'Tennis Court', 'Basketball Court', 'Gas Fireplace', 'Fireplace', 'New Flooring', 'New Roof', 'New Lighting', 'Solar Panel'],
    multiple: "true",
    icon: "home",
    locked: "true",
    selectedOptions: []
  },
  {
    name: 'Writing Length',
    category: 'Writing',
    active: false,
    choices: ['1 Paragraph', '2 Paragraphs', '3 Paragraphs'],
    multiple: "false",
    icon: "home",
    locked: "false",
    selectedOptions: []
  },
  {
    name: 'Writing Style',
    category: 'Writing',
    active: false,
    choices: ['Formal', 'Casual', 'Bullet list'],
    multiple: "false",
    icon: "home",
    locked: "false",
    selectedOptions: []
  }
]
