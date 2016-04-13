import {
    Component
} from 'angular2/core';
import {
    JSROOTCanvasComponent
} from './jsroot/canvas.component';

@Component({
    selector: 'my-app',
    directives: [JSROOTCanvasComponent],
    template: `
<h1>ALICE RSN web</h1>
<jsroot-canvas [id]='"2"'></jsroot-canvas>
`
})
export class AppComponent {}