"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma = new client_1.PrismaClient();
// async function deleteAllData(orderedFileNames: string[]) {
//   const modelNames = orderedFileNames.map((fileName) => {
//     const modelName = path.basename(fileName, path.extname(fileName));
//     return modelName.charAt(0).toUpperCase() + modelName.slice(1);
//   });
//   for (const modelName of modelNames) {
//     const model: any = prisma[modelName as keyof typeof prisma];
//     if (model) {
//       await model.deleteMany({});
//       console.log(`Cleared data from ${modelName}`);
//     } else {
//       console.error(
//         `Model ${modelName} not found. Please ensure the model name is correctly specified.`
//       );
//     }
//   }
// }
function deleteAllData() {
    return __awaiter(this, void 0, void 0, function* () {
        const dependencyOrder = [
            "sales", // Child table
            "purchases", // Child table
            "products", // Parent table
            "expenseByCategory",
            "expenseSummary",
            "salesSummary",
            "purchaseSummary",
            "expenses",
            "users",
        ];
        for (const modelName of dependencyOrder) {
            const model = prisma[modelName];
            if (model) {
                yield model.deleteMany({});
                console.log(`Cleared data from ${modelName}`);
            }
            else {
                console.error(`Model ${modelName} not found. Please ensure the model name is correctly specified.`);
            }
        }
    });
}
// async function main() {
//   const dataDirectory = path.join(__dirname, "seedData");
//   const orderedFileNames = [
//     "products.json",
//     "expenseSummary.json",
//     "sales.json",
//     "salesSummary.json",
//     "purchases.json",
//     "purchaseSummary.json",
//     "users.json",
//     "expenses.json",
//     "expenseByCategory.json",
//   ];
//   await deleteAllData(orderedFileNames);
//   for (const fileName of orderedFileNames) {
//     const filePath = path.join(dataDirectory, fileName);
//     const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
//     const modelName = path.basename(fileName, path.extname(fileName));
//     const model: any = prisma[modelName as keyof typeof prisma];
//     if (!model) {
//       console.error(`No Prisma model matches the file name: ${fileName}`);
//       continue;
//     }
//     for (const data of jsonData) {
//       await model.create({
//         data,
//       });
//     }
//     console.log(`Seeded ${modelName} with data from ${fileName}`);
//   }
// }
// main()
//   .catch((e) => {
//     console.error(e);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const dataDirectory = path_1.default.join(__dirname, "seedData");
        yield deleteAllData();
        const orderedFileNames = [
            "products.json",
            "expenseSummary.json",
            "sales.json",
            "salesSummary.json",
            "purchases.json",
            "purchaseSummary.json",
            "users.json",
            "expenses.json",
            "expenseByCategory.json",
        ];
        for (const fileName of orderedFileNames) {
            const filePath = path_1.default.join(dataDirectory, fileName);
            const jsonData = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
            const modelName = path_1.default.basename(fileName, path_1.default.extname(fileName));
            const model = prisma[modelName];
            if (!model) {
                console.error(`No Prisma model matches the file name: ${fileName}`);
                continue;
            }
            for (const data of jsonData) {
                yield model.create({
                    data,
                });
            }
            console.log(`Seeded ${modelName} with data from ${fileName}`);
        }
    });
}
main()
    .catch((e) => {
    console.error(e);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
// import { PrismaClient } from "@prisma/client";
// import fs from "fs/promises"; // Use promises for async file handling
// import path from "path";
// const prisma = new PrismaClient();
// /**
//  * Deletes all data in the correct order to avoid foreign key constraint errors.
//  */
// async function deleteAllData() {
//   try {
//     // Delete dependent (child) records first, then parent records
//     await prisma.expenseByCategory.deleteMany({});
//     await prisma.expenses.deleteMany({});
//     await prisma.expenseSummary.deleteMany({});
//     await prisma.sales.deleteMany({});
//     await prisma.purchases.deleteMany({});
//     await prisma.salesSummary.deleteMany({});
//     await prisma.purchaseSummary.deleteMany({});
//     await prisma.products.deleteMany({});
//     await prisma.users.deleteMany({});
//     console.log("All data cleared in the correct order.");
//   } catch (error) {
//     console.error("Error clearing database:", error);
//   }
// }
// /**
//  * Main function to seed data into the database.
//  */
// async function main() {
//   const dataDirectory = path.join(__dirname, "seedData");
//   // Define the correct order for inserting data
//   const orderedFileNames = [
//     "users.json",
//     "products.json",
//     "sales.json",
//     "purchases.json",
//     "salesSummary.json",
//     "purchaseSummary.json",
//     "expenses.json",
//     "expenseSummary.json",
//     "expenseByCategory.json",
//   ];
//   // Step 1: Clear existing data
//   console.log("Clearing all data...");
//   await deleteAllData();
//   // Step 2: Seed data in the correct order
//   console.log("Seeding data...");
//   for (const fileName of orderedFileNames) {
//     const filePath = path.join(dataDirectory, fileName);
//     const modelName = path.basename(fileName, path.extname(fileName));
//     const model: any = prisma[modelName as keyof typeof prisma];
//     if (!model) {
//       console.error(`No Prisma model matches the file name: ${fileName}`);
//       continue;
//     }
//     try {
//       const jsonData = JSON.parse(await fs.readFile(filePath, "utf-8"));
//       for (const data of jsonData) {
//         await model.create({ data });
//       }
//       console.log(`Seeded ${modelName} with data from ${fileName}`);
//     } catch (error) {
//       console.error(`Error seeding data for ${modelName} from ${fileName}:`, error);
//     }
//   }
// }
// main()
//   .catch((e) => {
//     console.error("Error in seed script:", e);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//     console.log("Seeding complete. Prisma client disconnected.");
//   });
