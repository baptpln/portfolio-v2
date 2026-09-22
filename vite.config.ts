import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, type Plugin } from "vite";

/**
 * Serves `api/chat.ts` at /api/chat during `npm run dev`.
 *
 * Vercel runs that file in production; without this, the endpoint would only
 * exist once deployed, and local dev would silently fall back to the scripted
 * replies. Keeping the key here — rather than in a VITE_ variable — means it
 * never reaches the client bundle, in dev or in prod.
 */
function chatApiDevServer(env: Record<string, string>): Plugin {
  return {
    name: "chat-api-dev-server",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/api/chat", async (req, res) => {
        process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;

        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);

          const { default: handler } =
            await server.ssrLoadModule("/api/chat.ts");
          const response: Response = await handler(
            new Request("http://localhost/api/chat", {
              method: req.method,
              headers: { "Content-Type": "application/json" },
              body: chunks.length ? Buffer.concat(chunks) : undefined,
            }),
          );

          res.statusCode = response.status;
          response.headers.forEach((value, key) => res.setHeader(key, value));
          res.end(await response.text());
        } catch (error) {
          // The client treats any non-200 as "use the scripted reply".
          console.error("[chat api]", error);
          res.statusCode = 500;
          res.end("Dev handler failed");
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss(), chatApiDevServer(env)],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
