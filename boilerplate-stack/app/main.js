require('./styles.scss');

class Default {
    constructor() {
        this.property = 'propertyname';
    }

    customFunction() {
        console.log(this.property);
    }
}

let Test = new Default;

Test.customFunction();
