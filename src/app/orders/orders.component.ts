import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddOrderComponent } from '../dialog-add-order/dialog-add-order.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {


  constructor(public dialog: MatDialog) {
    
  }














  
  openDialogAddOrder() {
    console.log('Add order');
    this.dialog.open(DialogAddOrderComponent);
  }






}
