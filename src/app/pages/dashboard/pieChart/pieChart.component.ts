import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BaThemeConfigProvider, ColorHelper } from '../../../theme';
import { PieChartService } from './pieChart.service';
import { Store } from '@ngrx/store';
import 'easy-pie-chart/dist/jquery.easypiechart.js';
import 'style-loader!./pieChart.scss';
import * as dashBoard from '../state/dashboard.actions';
import * as role from '../../../roles/state/role.actions';



@Component({
  selector: 'pie-chart',
  templateUrl: './pieChart.html'
})
// TODO: move easypiechart to component
export class PieChart implements OnDestroy{
  subscription: Subscription;
  public charts: Array<Object>;
  private _init = false;
  public roles;
  roleValue;
  role;

 
  constructor(private _pieChartService: PieChartService, private _baConfig: BaThemeConfigProvider, private store: Store<any>) {
         this.store
      .select('role')
      .subscribe((res: any) => {
        //setting language
        this.roles = res;
       
        if(this.roles.role!= null)
        {
            this.role=res.role;
        }
        if (this.roles.roleDetail != null) {
          this.roleValue = res.roleDetail.roleDetail;


        }

      });
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;


    this.subscription=this.store
      .select('dashBoard')
      .subscribe((res: any) => {
        if (res.dashBoardCount != null) {
          this.charts =
            [
            {
              color: pieColor,
            //   description: this.language.bookingCount,
              description:'Total Booking Count',
              stats: res.dashBoardCount.data.totalBookingCount,
              icon: 'person',
              
            },
            {
              color: pieColor,
            //   description: this.language.customerCount,
            //   stats: res.dashBoardCount.data.totalCustomerCount,
            description: 'Asker Count',
            stats: res.dashBoardCount.data.totalCustomerCount,
            icon: 'money',
              
            },
            {
              color: pieColor,
            //   description: this.language.driverCount,
            //   stats: res.dashBoardCount.data.totalDriverCount,
            description: 'Tasker Count',
            stats: res.dashBoardCount.data.totalDriverCount,
            icon: 'face',
             
            },
            // {
            //   color: pieColor,
            //   description: this.language.serviceProviderCount,
            //   stats: res.dashBoardCount.data.totalServiceProviderCount,
            //   icon: 'refresh',
              
            // },
            // {
            //   color: pieColor,
            //   description: this.language.todaysBookingRequests,
            //   stats: res.dashBoardCount.data.todaysBookingRequestsCount,
            //   icon: 'money',
             
            // },
            // {
            //   color: pieColor,
            //   description: this.language.todaysRevenue,
            //   stats: res.dashBoardCount.data.todaysRevenue,
            //   icon: 'money',
              
            // },
            {
              color: pieColor,
            //   description: this.language.todayBookingCount,
              description: 'Today Booking Count',
              stats: res.dashBoardCount.data.todaysBookingRequestsCount,
              icon: 'money',
              
            }
            ];
        }


      });
    this.store.dispatch({ type: dashBoard.actionTypes.GET_DASHBOARD_COUNT });


  }

  // ngAfterViewInit() {
  //   if (!this._init) {
  //     this._loadPieCharts();
  //     this._updatePieCharts();
  //     this._init = true;
  //   }
  // }

  private _loadPieCharts() {

    jQuery('.chart').each(function () {
      let chart = jQuery(this);
      chart.easyPieChart({
        easing: 'easeOutBounce',
        onStep: function (from, to, percent) {
          jQuery(this.el).find('.percent').text(Math.round(percent));
        },
        barColor: jQuery(this).attr('data-rel'),
        trackColor: 'rgba(0,0,0,0)',
        size: 84,
        scaleLength: 0,
        animation: 2000,
        lineWidth: 9,
        lineCap: 'round',
      });
    });
  }

  private _updatePieCharts() {
    let getRandomArbitrary = (min, max) => { return Math.random() * (max - min) + min; };

    jQuery('.pie-charts .chart').each(function (index, chart) {
      jQuery(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
   
  }
  

}
