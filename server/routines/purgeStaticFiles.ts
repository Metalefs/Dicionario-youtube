import { Agenda } from "agenda/es";
import { MongoClient } from "mongodb";
import * as fs from 'fs';
import * as path from 'path';

const directories = ['./server/screenshots'];
export class PurgeStaticFilesScheduler {
    agenda;
    constructor(client: MongoClient) {
        this.agenda = new Agenda({ mongo: client.db("agenda") });
    }

    start() {
        this.agenda.define("purge files", async (job) => {
            directories.forEach(directory => {
                fs.readdir(directory, (err, files) => {
                    if (err) throw err;
    
                    for (const file of files) {
                        fs.unlink(path.join(directory, file), err => {
                            if (err) throw err;
                        });
                    }
                });
            })
        });

        (async () => {
            // IIFE to give access to async/await
            await this.agenda.start();

            await this.agenda.every("1 day", "purge files");
        })();
    }

    async stop() {
        const numRemoved = await this.agenda.cancel({ name: "purge files" });
    }
}
