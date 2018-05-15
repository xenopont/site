export class Logger {
    private message: any;

    public constructor(msg: string) {
        this.message = msg
    }

    public out(): void {
        console.log(this.message)
    }
}
