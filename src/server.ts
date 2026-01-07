import fastifyCors from "@fastify/cors";
import { env } from "./env";
import { createFinancialBillRoute } from "./routes/create-financial-bill-route";
import fastify from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { listAllFinancialBillsRoute } from "./routes/list-all-financial-bills-route";
import { getTotalAmountRoute } from "./routes/get-total-amount-route";
import { createUserRoute } from "./routes/create-user-route";
import { authenticateUserRoute } from "./routes/authenticate-user-route";
import { getBillInfoRoute } from "./routes/get-bill-info-route";
import { deleteBillRoute } from "./routes/delete-bill-route";
import { updateFinancialBillRoute } from "./routes/update-financial-route";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
    origin: true,
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
})

app.register(createFinancialBillRoute)
app.register(updateFinancialBillRoute)
app.register(listAllFinancialBillsRoute)
app.register(getTotalAmountRoute)
app.register(createUserRoute)
app.register(authenticateUserRoute)
app.register(getBillInfoRoute)
app.register(deleteBillRoute)

app.listen({
    host: '0.0.0.0',
    port: env.PORT,
}).then(() => {
    console.log('HTTP server running!')
})