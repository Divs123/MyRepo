import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as customer from '../../state/customer.actions';
import { BaThemeSpinner } from '../../../../theme/services';
import { BlockCustomerModal } from '../block-customer-modal/block-customer-modal.component';
import { CustomerModal } from '../customer-modal/cusotomer-modal.component';
import { CustomerActionModel } from '../customer-action-model/customer-action-modal';
import { DeleteCustomerModal } from '../delete-customer-modal/delete-customer-modal.component';
import * as role from '../../../../roles/state/role.actions';
import { AddCustomerModal } from '../add-customer-modal/add-customer-modal.component';
import { EditCustomerModal } from '../edit-customer-modal/edit-customer-modal.component';
import { IMultiSelectOption, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { Router } from '@angular/router';
import 'style-loader!./all-customers.scss';
// import { Ng2OrderModule } from 'ng2-order-pipe';

@Component({
  selector: 'allcustomers',
  templateUrl: 'all-customers.html',
})
export class AllCustomers implements OnDestroy{

  subscription: Subscription;
  public customers;
  public page = 1;
  public limit = 10;
  public searchKey = '';
  public pageIndex;
  public count: number;
  public activeCustomer;
  public name: string;
  public role: string;
  public searchString: string;
  public searchFilter: boolean;
  public value: 'all';
  public hideCustomer: boolean = false;
  roles;
  roleValue;
  public filter;  // type of customer .. i.e isAdminVerified
  public optionAdminVerify;
  public optionDeleted;
  public optionBlocked;
  public selectTitle;
  myTexts: IMultiSelectTexts;
  optionsModel: number[];
  myOptions: IMultiSelectOption[];
  myOptionsSelected;
  public skip;
  order: string = 'name';
  reverse: boolean = false;

  constructor(
    private store: Store<any>,
    private modalService: NgbModal,private router: Router
  ) {

    this.myOptionsSelected = [
      { id: 'isAdminVerified', value: 'all' },
      { id: 'isDeleted', value: false },
      { id: 'isBlocked', value: 'all' },
    ];


    this.subscription=this.store
      .select('customer')
      .subscribe((res: any) => {
        this.customers = res.customers;
        this.count = res.count;
        this.activeCustomer = (res.activeCustomer) ? res.activeCustomer : null;
        this.pageIndex = (res.currentPage - 1) * res.limit;
      });

    this.onLoad();
  };

  onLoad() {

    this.role = 'customer';
    this.value = 'all';
    this.filter = this.myOptionsSelected;  //@todo fix this add isDeleted (enabled only for testing )

    this.getAllCustomer();
  };

  getPagesCount(value){
    this.skip=0;
    this.store.dispatch({
      type: customer.actionTypes.APP_GETALL_CUSTOMER, payload: {
        currentPage: 1,
        limit: this.limit,
        role: this.role,
        filter: this.filter,
        value: this.value,
        skip:this.skip
        
      }
    });
}
  setOrder(value) {
    this.order=value;
    this.reverse=!this.reverse;
  }

  // GET ALL CUSTOMER LIST
  getAllCustomer() {
     
    this.store.dispatch({
      type: customer.actionTypes.APP_GETALL_CUSTOMER, payload: {
        currentPage: this.page,
        limit: this.limit,
        role: this.role,
        filter: this.filter,
        value: this.value
        
      }
    });
    
  };

  pageChanged(page) {
    this.page = page;
    this.searchKey = (this.searchKey.length > 2) ? this.searchKey : '';
    this.store.dispatch({
      type: customer.actionTypes.APP_GETALL_CUSTOMER, payload: {
        customer: (this.searchKey != '') ? this.searchKey : undefined,
        currentPage: this.page,
        limit: this.limit,
        role: this.role,
        filter: this.filter,
        value: this.value
      }
    });
  }



  // GET CUSTOMER DETAILS
  showCustomerDetail(data) {
    this.store.dispatch({
      type: customer.actionTypes.SHOW_CUSTOMER_DETAIL,
      payload: {
        customer: data
      }
    });
    this.lgModalShow();
  }
  lgModalShow() {
    const activeModal = this.modalService.open(CustomerModal, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'Large Modal';
  }
  SearchCustomer(name) {
    this.searchKey = name;
    console.log('this.searchkey',this.searchKey);
    if (name.length > 2) {
      this.searchFilter = true;
      this.page = 1;
      this.store.dispatch({
        type: customer.actionTypes.SEARCH_CUSTOMER_DETAIL,
        payload: {
          customer: name,
          currentPage: 1,
          limit: this.limit,
          skip: 0,
          role: this.role,
          filter: this.filter
        }
      });
    } else if (name.length == 0) {
      this.page = 1;
      this.getAllCustomer();
    }

  }

  /*
    Confirm Delete customer
   */
  deleteCustomerConfirm(uData) {

    this.store.dispatch({
      type: customer.actionTypes.DELETE_CUSTOMER_RECORD_CONFIRM,
      payload: uData
    });
    const customerActionModel = this.modalService.open(DeleteCustomerModal, { size: 'lg' });
    customerActionModel.componentInstance.modalHeader = 'Large Modal';
  }

  
  /*
   Confirm Block Unblock customer
   */
  blockCustomerConfirm(uData) {
    this.store.dispatch({
      type: customer.actionTypes.BLOCK_THIS_CUSTOMER_CONFIRM,
      payload: uData
    });
    const customerActionModel = this.modalService.open(BlockCustomerModal, { size: 'lg' });
    customerActionModel.componentInstance.modalHeader = 'Large Modal';
  }


  customerActionModelOpen() {
    const customerActionModel = this.modalService.open(CustomerActionModel, { size: 'lg' });
    customerActionModel.componentInstance.modalHeader = 'Large Modal';
  }


  createCustomer() {
    const customerActionModel = this.modalService.open(AddCustomerModal, { size: 'lg' });
    customerActionModel.componentInstance.modalHeader = 'Large Modal';
  }

  editCustomer(data) {

    this.store.dispatch({
      type: customer.actionTypes.EDIT_THIS_CUSTOMER_CONFIRM,
      payload: data
    });
    const customerActionModel = this.modalService.open(EditCustomerModal, { size: 'lg' });
    customerActionModel.componentInstance.modalHeader = 'Large Modal';
  }


  onChange() {
    for (let j = 0; j < this.myOptionsSelected.length; j++) {
      let i;
      for (i = 0; i < this.optionsModel.length; i++) {
        if (this.optionsModel[i] == this.myOptionsSelected[j].id) {
          this.myOptionsSelected[j].value = true;

          break;
        }
      }
      if (i == this.optionsModel.length) {

        this.myOptionsSelected[j].value = false;
      }
    }
    if(this.myOptionsSelected[0].value== false&&this.myOptionsSelected[1].value== false&&this.myOptionsSelected[2].value== false){
      this.myOptionsSelected[0].value='all';
      this.myOptionsSelected[1].value= false;
      this.myOptionsSelected[2].value='all';
  }

    this.role = 'customer';
    this.filter = this.myOptionsSelected;


    this.store.dispatch({ type: customer.actionTypes.APP_GETALL_CUSTOMER, payload: { currentPage: this.page, role: this.role, limit: this.limit, filter: this.filter } });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  viewBookings(data){
    this.router.navigate(['pages/customer/customer-booking-details',data._id]);
  }


}
