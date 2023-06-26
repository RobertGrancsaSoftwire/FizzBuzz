import * as fs from 'fs';
import {it} from "node:test";

interface ConfigItem {
    word: string,
    type: string,
    multiple: number,
    prefix: string
}


const configString = fs.readFileSync('config.json', 'utf-8');

const config = JSON.parse(configString);

console.log(config.config);

const reversingNumbers = config.config.filter((e: ConfigItem) => e.type === "reverse")
const normalNumbers = config.config.filter((e: ConfigItem) => e.type === "normal")
const prefixNumbers = config.config.filter((e: ConfigItem) => e.type === "prefix")

// This is our main function
function fizzbuzz(num: number): void {
    let arr: string[] = [];
    if (num % 11 == 0) {
        arr.push("Bong");
    } else {
        normalNumbers.forEach((item: ConfigItem) => {
            if (num % item.multiple == 0) {
                arr.push(item.word)
            }
        })
    }
    prefixNumbers.forEach((item: ConfigItem) => {
        if (num % item.multiple == 0) {
            let i: number = 0;
            for (let arrElement of arr) {
                if (arrElement.startsWith(item.prefix)) {
                    break;
                }
                i++;
            }
            arr = [...arr.slice(0, i), item.word, ...arr.slice(i)]
        }
    })
    reversingNumbers.forEach((item: ConfigItem) => {
        if (num % item.multiple == 0) {
            arr.reverse();
        }
    })

    if (arr.length != 0) {
        console.log(num + ": " + arr.join(""));
    }
}

const readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Choose a maximu number for FizzBuzz: ", (answer: string) => {
    let number = parseInt(answer) + 1;
    for (let i: number = 0; i < number; i++) {
        fizzbuzz(i);
    }
    rl.close();
})



// Now, we run the main function:
// fizzbuzz();