const cp = require('node:child_process');
const {buildNextExerciseNo} = require('./utils');

let [, , exercise, sol] = process.argv;

let isSolution = sol === 's' ? 'true' : 'false';


let n = cp.fork(`${__dirname}/exercise.js`, [exercise], {
  env: { ...process.env, SOLUTION: isSolution }
});

let lessonIsCompleted = false;


n.on('message', (m) => {
  console.log('message');
  lessonIsCompleted = m.lessonIsCompleted;
  isSolution = m.isSolution;
  if (m.consoleNextMessage) {
    console.log(m.consoleNextMessage);
  }
  if (m.consolePrevMessage) {
    console.log(m.consolePrevMessage);
  }
  // console.log('PARENT got message:', m);
});

// Causes the child to print: CHILD got message: { hello: 'world' }
// n.send({ hello: 'world' });

// Kill child process when parent exits
process.on('exit', () => {
    n.send({kill: true})
})

var stdin = process.stdin;
// without this, we would only get streams once enter is pressed
stdin.setRawMode( true );
// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();
// i don't want binary, do you?
stdin.setEncoding( 'utf8' );
// on any data into stdin
stdin.on( 'data', function( key ){
  // ctrl-c ( end of text )
  if ( key === '\u0003' ) {
    process.exit();
  }

//  if (key === 'n') {
//    n.send({kill: true})
//    n = cp.fork(`${__dirname}/exercise.js`, ['04']);
//  }
  if (key === 'n' && lessonIsCompleted) {
    if (isSolution === 'false') {
      isSolution = 'true'
    } else {
      isSolution = 'false';
      exercise = buildNextExerciseNo(exercise)
    }
    n.send({kill: true})
    n = cp.fork(`${__dirname}/exercise.js`, [exercise], {
      env: { ...process.env, SOLUTION: isSolution }
    });
  }

  if (key === 'p' && exercise !== '01') {
    if (isSolution === 'false') {
      isSolution = 'true';
      exercise = parseInt(exercise) - 1;
      exercise = exercise < 10 ? `0${exercise}` : exercise;
    } else {
      isSolution = 'false';
    }

    n.send({kill: true})
    n = cp.fork(`${__dirname}/exercise.js`, [exercise], {
      env: { ...process.env, SOLUTION: isSolution }
    });
  }

  //console.log('entered ->', key);
  // write the key to stdout all normal like
  // process.stdout.write( key );
});
