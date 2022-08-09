try {
  const info = await Deno.stat("./code_coverage");
  if (info.isDirectory) {
    await Deno.remove("./code_coverage", { recursive: true });
  }
} catch (error) {
  if (error instanceof Deno.errors.NotFound) {
    console.log("Directory not found");
  } else {
    console.error(error);
  }
}
