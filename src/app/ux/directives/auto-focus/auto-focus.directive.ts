import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import { DeviceDetectorService } from "ngx-device-detector";

@Directive({
  selector: "[autoFocus]",
  standalone: true,
  providers: [DeviceDetectorService], // Добавьте провайдер здесь
})
export class AutoFocusDirective implements OnInit {
  @Input() set autoFocus(condition: boolean) {
    this.focus = condition !== false;
  }

  private focus = true;

  constructor(
    private el: ElementRef,
    private deviceService: DeviceDetectorService
  ) {}

  ngOnInit() {
    if (this.focus && this.deviceService.isDesktop()) {
      window.setTimeout(() => {
        this.el.nativeElement.focus();
      });
    }
  }
}
