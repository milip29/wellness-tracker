import {Component, NgZone} from '@angular/core';
import {DbService} from "../../services/db.service";

declare var device: any;

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  deviceInfo: string = '';

  constructor(private zone: NgZone) {
  }

  ngOnInit(): void {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  }
  onDeviceReady() {
    console.log('Device Ready');
    this.zone.run(() => {
      console.log('Zone Run');
      this.deviceInfo = `Device Model: ${device.model} \n` +
        `Device Cordova: ${device.cordova} \n` +
        `Device Platform: ${device.platform} \n` +
        `Device UUID: ${device.uuid} \n` +
        `Device Version: ${device.version}`;

      console.log(this.deviceInfo);
    });
  }


}
