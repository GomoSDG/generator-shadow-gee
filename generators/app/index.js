var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts){
        super(args, opts);

        this.argument("appname", {type: String, required: true});

        const answers = this.prompt([
            {
                type     :  'input',
                name     :  'author',
                message  :  'author?'
            }
        ]);

        this.gcopyFile = (src, dest=src, bag={
            appname: this.options.appname,
            author: answers.author
        }) => {
            this.fs.copyTpl(
                this.templatePath(src),
                this.destinationPath(dest),
                bag
            );
        };
    }

    start() {
        // create destination folder.
        this.destinationRoot(this.options.appname);

    }

    copyRootFiles() {
        // package.json

        this.gcopyFile('package.json');

        // gulpfile.json
        this.gcopyFile('gulpfile.js');

        // shadow-cljs.edn
        this.gcopyFile('shadow-cljs.edn');
    }

    copyResourceFiles() {
        const rsrc = "resources";

        // main.scss
        this.gcopyFile('main.scss', `${rsrc}/sass/main.scss`);

        // index.html
        this.gcopyFile('index.html', `${rsrc}/public/index.html`);
    }
};
