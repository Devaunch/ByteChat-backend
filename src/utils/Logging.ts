import chalk from "chalk";
export default class Login {
    public static info(args: string | number) {
        console.log(chalk.blue(`${new Date(Date.now())}`),
            typeof args == 'string' ? chalk.blueBright(args) : args)
    }
    public static warn(args: string | number) {
        console.log(chalk.yellow(`${new Date(Date.now())}`),
            typeof args == 'string' ? chalk.yellowBright(args) : args)
    }
    public static error(args: string | number) {
        console.log(chalk.red(`${new Date(Date.now())}`),
            typeof args == 'string' ? chalk.redBright(args) : args)
    }
}
