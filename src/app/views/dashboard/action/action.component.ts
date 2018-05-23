import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-action',
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

    @Input()
    public action = {};

    collapse = true;

    constructor() {
    }

    ngOnInit() {
    }


    createHTML(object) {

        try {
            return JSON.stringify(JSON.parse(object.value), null, '  ');
        } catch (e) {
        }

        let output = '';

        if (object.parent) {
            output += this.createOpenTag(object.parent) + '\n';
        }

        output += this.createOpenTag(object);

        if (object.value) {
            output += object.value;
        }

        output += this.createCloseTag(object);

        if (object.parent) {
            output += '\n' + this.createCloseTag(object.parent);
        }

        return output;
    }

    private createOpenTag(object) {
        let output = '';

        if (object.parent) {
            output += '  ';
        }

        output += '<' + object.type.toLowerCase() + ' ';

        if (object.id) {
            output += 'id="' + object.id + '" ';
        }

        if (object.class) {
            output += 'class="' + object.class + '" ';
        }

        return output + '>';
    }

    private createCloseTag(object) {
        return '</' + object.type.toLowerCase() + '>';
    }


    getActionColor(action) {
        switch (action._source.method.toLowerCase()) {
            case 'req':
                return 'warning';
            case 'click':
            default:
                return 'info';
        }
    }
}
