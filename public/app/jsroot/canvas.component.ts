import {
    Component,
    Input
} from 'angular2/core';

//declare var JSROOT: any;

@Component({
    selector: 'jsroot-canvas',
    template: `
<div class="row">
    <!--div class="col-xs-2" id="myTreeDiv"></div-->
    <!--div class="col-xs-1"></div-->
    <div class="col-xs-5" id="myMainDiv"></div>
    <div class="col-xs-5" id="fit_draw"></div>
    <!--div class="col-xs-1"></div-->
</div>
`
})

export class JSROOTCanvasComponent {
    @Input() id: string;
    ngOnInit() {
        console.log('This if the value for user-id: ' + this.id);
    }
    constructor() {}


}
