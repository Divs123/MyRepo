import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as customer from '../../state/customer.actions';
import { BaThemeSpinner } from '../../../../theme/services';
import { BookingModal } from '../booking-modal/booking-modal.component';
import { ActivatedRoute } from '@angular/router';
import 'style-loader!./customer-booking-details.scss';

@Component({
  selector: 'customer-booking-details',
  templateUrl: 'customer-booking-details.html'
  ,
})
export class CustomerBookingDetails implements OnDestroy {

  public page = 1;
  public limit = 10;
  public userID;
  public bookingss;
  public pageIndex;
  public skip;
  public count;
  id: number;
  private sub: any;

  constructor(private store: Store<any>,
    private baThemeSpinner: BaThemeSpinner,
    private modalService: NgbModal, private route: ActivatedRoute
  ) {

    this.sub = this.store.select('customer')
      .subscribe((res: any) => {
        this.bookingss = (res.getBookingDetailSuccess) ? res.getBookingDetailSuccess.bookings : [];
        this.pageIndex = (res.currentPage - 1) * res.limit;
        if (res.getBookingDetailSuccess) {
          this.count = res.getBookingDetailSuccess.count;
        }
      });

    this.route.params.subscribe(params => {
      this.id = params.id;
    });

    this.store.dispatch(
      {
        type: customer.actionTypes.GET_BOOKING_DETAILS,
        payload: {
          currentPage: this.page,
          limit: this.limit,
          filter: 'customer',
          userID: this.id
        }

      });
  }

  getPagesCount(page) {
    this.skip = 0;
    this.store.dispatch({ type: customer.actionTypes.GET_BOOKING_DETAILS, payload: { currentPage: 1, limit: this.limit, filter: 'customer', userID: this.id, skip: this.skip } });

  }
  pageChanged(page) {
    this.page = page;
    this.store.dispatch({
      type: customer.actionTypes.GET_BOOKING_DETAILS, payload: {
        currentPage: this.page,
        limit: this.limit,
        filter: 'customer',
        userID: this.id
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
