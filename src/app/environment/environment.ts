export const environment = {
    production: false,
    APP: {
          API_URL : APIURL,
          LOGIN_API: '/user/login',
          LOGOUT_API: '/user/logout',
          FORGOT_API:'/user/getResetPasswordToken',
          RESET_API: '/user/resetPassword',

          //Packages
          GET_ALL_PACKAGES: '/admin/getPackages',
          ADD_PACKAGE: '/admin/addPackage',
          DELETE_PACKAGE_BY_ID: '/admin/deletePackage',
          EDIT_PACKAGE_BY_ID_SUCCESS:'/admin/editPackage',
          ADD_CUSTOM_PACKAGE: '/admin/addCustomPackage',
          
          // Booking
          GET_ALL_BOOKING: '/admin/getAllAvailabeBooking',
          GET_ALL_OUTGOING_BOOKING: '/admin/getOngoingBooking',
          GET_ALL_PAST_BOOKING: '/admin/getPastBooking',
          GET_BOOKING_BY_ID: '/admin/getBookingDetails',
          CANCEL_BOOKING_BY_ID: '/admin/cancelBooking',
          SP_CANCEL_BOOKING_BY_ID: '/booking/cancelBooking',

          //Reports
          GET_BOOKINGS_REPORT:'/admin/getBookingsReport',
          GET_CUSTOMERS_REPORT:'/admin/getCustomersReport',
          GET_TASKERS_REPORT:'/admin/getTaskersReport',

          //FAQ
          ADD_FAQ:'/admin/addFAQ',
          GET_ALL_FAQ:'/admin/getFAQ',
          DELETE_FAQ_BY_ID:'/admin/deleteFAQ',
          EDIT_FAQ_BY_ID: '/admin/editFAQ',
          DELETE_PROMOCODE: '/promo/deletePromo',

          //Contact us
          CONTACTUS: '/admin/getAppContactUs',
          EDIT_CONTACTUS: '/admin/editAppContactUs',

          // Privacy policy
          GET_POLICY :'/admin/getPrivacyPolicy',
          UPDATE_POLICY : '/admin/editPrivacyPolicy',

          // Terms
          GET_TERMS :'/admin/getTermsAndConditions',
          EDIT_TERMS : '/admin/editTermsAndConditions',  

          // Send Notification To Users
          SEND_NOTIFICATION_TO_USERS :'/admin/sendNotificationToUsers',

          // Ratings
          GET_RATING: '/admin/getRatingsAndReviews',
          DELETE_REVIEW_BY_ID: '/admin/deleteReview',
          EDIT_REVIEW_BY_ID: '/admin/editReview',
          
          // Payments
          GET_ALL_PAYMENTS: '/admin/getPaymentDetails',

          // Get Logic Data
          GET_LOGIC_DATA: '/admin/getLogicData',

          // Set Logic Data
          EDIT_LOGIC_DETAILS: '/admin/setLogicData',

          // Promocodes
          GET_ALL_PROMOCODES: '/promo/listAllPromo',
          ADD_PROMOCODE: '/promo/addPromo',
          EDIT_PROMO_BY_ID:'/promo/editPromo',

          // Users/Customers
          GET_ALL_USER: '/admin/getAllUsers',
          GET_ALL_USER_BY_ID: '/admin/userDetails',
          BLOCK_USER_BY_ID: '/admin/blockUser',
          DELETE_USER_BY_ID: '/admin/deleteUser',
          REGISTER_SERVICE: '/admin/addServiceProvider',
          EDIT_USER_BY_ID: '/admin/userDetails/' ,
          ADD_CUSTOMER: '/admin/addCustomer',
          ADD_DRIVER: '/admin/driver/registerFromEmail',
          EDIT_USER_BY_ID_SUCCESS: '/admin/updateCustomer',
          EDIT_SERVICE_BY_ID: '/admin/userDetails/' ,
          EDIT_SERVICE_BY_ID_SUCCESS: '/admin/updateServiceProvider',
          REGISTER_CUSTOMER: '/admin/addCustomer',
          REGISTER_DRIVER: '/admin/addDriver',
          SP_REGISTER_DRIVER: '/serviceProvider/addDriver',
          EDIT_DRIVER_BY_ID_SUCCESS: '/admin/driver/updateProfile',
          VERIFY_DRIVER_BY_ID_SUCCESS: '/admin/verifyTasker',
          SP_EDIT_DRIVER_BY_ID_SUCCESS: '/serviceProvider/updateDriver',
          CHANGE_PASSWORD :'/user/changePassword',
          GET_DASHBOARD_COUNT: '/admin/getDashboardCount',
          SP_GET_DASHBOARD_COUNT: '/serviceProvider/getDashboardCount',
          GET_ALL_LANGUAGE: '/multilingual/getAllLocales',
          GET_ALL_RESOURCE_BUNDLE: '/multilingual/getAllResourceBundle',
          SP_REGISTER_SP: '/serviceProvider/register',
          GET_BOOKING_DETAILS: '/user/getDetailedReport',
          
          // Notifictions
          GET_ALL_NOTIFICATION: '/notification/admin/getAllNotification',
          CLEAR_ALL_NOTIFICATION: '/notification/admin/clearNotification',
          READ_NOTIFICATION: '/notification/admin/readNotification',
          SETTINGS_KEY_MESSAGE:'/multilingual/addResourceBundle',
          GET_APP_VERSION: '/appVersion/getCurrentVersions',
          UPDATE_APP_VERSION: '/appVersion/setAppVersions',
    }
  };
  