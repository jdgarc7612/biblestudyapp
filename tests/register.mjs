// Lets `node --test` run the app's TypeScript (Node strips the types) with the extensionless
// relative imports Metro uses: "./date" resolves to "./date.ts".
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`
      export async function resolve(specifier, context, next) {
        try {
          return await next(specifier, context);
        } catch (err) {
          if (specifier.startsWith(".") && !/\\.[a-z]+$/i.test(specifier)) {
            for (const ext of [".ts", ".tsx", "/index.ts"]) {
              try { return await next(specifier + ext, context); } catch {}
            }
          }
          throw err;
        }
      }
    `),
  import.meta.url
);
