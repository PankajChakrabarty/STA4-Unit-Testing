import { describe, test, expect, vi } from "vitest"
import request from "supertest"
import { app } from "../index"
import * as dogService from "../services/dogService"

describe("DogRoutes - GET /api/dogs/random", () => {

  // ✅ POSITIVE
  test("returns 200 and success true with image url", async () => {

    vi.spyOn(dogService, "getRandomDogImage")
      .mockResolvedValue({
        imageUrl: "https://mocked-url.com/dog.jpg",
        status: "success"
      })

    const res = await request(app)
      .get("/api/dogs/random")

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.imageUrl)
        .toBe("https://mocked-url.com/dog.jpg")
  })

  // ❌ NEGATIVE
  test("returns 500 and error JSON", async () => {

    vi.spyOn(dogService, "getRandomDogImage")
      .mockRejectedValue(new Error("Failed to fetch dog image"))

    const res = await request(app)
      .get("/api/dogs/random")

    expect(res.status).toBe(500)
    expect(res.body.success).toBe(false)
    expect(res.body.error).toBeDefined()
  })
})