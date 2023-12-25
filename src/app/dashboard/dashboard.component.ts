import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Chart } from 'chart.js';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { Order } from 'src/models/order.class';
import { Customer } from 'src/models/customer.class';





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy, OnInit {
  title = 'ng-chart';
  chart: any = [];

  firestore: Firestore = inject(Firestore);
  searchInput: string = '';
  unsubOrders;
  listOrders: any = [];

  listCustomerForChart: any = [];
  listSumsForChart: any = [];

  order = new Order();

  unsubCustomer;
  listCustomer: any = [];
  customer = new Customer();


  constructor() {
    this.unsubCustomer = this.subCustomerList();
    this.unsubOrders = this.subOrdersList();
  }

  ngOnInit(): void {
    console.log(this.chart);
    console.log(this.listCustomerForChart);
    console.log(this.listSumsForChart);


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
      this.listCustomerForChart.push('Unknown')
      //console.log(this.listCustomerForChart);
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
      this.listSumsForChart = [];
      this.createListSumsForChart();
      list.forEach(element => {
        this.listOrders.push(this.setOrder(element.data(), element.id));
        this.addSumToListForChart(element);
      });
      //console.log(this.listSumsForChart)
      this.loadChart();
      this.chart.update();
    });
  }


  createListSumsForChart() {
    for (let i = 0; i < this.listCustomerForChart.length; i++) {
      this.listSumsForChart.push(0);
    }
  }


  addSumToListForChart(element: any) {
    const sum = Math.round(element.data()['sum'] * 100) / 100;
    const indexOfCustomer = this.listCustomerForChart.indexOf(element.data()['customer'].name)

    if (indexOfCustomer != -1) {
      this.listSumsForChart[indexOfCustomer] += sum;
    } else {
      this.listSumsForChart[this.listCustomerForChart.length - 1] += sum;
    }
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



  loadChart() {

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        labels: this.listCustomerForChart,
        datasets: [
          {
            label: 'Sales in $',
            //data: [12, 19, 3, 5, 2, 3],
            data: this.listSumsForChart,
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
    this.chart.destroy();
    this.chart = '';
  }



}


