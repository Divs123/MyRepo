---

title: Theme Spinner
---

Theme Spinner BaThemeSpinner is a small service helper allowing you to show a preloader spinner while executing some long-running tasks. This is the same spinner you can see after reloading a page.

The user interface in quite simple: there are two public methods: show and hide.
Theme Spinner comes with another small helper called BaThemePreloader. This service is globally integrated into the application and connected to the spinner.
You can register any promise in any part of the application so that the spinner will be hidden only after your promise is completed (resolved).
You can find an example of usage inside of the app.component.ts file. Here we are registering a loader (this._imageLoader.load just returns a Promise) which loads a background image:

BaThemePreloader.registerLoader(this._imageLoader.load(layoutPaths.images.root + 'blur-bg-mobile.jpg'));
Then we are starting all the registered promises and once they all are done - hiding the spinner.
BaThemePreloader.load().then((values) => {
       this._spinner.hide();
  });
Example

You also can register a loader on any page you want. Say you have a long-running task on the Charts page (you need to receive some data from a web service) and you want the spinner to be shown while the data is loading.
First thing you need to do is to import BaThemePreloader service:
  import { BaThemePreloader } from '../../../../theme/services';
Then, say you have a method loading some data called _loadData, in our case we just mocked this method with setTimeout to emulate the loading process:
  private _loadData():Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 4000);
    });
  }

Last thing you need to do is to register your loader:
BaThemePreloader.registerLoader(this._loadData());
That's basically it! Once your data is loaded and all other registered loaders are completed - the spinner will be hidden.