var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts){
        super(args, opts);

        this.argument("webapp", {type: String, required: true});

        this.gcopyFile = (src, dest=src, bag) => {
            const b = bag || {
                webapp: this.options.webapp
            };


            this.fs.copyTpl(
                this.templatePath(src),
                this.destinationPath(dest),
                b
            );
        };
    }

    start() {
        this.gcopyFile('amplify.yml', 'amplify.yml')
    }
}
