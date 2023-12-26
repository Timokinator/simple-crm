import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Chart } from 'chart.js';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { Order } from 'src/models/order.class';
import { Customer } from 'src/models/customer.class';
import { getDocs } from 'firebase/firestore';





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy, OnInit {
  chartSalesStatistic: any = [];

  firestore: Firestore = inject(Firestore);
  searchInput: string = '';
  listOrders: any = [];

  listCustomerForChart: any = [];
  listSumsForChart: any = [];

  order = new Order();

  listCustomer: any = [];
  customer = new Customer();


  constructor() {
    //this.unsubCustomer = this.subCustomerList();
    //this.unsubOrders = this.subOrdersList();
  }

  ngOnInit(): void {
    this.initChartSalesStatistic();
  }



  async initChartSalesStatistic() {
    await this.subCustomerList();
    await this.subOrdersList();
    this.listCustomer.forEach((customer: Customer) => {
      this.listCustomerForChart.push(customer.name)
    });
    this.listCustomerForChart.push('Unknown')
    this.createListSumsForChart();
    this.listOrders.forEach((order: Order) => {
      this.addSumToListForChart(order);
    });
    let values = this.sortingSalesStatistics();
    this.loadChartSalesStatistic(values[0], values[1]);
  }


  async subCustomerList() {
    const q = query(this.getCustomerRef());
    return getDocs(q).then((list) => {
      this.listCustomer = [];
      this.listCustomerForChart = [];
      list.forEach(element => {
        this.listCustomer.push(this.setCustomerObject(element.data(), element.id));
      });
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


  async subOrdersList() {
    let q;
    q = query(this.getOrdersRef());

    return getDocs(q).then((list) => {
      this.listOrders = [];
      this.listSumsForChart = [];
      list.forEach(element => {
        this.listOrders.push(this.setOrder(element.data(), element.id));
      });
    });
  }


  createListSumsForChart() {
    for (let i = 0; i < this.listCustomerForChart.length; i++) {
      this.listSumsForChart.push(0);
    }
  }


  addSumToListForChart(order: Order) {
    const sum = Math.round(order.sum * 100) / 100;
    const indexOfCustomer = this.listCustomerForChart.indexOf(order.customer.name)

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

  loggingLists() {
    console.log('Customer: ', this.listCustomer);
    console.log('Customer-Chart: ', this.listCustomerForChart);
    console.log('Orders: ', this.listOrders);
    console.log('Sums for Chart: ', this.listSumsForChart);
    console.log('Chart: ', this.chartSalesStatistic);
  }


  loadChartSalesStatistic(labels: any, datasets: any) {
    this.chartSalesStatistic = new Chart('canvas-sales', {
      type: 'bar',
      data: {
        //labels: this.listCustomerForChart,
        labels: labels,
        datasets: [
          {
            label: 'Sales in $',
            //data: this.listSumsForChart,
            data: datasets,
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
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }


  ngOnDestroy(): void {
    //this.unsubCustomer();
    //this.unsubOrders();
    //this.chart.destroy();
  }



  //Test zum Sortieren







  sortingSalesStatistics() {

    let data = {
      labels: this.listCustomerForChart,
      datasets: [{
        label: 'Sales in $',
        data: this.listSumsForChart,
        backgroundColor: 'rgba(0, 123, 255, 0.5)'
      }]
    };

    // Sortieren der Daten
    let sortedIndices = data.datasets[0].data
      .map((value: any, index: any) => ({ value, index }))
      .sort((a: any, b: any) => b.value - a.value)
      .map((data: any) => data.index);

    data.labels = sortedIndices.map((index: any) => data.labels[index]);
    data.datasets[0].data = sortedIndices.map((index: any) => data.datasets[0].data[index]);

    return [data.labels, data.datasets[0].data]
  }






}


