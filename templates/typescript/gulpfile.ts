/**
 * Gulp is task-runner much like NPM scripts but since it's fully written in
 * JavaScript or TypeScript it allows for a finer configuration
 * This project uses Gulp for the sole purpose of being able to recompile
 * singular files from TypeScript to JavaScript and export them to the appropriate
 * directory in the "dist" folder.
 * 
 * This is extremely useful for hot-reloading commands for a running bot as you don't
 * want to stop the bot, rebuild all the typescript and then restart the bot. But
 * due to the nature of the TypeScript compilation step you cannot hot reload the bot before
 * the file is compiled to JavaScript.
 * 
 * You can trigger this file by running: "npm run gulp --src /path/to/your/typescript/file"
 * For example:
 * @example
 * ```sh
 * npm run gulp --src ./src/commands/info/userinfo.ts
 * ```
 */

import gulp from 'gulp';
import typescript from 'gulp-typescript';
import { argv } from 'yargs';

const compileSingleToJavaScript = (done: () => void) => {
    // Verifies that you have provided at least one "src" argument with --src
    if (!argv.src) {
        global.console.error('At least 1 file has to be specified with the --src argument, f.e. --src ./src/commands/info/userinfo.ts');
        global.console.error('Specify multiple files by repeating the structure: --src ./src/commands/info/userinfo.ts --src ./src/commands/info/stats.ts');
        return done();
    }

    // Checks if you have supplied multiple --src or just a single one
    const targetFiles: any = (argv as any).src.constructor === Array ? argv.src : [argv.src];

    // Loops over all the provided files
    for (const file of targetFiles) {
        // Sets up a TypeScript project
        const tsProject = typescript.createProject('./tsconfig.json');

        // Splits the file path
        const filePath = file.split('/');

        // Prepares the target folder
        let targetFolder = '';
        // tslint:disable-next-line:prefer-conditional-expression

        // Asserts the target folder
        targetFolder = filePath[0] === '.'
            ? `./dist/${filePath[2]}/${filePath[3]}`
            : `./dist/${filePath[1]}/${filePath[2]}`;

        // Loads up the file in Gulp
        gulp.src(file)
            // Pipes the file to the TypeScript compiler
            .pipe(tsProject())
            // Fetches the JavaScript
            .js
            // Pipes the file to the output
            .pipe(gulp.dest(targetFolder));
    }

    return done();
};

// Sets up 3 tasks that all do the same to cover aliases
gulp.task('default', gulp.series(compileSingleToJavaScript));
gulp.task('reload', gulp.series('default'));
gulp.task('rebuild', gulp.series('default'));