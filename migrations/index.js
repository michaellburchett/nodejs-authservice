const { exec } = require('child_process');

console.log("Running Migrations...");

exec('npx sequelize-cli db:migrate', (err, stdout, stderr) => {
    if (err) {
        //some err occurred
        console.error(err)
    } else {
        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    }
});