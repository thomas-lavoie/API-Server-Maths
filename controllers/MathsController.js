import { factorial, isPrime, findPrime } from "../mathUtilities.js";
import fs from "fs";

export default class MathsController {
  constructor(HttpContext) {
    this.HttpContext = HttpContext;
  }
  get(params) {
    const allowedParams = ["op", "OP", "x", "X", "y", "Y", "n", "N"];
    const extraParams = Object.keys(params).filter(
      (key) => !allowedParams.includes(key)
    );

    if (Object.keys(params).length > 0) {
      if (params.op) {
        if (extraParams.length > 0) {
          params.value = "'too many parameters'";
          this.HttpContext.response.JSON(params);
          return;
        }
        if (
          params.op === " " ||
          params.op === "-" ||
          params.op === "*" ||
          params.op === "/" ||
          params.op === "%"
        ) {
          if (!params.x) {
            params.value = "'x' parameter is missing";
            this.HttpContext.response.JSON(params);
            return;
          }
          if (isNaN(params.x)) {
            params.value = "'x' parameter is not a number";
            this.HttpContext.response.JSON(params);
            return;
          }
          if (!params.y) {
            params.value = "'y' parameter is missing";
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
              params.value = parseFloat(params.x) + parseFloat(params.y);
              this.HttpContext.response.JSON(params);
              break;
            case "-":
              params.value = parseFloat(params.x) - parseFloat(params.y);
              this.HttpContext.response.JSON(params);
              break;
            case "*":
              params.value = parseFloat(params.x) * parseFloat(params.y);
              this.HttpContext.response.JSON(params);
              break;
            case "/":
              if (params.y == 0) {
                params.value = "'Infinity'";
                if (params.x == 0 && params.y == 0) {
                  params.value = "'NaN'";
                }
              } else {
                params.value = parseFloat(params.x) / parseFloat(params.y);
              }
              this.HttpContext.response.JSON(params);
              break;
            case "%":
              if (params.y == 0 || params.x == 0) {
                params.value = "'NaN'";
              } else {
                params.value = parseFloat(params.x) % parseFloat(params.y);
              }
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
            params.value = "'n' parameter is missing";
            this.HttpContext.response.JSON(params);
            return;
          }
          if (isNaN(params.n)) {
            params.value = "'n' parameter is not a number";
            this.HttpContext.response.JSON(params);
            return;
          }
          if (!Number.isInteger(params.n)) {
            params.value = "'n' parameter is not an integer";
          }
          switch (params.op) {
            case "!":
              if (params.n <= 0 || params.n != parseInt(params.n)) {
                params.value = "'n' parameter must be an integer > 0";
              } else {
                params.value = factorial(params.n);
              }
              this.HttpContext.response.JSON(params);
              break;
            case "p":
              if (params.n <= 0 || params.n != parseInt(params.n)) {
                params.value = "'n' parameter must be an integer > 0";
              } else {
                params.value = isPrime(params.n);
              }
              this.HttpContext.response.JSON(params);
              break;
            case "np":
              params.value = findPrime(params.n);
              this.HttpContext.response.JSON(params);
              break;
            default:
              params.value = `${params.op} is not a valid operation`;
              this.HttpContext.response.JSON(params);
              break;
          }
          return;
        }
      } else {
        params.value = "'op' parameter is missing";
        this.HttpContext.response.JSON(params);
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
