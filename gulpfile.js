const { series, src, dest } = require('gulp');
const exec = require('child_process').exec;
const del = require('del');

function clean(cb) {
  del(['dist']);
  cb();
}

function build(cb) {
  exec('nanogen build', (err, stdout, stderr) => {
    console.log(stdout);
    console.error(stderr);
    cb(err);
  });
}

function deploy(cb) {
  exec('vercel --prod', (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      cb(err);
      return;
    }
    console.log(stdout);
    console.error(stderr);
    cb();
  });
}

exports.clean = clean;
exports.build = series(clean, build);
exports.deploy = series(clean, build, deploy);
