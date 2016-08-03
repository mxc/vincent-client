/**
 * Created by mark on 2016/04/25.
 */

import net from 'net';
import tls from 'tls';

class Vincentc {

    constructor(){
        this.processArgs();
    }
    
    processArgs() {
        let args = process.argv;
        let counter = 2;
        this.host="localhost";
        while (counter < args.length) {
            let arg = args[counter];
            if (arg == "-h") {
                ++counter;
                if (counter < args.length) {
                    this.host = arg[counter];
                } else {
                    process.stdout("argument -h is missing a host name.")
                }
            }
            counter++;
        }
    }

    connect() {
        try {
            this.socket = tls.connect(1979, {host: this.host, rejectUnauthorized: false});
        } catch (e) {
            console.log(e.message);
            process.exit(1);
        }
        process.stdin.pipe(this.socket);
        this.socket.pipe(process.stdout);

        this.socket.on("error", (err)=> {
            console.log(`Error creating connection: ${err.message}`);
            console.log("exiting vincent client");
            process.exit(1);
        });

        this.socket.on('connect', ()=> {
            process.stdin.resume();
            process.stdin.setRawMode(true);
        });
        let func = ()=> {
            process.stdin.setRawMode(false);
            process.stdin.pause();
            this.socket.removeListener('close', func);
            console.log("Good Bye");
        };

        this.socket.on('close', func);

        process.stdin.on('end', ()=> {
            this.socket.destroy();
            //console.log();
        });


        process.stdin.on('data', (b) => {
            if (b.length === 1 && b[0] === 4) {
                process.stdin.emit('end')
            }
        })
    }

}

var client = new Vincentc();
client.connect();