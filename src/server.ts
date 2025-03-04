import fastifyCors from "@fastify/cors";
import { env } from "./env";
import { createFinancialBillRoute } from "./routes/create-financial-bill-route";
import fastify from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { listAllFinancialBillsRoute } from "./routes/list-all-financial-bills-route";
import { getTotalAmountRoute } from "./routes/get-total-amount-route";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors)
app.register(createFinancialBillRoute)
app.register(listAllFinancialBillsRoute)
app.register(getTotalAmountRoute)

app.listen({
    host: '0.0.0.0',
    port: env.PORT,
}).then(() => {
    console.log('HTTP server running!')
})