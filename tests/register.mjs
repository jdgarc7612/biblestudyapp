// Lets `node --test` run the app's TypeScript (Node strips the types) with the extensionless
// relative imports Metro uses: "./date" resolves to "./date.ts", and JSON imports.
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
      // Metro imports JSON without an import attribute; Node needs one.
      export async function load(url, context, next) {
        if (url.endsWith(".json")) {
          return next(url, { ...context, importAttributes: { ...context.importAttributes, type: "json" } });
        }
        return next(url, context);
      }
    `),
  import.meta.url
);
