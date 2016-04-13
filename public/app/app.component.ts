import {Component} from 'angular2/core';
import {RsnSpectraComponent} from './rsn/rsn.spectra.component'

@Component({
    selector: 'alice-app',
    directives: [RsnSpectraComponent],
    template: `
<h1>ALICE RSN web</h1>
<rsn-spectra></rsn-spectra>
`
})
export class AppComponent {}
