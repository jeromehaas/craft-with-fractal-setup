const gulp = require('gulp');
const { series, parallel, dest } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const babel = require('gulp-babel');
const del = require('del');
const plumber = require('gulp-plumber');
const notifier = require('gulp-notifier');
const svgmin = require('gulp-svgmin');
const sass = require('gulp-sass')(require('sass'));
const favicons = require('gulp-favicons');
const svgSprite = require('gulp-svg-sprite');

// SOURCE PATHS
const filePaths = {
	scss: {
		src: [
			'./public/scss/configs/reset.scss', 
			'./public/scss/configs/fonts.scss', 
			'./public/scss/configs/variables.scss', 
			'./public/scss/configs/typography.scss', 
			'./public/scss/configs/mixins.scss', 
			'./public/scss/configs/global.scss', 
			'./components/**/*.scss'
		],
		dist: ['./public/css', '../craft/web/public/css']
	},
	fonts: {
		src: ['./public/fonts/**/*.+(ttf|woff|woff2)'],
		dist: ['../craft/web/public/fonts']
	},
	js: {
		src: ['./components/**/**/*.js'],
		dist: ['./public/js', '../craft/web/public/js']
	},
	image: {
		src: ['./public/media/images/**/*.+(png|jpg|jpeg|gif)'],
		dist: ['../craft/web/public/media/images']
	},
	icon : {
		src: ['./public/media/icons/**/*.svg'],
		dist: ['../craft/web/public/media/icons']
	},
	favicon: './src/assets/favicon/**/*.+(png|ico)',
	readme: './src/assets/readme/**/*.png',
}

// MESSAGES FOR NOTIFIER
notifier.defaults({
	messages: {
		scss: 'CSS compiled!',
		js: "JS compiled!",
		media: "Media assets optimized!",
		icon: "Icon sprite created!",
		fonts: "Fonts optimized!",
		favicon: "Favicon optimized!",
		readme: "Readme optimized!"
	},
	prefix: '===>',
	suffix: '<===',
	exclusions: '.map'
})

// SCSS
const scssTask = (done) => {
	gulp.src(filePaths.scss.src)
	.pipe(plumber({errorHandler: notifier.error}))
	.pipe(concat('main.min.css'))
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(cssnano())
	.pipe(sourcemaps.write('.'))
	.pipe(dest(filePaths.scss.dist[0]))
	.pipe(notifier.success('scss'));
	done();
}
	
	// FONT TASK
	const fontTask = (done) => {
		gulp.src(filePaths.fonts.src)
			.pipe(dest(filePaths.fonts.dist[0]))
			.pipe(notifier.success('fonts'))
		done();
	}

	// JS TASK
	const jsTask = (done) => {
			gulp.src(filePaths.js.src)
				.pipe(plumber({ errorHandler: notifier.error }))
				.pipe(babel({ presets: ['@babel/env'] }))
				.pipe(concat('main.js'))
				.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(dest(filePaths.js.dist[0]))
		.pipe(dest(filePaths.js.dist[1]))
		.pipe(notifier.success('js'))
	done();
}

// IMAGE TASK
const imageTask = (done) => {
	gulp.src(filePaths.image.src)
		.pipe(cache(imagemin()))
		// .pipe(svgmin())
		.pipe(dest(filePaths.image.dist[0]))
		.pipe(notifier.success('image'))
	done();
}

// ICON TASK
const iconTask = (done) => {
	gulp.src(filePaths.icon.src)
		.pipe(svgmin())
		.pipe(dest(filePaths.icon.dist[0]))
		.pipe(notifier.success('icon'))
	done();
}


// FAVICON TASK
// const faviconTask = (done) => {
// 	gulp.src(filesPath.favicon)
// 		.pipe(favicons({
// 			appName: 'Launch Countdown Timer',
// 			appShortName: 'LCT',
// 			appDescription: 'Compenent that countdown to a given time',
// 			developerName: 'Jérôme Haas',
// 			developerURL: 'jeromehaas.dev',
// 			background: '#fff',
// 			path: './assets/favicons/',
// 			url: '',
// 			display: 'standalone',
// 			orientation: 'portrait',
// 			scope: '/',
// 			start_url: '/',
// 			version: 1.0,
// 			logging: false,
// 			html: 'index.html',
// 			pipeHTML: true,
// 			replace: true,
// 		}))
// 		.pipe(gulp.dest('./assets/favicon/'))
// 		.pipe(notifier.success('favicon'))
// 	done();
// };


// WATCH TASK
const watchTask = () => {
	browserSync.init({
		server: { baseDir: './' },
		open: false
	});
	gulp.watch('./index.html').on('change', browserSync.reload);
	gulp.watch(filePaths.scss.src, scssTask).on("change", browserSync.reload);
	gulp.watch(filePaths.js.src, jsTask).on("change", browserSync.reload);
	// gulp.watch(filesPath.image.src, imageTask).on("change", browserSync.reload);
	// gulp.watch(filesPath.fonts, fontTask).on("change", browserSync.reload);
	// gulp.watch(filesPath.favicon, faviconTask).on("change", browserSync.reload);
}

// exports.build = parallel(scssTask, jsTask, imageTask, fontTask, faviconTask, readmeTask);
exports.build = parallel(scssTask, fontTask, jsTask, imageTask, iconTask);
exports.default = series(exports.build, watchTask);