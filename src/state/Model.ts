export enum Color {
    Red,
    Green,
    Yellow,
    Blue, 
    Purple
}

export interface ColorSelection {
    color: Color;
}

export interface Model {
    selectedColor: ColorSelection;
}



