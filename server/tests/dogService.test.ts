import { describe, test, expect, vi, beforeEach } from "vitest"
import { getRandomDogImage } from "../services/dogService"

describe("DogService - getRandomDogImage", () => {

  beforeEach(() => {
    vi.restoreAllMocks()
  })

  // ✅ POSITIVE TEST
  test("returns imageUrl and success when API call succeeds", async () => {

    const mockedApiResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({
        message: "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
        status: "success"
      })
    }

    const fetchSpy = vi
      .spyOn(global, "fetch" as any)
      .mockResolvedValue(mockedApiResponse as any)

    const result = await getRandomDogImage()

    expect(result.imageUrl).toBe(
      "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg"
    )
    expect(result.status).toBe("success")
    expect(fetchSpy).toHaveBeenCalledOnce()
  })

  // ❌ NEGATIVE TEST
  test("throws error when API response is not ok", async () => {

    const mockedResponse = {
      ok: false,
      status: 500
    }

    vi.spyOn(global, "fetch" as any)
      .mockResolvedValue(mockedResponse as any)

    await expect(getRandomDogImage())
      .rejects
      .toThrow("Failed to fetch dog image")
  })
})