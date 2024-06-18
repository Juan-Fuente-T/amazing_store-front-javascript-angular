import { Component } from '@angular/core';
/**
 * AppComponent is the root component of the application.
 * It typically contains the main layout and navigation structure.
 * This component is loaded first when the application starts.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
/**
 * Class representing the state and behavior of the AppComponent.
 */
export class AppComponent {
  /**
   * Title of the application displayed in the header or title bar.
   */
  title = 'appmazing-front';
}
