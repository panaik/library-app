var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
//var eslint = require('gulp-eslint');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function(){
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
    }))
    .pipe(jscs());
});

gulp.task('inject', function(){
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');
    
    var injectSrc = gulp.src(['./public/css/*.css','./public/js/*.js'], {read: false});
    
    var injectOptions = {
        ignorePath: '/public'
    };
    
    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };
    
    return gulp.src('./src/views/*.jade')
                .pipe(wiredep(options))
                .pipe(inject(injectSrc, injectOptions))
                .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['style', 'inject'], function(){
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 5000
        },
        watch: jsFiles
    };
    
    return nodemon(options)
        .on('restart', function(ev){
            console.log('Restarting....');
    });
});

/*gulp.task('lint', function(){
    return gulp.src(jsFiles)
                .pipe(eslint())
                .pipe(eslint.format())
                .pipe(eslint.failAfterError());
});*/

/*gulp.src(['**//*.js','!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.result(result => {
        // Called for each ESLint result. 
        console.log(`ESLint result: ${result.filePath}`);
        console.log(`# Messages: ${result.messages.length}`);
        console.log(`# Warnings: ${result.warningCount}`);
        console.log(`# Errors: ${result.errorCount}`);
    }));*/