import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "./pipes/validation.pipe";

async function start() {
    console.log(process.env.PORT);
    const PORT = process.env.PORT || 5001;
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe())
    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}

start()