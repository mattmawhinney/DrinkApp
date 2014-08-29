var gulp = require('gulp'), gutil = require('gulp-util'), uglify = require('gulp-uglify'), watch = require('gulp-watch'), concat = require('gulp-concat'), compass = require('gulp-compass'), minifyCSS = require('gulp-minify-css'), notify = require('gulp-notify'), ncp = require('ncp');

gulp.task('sass', function() {
  gulp.src('./app/styles/**/*.scss').pipe(compass({
            css: 'css',
            sass: 'sass'            
        })).pipe(minifyCSS()).pipe(gulp.dest('./assets/styles')).pipe(notify({
          message : "Sass files are processed!"
      }));
});

gulp.task('bowerjs', function() {
  // main app js file
  var vendorjs = ['./app/bower_components/angular/angular.js',
    './app/bower_components/angular-route/angular-route.js',
    './app/bower_components/hammerjs/hammer.js',
    './app/bower_components/angular-hammer/angular-hammer.js',
    './app/bower_components/json3/lib/json3.js',
    './app/bower_components/modernizr/modernizr.js'];
  
  gulp.src(vendorjs,{base:'app/bower_components/'}).pipe(concat('bower-vendor.min.js')).pipe(gulp.dest('./.tmp/public/js/bower/')).pipe(notify({
      message : "Bower Component JS files are now processed!"
    }));
});
gulp.task('sailsbasejs', function(){
  var sailsbasejs = [
    './assets/js/dependencies/sails.io.js',
    './app/scripts/app.js'];

  gulp.src(sailsbasejs, {base:'assets/js/'}).pipe(concat('sailsbase.min.js')).pipe(gulp.dest('./.tmp/public/js/sailsmin/')).on('error', function(error) {console.log(error)}).pipe(notify({
    message:"Sails Base JS are now processed!"
  }));
});

gulp.task('angularappjs', function(){
  var angularjsapp = ['./app/scripts/app.js',
    './app/scripts/models/*.js',
    './app/scripts/controller/*.js']

  gulp.src(angularjsapp, {base:'app/scripts/'}).pipe(concat('barmadden.min.js')).pipe(gulp.dest('./.tmp/public/js/barmadden/')).pipe(notify({
    message:"Barmadden Angular App JS are now processed!"
  }));
});

gulp.task('angularviews', function(){
  ncp('./app/views', './assets/views/', function(err){
    if(err) {
      throw err;
    } else {
      notify({
        message:"Angular Views Copied"
      });
    }
  });
});

gulp.task('watch', function() {
  // watch scss files
  gulp.watch('./app/**/*.scss', function() {
    gulp.run('sass');
  });

  gulp.watch('./app/**/*.js', function() {
    gulp.run('bowerjs');
    gulp.run('angularappjs');
    gulp.run('sailsbasejs');
  });

  gulp.watch('./app/**/*.html', function(){
    gulp.run('angularviews');
  });
});

gulp.task('default', ['sass', 'bowerjs', 'sailsbasejs', 'angularappjs' , 'angularviews', 'watch']);