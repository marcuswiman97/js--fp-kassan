//Lägger till, tar bort och håller reda på varorna.

// Del B: createCart() med closure. Se README.
//
// En closure är en funktion som minns variablerna från där den skapades.
// createCart skapar variabeln lines. Funktionerna som returneras (add, remove ...)
// kan läsa och byta ut den, men ingen utanför varukorgen kommer åt den direkt.
//
// TODO: importera din subtotal från receipt.js, du behöver den i total().
import { findProduct, subtotal } from "./receipt.js";
export const createCart = (products) => {
  // Varukorgens minne. let, eftersom du byter ut arrayen vid varje ändring.
  // Raderna ser ut som i data.js: { productId: 'latte', quantity: 2 }
  let lines = [];

  const add = (productId, quantity = 1) => {
    // TODO 1: Finns produkten? Annars: throw new Error(`Okänd produkt: ${productId}`)
    //         Tips: products.some(...) eller din findProduct från del A.
    const product = findProduct(products, productId);
    // Om ingen produkt finns - kasta error
    if (!product) {
      throw new Error(`Okänd produkt; ${productId}`);
    }

    // Här, efter att if-satsen avslutats!
    const exist = lines.some((line) => line.productId === productId);
    if (exist) {
      lines = lines.map((line) =>
        line.productId === productId
          ? {
              ...line,
              quantity: line.quantity + quantity,
            }
          : line
      );
    } else {
      lines = [...lines, { productId, quantity }];
    }

    // TODO 2: Finns produkten redan i lines?
    //   - Ja:  map över lines och returnera en ny rad med större quantity för just den
    //          produkten. Ändra inte den gamla raden, skapa en ny: { ...line, quantity: ... }
    //   - Nej: en ny array med alla gamla rader plus den nya: [...lines, { productId, quantity }]
    // Tilldela resultatet till lines. Inga push.
  };

  const remove = (productId) => {
    // TODO 3: en ny array utan raden för productId. Vilken arraymetod väljer bort saker?
    //         Inga splice.
    //Gå igenom varukorgens alla rader och behåll de rader där produktens ID
    // inte är samma som produkten vi vill ta bort.
    //.filter() är arraymetoden
    lines = lines.filter((line) => line.productId !== productId);
  };

  return {
    add,
    remove,
    // TODO 4: lines() ska returnera en kopia, så att ingen utanför kan ändra i varukorgen.
    //Lines: är en egenskap
    lines: () => lines.map((line) => ({ ...line })),
    // TODO 5: total() räknar summan med din subtotal från del A.
    total: () => subtotal(lines, products),
  };
};

// Testa i main.js, till exempel:
//
//   import { products } from './data.js';
//   import { createCart } from './cart.js';
//
//   const cart = createCart(products);
//   cart.add('latte', 2);
//   cart.add('bulle');
//   cart.add('latte');            // nu 3 latte, fortfarande en rad
//   console.log(cart.lines());
//   console.log(cart.total());    // 3 × 49 + 35 = 182
//
//   cart.lines().push({ productId: 'kaffe', quantity: 99 });
//   console.log(cart.lines());    // kaffet ska inte synas här. Varför inte?
//
//   cart.add('glass');            // ska kasta ett fel
