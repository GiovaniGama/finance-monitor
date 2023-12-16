import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FincanceNameActionsInterface } from '../../interfaces/finance-name-actions.interface';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
})
export class InputSelectComponent {

  @Input() label: string | undefined
  @Input() financeName: FincanceNameActionsInterface[] = []
  @Output() valueSelected = new EventEmitter<string>();

  selectedValue: string | undefined

  onValueSelected(){
    console.log(this.selectedValue)
    this.valueSelected.emit(this.selectedValue)
  }
}
