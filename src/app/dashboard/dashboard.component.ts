import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Chart } from 'chart.js';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { Order } from 'src/models/order.class';
import { Customer } from 'src/models/customer.class';





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  title = 'ng-chart';
  chart: any = [];

  firestore: Firestore = inject(Firestore);
  searchInput: string = '';
  unsubOrders;
  listOrders: any = [];

  listCustomerForChart: any = [];
  listSumsforChart: any = [];

  order = new Order();

  unsubCustomer;
  listCustomer: any = [];
  customer = new Customer();


  constructor() {
    this.unsubOrders = this.subOrdersList();
    this.unsubCustomer = this.subCustomerList();
  }

  subCustomerList() {
    const q = query(this.getCustomerRef());
    return onSnapshot(q, (list) => {
      this.listCustomer = [];
      this.listCustomerForChart = [];
      list.forEach(element => {
        this.listCustomer.push(this.setCustomerObject(element.data(), element.id));
        this.listCustomerForChart.push(element.data()['name'])
      });
      console.log(this.listCustomerForChart);
    });
  }



  setCustomerObject(obj: any, id: string,): Customer {
    return {
      id: id || "",
      customerNumber: obj.customerNumber || "",
      name: obj.name || "",
      street: obj.street || "",
      zipCode: obj.zipCode || "",
      city: obj.city || "",
      email: obj.email || "",
      phone: obj.phone || "",
      status: obj.status || "",
      infotext: obj.infotext || "",
    }
  }

  getCustomerRef() {
    return collection(this.firestore, 'customers');
  }




  subOrdersList() {
    let q;
    q = query(this.getOrdersRef());

    return onSnapshot(q, (list) => {
      this.listOrders = [];
      list.forEach(element => {
        this.listOrders.push(this.setOrder(element.data(), element.id));
        this.addSumToListForChart(element)
      });


    });
  }


  addSumToListForChart(element: any) {
    //const sum = Math.round(element.data()['sum'] * 100) / 100;




    //console.log(sum);





  }




  setOrder(obj: any, id: string,): Order {
    return {
      id: id || "",
      orderNumber: obj.orderNumber || "",
      customer: obj.customer || "",
      orderDate: obj.orderDate || "",
      deliveryDate: obj.deliveryDate || "",
      status: obj.status || "",
      note: obj.note || "",
      positions: obj.positions || "",
      sum: obj.sum || ""
    }
  }


  getOrdersRef() {
    return collection(this.firestore, 'orders');
  }









  ngOnInit(): void {

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }











  ngOnDestroy(): void {
    this.unsubCustomer();
    this.unsubOrders();
  }



}


