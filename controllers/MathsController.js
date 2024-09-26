import { factorial, isPrime, findPrime } from "../mathUtilities.js";
import fs from "fs";

export default class MathsController {
  constructor(HttpContext) {
    this.HttpContext = HttpContext;
  }
  get(params) {
    if (params.op) {
      if (
        params.op === " " ||
        params.op === "-" ||
        params.op === "*" ||
        params.op === "/" ||
        params.op === "%"
      ) {
        if (!params.x) {
          params.value = "'x' parameter is not present";
          this.HttpContext.response.JSON(params);
          return;
        }
        if (isNaN(params.x)) {
          params.value = "'x' parameter is not a number";
          this.HttpContext.response.JSON(params);
          return;
        }
        if (!params.y) {
          params.value = "'y' parameter is not present";
          this.HttpContext.response.JSON(params);
          return;
        }
        if (isNaN(params.y)) {
          params.value = "'y' parameter is not a number";
          this.HttpContext.response.JSON(params);
          return;
        }
        switch (params.op) {
          case " ":
            params.value = parseInt(params.x) + parseInt(params.y);
            this.HttpContext.response.JSON(params);
            break;
          case "-":
            params.value = parseInt(params.x) - parseInt(params.y);
            this.HttpContext.response.JSON(params);
            break;
          case "*":
            params.value = parseInt(params.x) + parseInt(params.y);
            this.HttpContext.response.JSON(params);
            break;
          case "/":
            params.value = parseInt(params.x) / parseInt(params.y);
            this.HttpContext.response.JSON(params);
            break;
          case "%":
            params.value = parseInt(params.x) % parseInt(params.y);
            this.HttpContext.response.JSON(params);
            break;
          default:
            params.value = `${params.op} is not a valid operation`;
            this.HttpContext.response.JSON(params);
            break;
        }
        return;
      }
      if (params.op === "!" || params.op === "p" || params.op === "np") {
        if (!params.n) {
          params.value = "'n' parameter is not present";
          this.HttpContext.response.JSON(params);
          return;
        }
        if (isNaN(params.n)) {
          params.value = "'n' parameter is not a number";
          this.HttpContext.response.JSON(params);
          return;
        }
        switch (params.op) {
          case "!":
            params.value = factorial(parseInt(params.n));
            this.HttpContext.response.JSON(params);
            break;
          case "p":
            params.value = isPrime(parseInt(params.n));
            this.HttpContext.response.JSON(params);
            break;
          case "np":
            params.value = findPrime(parseInt(params.n));
            this.HttpContext.response.JSON(params);
            break;
          default:
            params.value = `${params.op} is not a valid operation`;
            this.HttpContext.response.JSON(params);
            break;
        }
        return;
      }
    }
    fs.readFile("./wwwroot/API-help-pages/maths.html", (err, content) => {
      this.HttpContext.res.writeHead(200, { "Content-Type": "text/html" });
      this.HttpContext.res.end(content, "utf-8");
    });
    return;
  }
  post(data) {
    this.HttpContext.response.notImplemented("POST endpoint not implemented");
    return;
  }
  put(data) {
    this.HttpContext.response.notImplemented("PUT endpoint not implemented");
    return;
  }
  remove(id) {
    this.HttpContext.response.notImplemented("DELETE endpoint not implemented");
    return;
  }
}
