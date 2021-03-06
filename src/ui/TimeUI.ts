import { camera } from "..";
import { TimeService } from "../services";

export class TimeUI {
  private static time: HTMLElement;

  //#region Methods
  public static create(): void {
    // create time HTML
    const timeHTML = document.createElement("div");
    timeHTML.id = "time"
    timeHTML.classList.add('time');
    camera.appendChild(timeHTML);

    // store HTML
    TimeUI.time = document.getElementById('time');

    TimeUI.setTime();
  }

  public static show(): void {
    TimeUI.time.style.display = 'block';
  }

  public static hide(): void {
    TimeUI.time.style.display = 'none';
  }

  public static pause(): void {
    TimeUI.time.classList.add('pause');
  }

  public static resume(): void {
    if (TimeUI.time.classList.contains('pause')) {
      TimeUI.time.classList.remove('pause');
    }
  }

  public static isVisible(): boolean {
    return TimeUI.time.style.display === 'block';
  }

  public static setTime(): void {
    TimeUI.time.innerText = TimeService.getCurrentTime();
  }
  //#endregion
}