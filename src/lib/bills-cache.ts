// Cache em memória para armazenar bills por usuário
// Estrutura: { userId: [...bills] }
const billsCache = new Map<number, any[]>()

export function updateBillsCache(bills: any[]) {
    // Limpa o cache anterior
    billsCache.clear()

    // Reorganiza os bills por userId
    bills.forEach(bill => {
        if (!billsCache.has(bill.userId)) {
            billsCache.set(bill.userId, [])
        }
        billsCache.get(bill.userId)!.push(bill)
    })
}

export function getBillsFromCache(userId: number) {
    return billsCache.get(userId) || []
}

export function getAllBillsFromCache() {
    return Array.from(billsCache.values()).flat()
}

export function clearCache() {
    billsCache.clear()
}
