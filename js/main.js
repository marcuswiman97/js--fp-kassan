// Kassan
import { checkout } from "./kassa-imperativ.js";
import { formatReceipt } from "./receipt.js";
import { products, lines, discountCodes, VAT_RATE } from "./data.js";
import { createCart } from "./cart.js";

// 1. Kör den gamla kassan. Kör den sedan en gång till, med samma rabattkod.
// TODO: Gissa först. Blir kvittot detsamma båda gångerna? Varför inte?
// checkout("STUDENT");
// checkout('STUDENT');

// --- Del A, på passet (15 min) ---
// TODO: skriv rena funktioner i js/receipt.js och använd dem här i stället för checkout.
//       Ingen av dem får ändra products eller lines, läsa globala variabler eller logga.
//
//   findProduct(products, id)            -> produkten
//   lineTotal(line, products)            -> pris × antal
//   subtotal(lines, products)            -> summan av alla rader (reduce)
//   applyDiscount(amount, code, codes)   -> beloppet efter rabatt
//   vatOf(amount, rate)                  -> momsen i ett belopp som redan innehåller moms
//   formatReceipt(lines, products, code) -> kvittot som en sträng
//
// Det enda stället med sidoeffekter är här i main.js: console.log(formatReceipt(...)).
// Kör två gånger. Blir det samma kvitto nu?

// --- Del B och C, självstudier till torsdagen ---
// Se README. Ni tar med Kassan till workshoppen och granskar varandras kod.

// console.log(formatReceipt(lines, products, "STUDENT", discountCodes, VAT_RATE));

const cart = createCart(products);

cart.add("latte", 2);
cart.add("bulle");
cart.add("latte");

// console.log(cart.lines());
// console.log(cart.total());

// cart.remove("bulle");

// console.log(cart.lines());
// console.log(cart.total());

const receiptElement = document.querySelector("#receipt");

receiptElement.textContent = formatReceipt(
  cart.lines(),
  products,
  "STUDENT",
  discountCodes,
  VAT_RATE
);
