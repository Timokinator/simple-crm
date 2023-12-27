import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Chart } from 'chart.js';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { Order } from 'src/models/order.class';
import { Customer } from 'src/models/customer.class';
import { count, getDocs } from 'firebase/firestore';





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy, OnInit {
  chartSalesStatistic: any = [];
  chartOrderStatus: any = [];
  chartOrderValueDeliveryDate: any = [];

  firestore: Firestore = inject(Firestore);
  searchInput: string = '';
  listOrders: any = [];

  listCustomerForChart: any = [];
  listSumsForChart: any = [];

  listStatus = ['Pending', 'Processing', 'Shipped', 'Delivered'];
  listStatusForChartOrderStatus = [0, 0, 0, 0];

  listOfMonthsLabel: any = [];
  listOfMonthsNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  monthStartChartOrdersDeliveryDate!: number;
  listOrderVolumeByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  listOfMonthsNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


  order = new Order();

  listCustomer: any = [];
  customer = new Customer();

  averageOderValue: number = 0;




  constructor() { }


  async ngOnInit(): Promise<void> {
    await this.subCustomerList();
    await this.subOrdersList();
    this.initChartSalesStatistic();
    this.initChartAverageOrderValue();
    this.setListOrderStatus();
    this.loadChartOrderStatus();
    this.setListOfMonthsLabel();
    this.setListOrderVolumeByMonth();
    this.loadChartOrderValueDeliveryDate();
  }


  //Code for orders by delivery date


  loadChartOrderValueDeliveryDate() {
    this.chartOrderValueDeliveryDate = new Chart('canvas-orders-delivery-date', {
      type: 'line',
      data: {
        labels: this.listOfMonthsLabel,
        datasets: [{
          label: 'Order value',
          data: this.listOrderVolumeByMonth,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
      },
    })
  };


  setListOrderVolumeByMonth() {
    this.listOrders.forEach((order: any) => {
      if (order['status'] == 'Pending' || order['status'] == 'Processing') {

        const date = new Date(order['deliveryDate'])
        const month = date.getMonth() + 1;

        if (this.monthStartChartOrdersDeliveryDate != month) {
          this.listOrderVolumeByMonth[this.monthStartChartOrdersDeliveryDate - (12 - month)] += order['sum']
        } else {
          this.listOrderVolumeByMonth[this.monthStartChartOrdersDeliveryDate - month] += order['sum']
        }

      }
    });
  };


  setListOfMonthsLabel() {
    let arrayForNumbers: any = [];

    this.listOrders.forEach((order: any) => {
      const date = new Date(order['deliveryDate'])
      arrayForNumbers.push(date);
    });

    this.monthStartChartOrdersDeliveryDate = Math.min(...arrayForNumbers);
    const newDate = new Date(this.monthStartChartOrdersDeliveryDate);
    const correctDate = newDate.getMonth() + 1;

    this.monthStartChartOrdersDeliveryDate = correctDate;

    this.listOfMonthsLabel.push(this.listOfMonthsNames[this.monthStartChartOrdersDeliveryDate - 1])

    for (let i = 0; i < 11; i++) {
      if (this.monthStartChartOrdersDeliveryDate + i == 12 && this.monthStartChartOrdersDeliveryDate != 12) {
        this.listOfMonthsLabel.push(this.listOfMonthsNames[0])
      } else if (this.monthStartChartOrdersDeliveryDate + i > 12) {
        this.listOfMonthsLabel.push(this.listOfMonthsNames[this.monthStartChartOrdersDeliveryDate - 12 + i])
      } else {
        this.listOfMonthsLabel.push(this.listOfMonthsNames[i])
      };
    }
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
  };


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
  };


  getOrdersRef() {
    return collection(this.firestore, 'orders');
  };

  loggingLists() {
    console.log('Customer: ', this.listCustomer);
    console.log('Customer-Chart: ', this.listCustomerForChart);
    console.log('Orders: ', this.listOrders);
    console.log('Sums for Chart: ', this.listSumsForChart);
    console.log('Chart: ', this.chartSalesStatistic);
  };

  // Code for Sales statistics chart

  async initChartSalesStatistic() {
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
  };


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
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192)',
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
        maintainAspectRatio: true,
      },
    });
  };


  ngOnDestroy(): void {
    //this.unsubCustomer();
    //this.unsubOrders();
    //this.chart.destroy();
  }



  //Sorting date für sales statistics chart

  sortingSalesStatistics() {
    let data = {
      labels: this.listCustomerForChart,
      datasets: [{
        label: 'Sales in $',
        data: this.listSumsForChart,
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



  //Code for order statistics

  initChartAverageOrderValue() {
    let sumOfOrders: number = 0;
    let countOfOrders: number = 0;

    this.listOrders.forEach((element: any) => {
      sumOfOrders += element['sum'];
      countOfOrders += 1;
    });
    this.averageOderValue = Math.round(sumOfOrders / countOfOrders);
  }



  setListOrderStatus() {
    this.listOrders.forEach((order: any) => {
      const index = this.listStatus.indexOf(order.status)
      this.listStatusForChartOrderStatus[index] += 1;
    });
  }


  loadChartOrderStatus() {
    this.chartOrderStatus = new Chart('canvas-orders', {
      type: 'doughnut',
      data: {
        labels: this.listStatus,
        datasets: [{
          label: 'Orders by Status',
          data: this.listStatusForChartOrderStatus,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)'
          ],
          hoverOffset: 4,
        }]
      },
      options: {
        radius: '100%'
      }
    })
  }





}


