const Browser = require('zombie');

var baseUrl = "http://localhost:3000"

var World = function World() {
    this.browser = new Browser();

    this.visit = (url) => this.browser.visit(`${baseUrl}${url}`);

    this.fill = (label, value) => {
        return this.browser.fill(label, value);
    };

    this.clickButton = (buttonLabel) => this.browser.pressButton(buttonLabel);

    this.clickLink = (linkText) => this.browser.clickLink(linkText);

};

module.exports ={ World: World };
