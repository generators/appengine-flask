'use strict';
var util = require('util');
var path = require('path');
var spawny = require('spawny');
var yeoman = require('yeoman-generator');
var conductor = require('yeoman-conductor');


var AppengineFlaskGenerator = module.exports = function AppengineFlaskGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AppengineFlaskGenerator, yeoman.generators.Base);

AppengineFlaskGenerator.prototype.runAppengineGenerator = function runAppengineGenerator() {
    this.appEngine = conductor.run('appengine', this.async());
};

AppengineFlaskGenerator.prototype._askFor = function askFor() {
    var cb = this.async();
    var prompts = [{
        type: 'input',
        name: "module",
        message: "Python module name (folder to put all site code in)"
    },{
        type: "checkbox",
        name: "libs",
        message: "Select additional libraries",
        choices: [{
            name: "Blinker",
            value: "blinker",
            checked: true
        }, {
            name: "Raven (sentry error logging)",
            value: "raven",
            checked: true
        }, {
            name: "component.py",
            value: "component",
            checked: true
        }]
    }];

    this.prompt(prompts, function (props){
        this.libs = {};
        for (var i in props.libs) {
            this.libs[props.libs[i]] = true;
        }
        console.log(this.libs);
        this.props = props;
        cb();
    }.bind(this));
}


AppengineFlaskGenerator.prototype._projectFiles = function projectFiles() {
  this.template('_requirements.txt', 'requirements.txt');
  
};

AppengineFlaskGenerator.prototype.appEngineFiles = function appEngineFiles() {
  
};

AppengineFlaskGenerator.prototype.staticFiles = function staticFiles() {
  
};

AppengineFlaskGenerator.prototype._installDependencies = function installDependencies() {
  var cb = this.async();
  var pip = spawny('pip install -r requirements.txt --target libs', false, cb);
};