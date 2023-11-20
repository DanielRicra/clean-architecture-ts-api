import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  new Server({
    port: 3000,
    routes: AppRoutes.routes,
  }).start();
}
