import {Component,Input} from 'angular2/core';

@Component({
    selector: 'rsn-spectra',
    template: `
<div class="row">
    <div class="col-xs-1"></div>
    <div class="col-xs-5" id="spectra"></div>
    <div class="col-xs-5" id="fit"></div>
    <div class="col-xs-1"></div>
</div>
`
})

export class RsnSpectraComponent {

    ngOnInit() {
    }

    constructor() {
	}
}
