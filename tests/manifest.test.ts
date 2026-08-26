import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import manifest from "@/app/manifest";

describe("manifest", () => {
  it("returns a valid PWA manifest object", () => {
    const config = manifest();

    expect(config.name).toBe("Agentic Chat");
    expect(config.short_name).toBe("Agentic Chat");
    expect(config.display).toBe("standalone");
    expect(config.start_url).toBe("/");
    expect(config.background_color).toBe("#09090b");
    expect(config.theme_color).toBe("#09090b");
    expect(config.icons).toBeDefined();
    expect(config.icons?.length).toBeGreaterThanOrEqual(3);
  });

  it("references icons that exist in the public directory", () => {
    const config = manifest();
    const publicDir = path.resolve(process.cwd(), "public");

    for (const icon of config.icons ?? []) {
      const relativePath = icon.src.replace(/^\//, "");
      const fullPath = path.join(publicDir, relativePath);
      expect(
        fs.existsSync(fullPath),
        `Icon file ${icon.src} should exist at ${fullPath}`
      ).toBe(true);
    }
  });
});
