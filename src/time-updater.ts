import * as os from 'os';

import { Options } from './interfaces';
import { exec } from 'child_process';

const executeSystemCommand = (command: string) => {
    return new Promise<void>((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
              console.error(`ERROR: ${error}`);
              reject(error.message);
              return;
            }

            if(stderr) {
                console.error(`ERROR OUTPUT: ${stderr}`);
                reject(stderr);
                return;
            }
            resolve();
        });
    });
}

/**
 * 
 * @param timestamp Description. Updates system datetime using given timestamp. Currently works on windows and linux. In both cases requires 
appropriate permissions.  
 * @param options Optional parameters
 */
export const updateSystemDatetime = async (timestamp: number, options?: Options) => {
    if(timestamp.toString().length === 10) {
        timestamp *= 1000;
    }

    const date = new Date(timestamp);
    const timeToChange = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    if(os.platform() === `win32`) {
        const dateToChange = `${date.getUTCDate()}-${date.getUTCMonth() + 1}-${date.getUTCFullYear()}`;

        await executeSystemCommand(`date ${dateToChange}`);
        await executeSystemCommand(`time ${timeToChange}`);
    }

    if(os.platform() === `linux`) {
        const dateToChange = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
        const sudo = options?.sudo ? `sudo` : ``; 

        await executeSystemCommand(`${sudo} date +%Y-%m-%d -s "${dateToChange}"`);
        await executeSystemCommand(`${sudo} date +%T -s "${timeToChange}"`);
    }
}

