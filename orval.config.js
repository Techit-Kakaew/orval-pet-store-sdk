module.exports = {
  userApi: {
    input: {
      target: "https://petstore.swagger.io/v2/swagger.json",
    },
    output: {
      target: "./src/generated/api.ts",
      schemas: "./src/generated/models",
      client: "fetch", // ใช้ fetch client
      baseUrl: "", // (optional) สามารถกำหนดค่าเริ่มต้น
      override: {
        mutator: {
          path: "./src/runtime/mutator.ts",
          name: "fetchMutator",
        },
      },
    },
  },
};
